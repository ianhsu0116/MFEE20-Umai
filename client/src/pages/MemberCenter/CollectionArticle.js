import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ForumService from "../../services/forum.service";
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai";
import { MdCollectionsBookmark } from "react-icons/md";
import { PUBLIC_URL } from "../../config/config";
import getValidMessage from "../../validMessage/validMessage";
import image from "../../components/images/sliderBasic.png";

const CollectionArticle = (props) => {
  const { currentUser } = props;

  // 所有文章Array
  const [articleData, setArticleData] = useState([]);

  // 拿取所有收藏文章資料ㄉfunction
  async function getArticleData() {
    try {
      let result = await ForumService.collection(currentUser.id);
      // console.log(result.data.article);

      // 將資料裝入
      setArticleData(result.data.article);
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;

      // 提示錯誤
      Swal.fire({
        icon: "error",
        title: getValidMessage("forum", code),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  // 拿到收藏的文章
  useEffect(async () => {
    try {
      getArticleData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 新增或移除收藏
  const handleCollectEdit = async (e, article_id) => {
    // console.log(article_id);

    try {
      let result = await ForumService.collectionEdit(
        currentUser.id,
        article_id
      );

      // 重新拿一次收藏資料
      getArticleData();

      // 取出確認此次是刪除還是新增的訊息
      let { mode } = result.data;

      // 跳通知
      Swal.fire({
        icon: "success",
        title: mode === "insert" ? "新增成功！" : "移除成功",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      //console.log(error.response);
      let { code } = error.response.data;

      // 提示錯誤
      Swal.fire({
        icon: "error",
        title: getValidMessage("forum", code),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="CollectionArticle">
      <div className="CollectionArticle-container">
        <header className="CollectionArticle-container-header">
          <h2>收藏文章</h2>
        </header>

        <div className="CollectionArticle-container-cards">
          {articleData.map((article, index) => (
            <div key={index} className="ArticleCard">
              <div className="ArticleCard-left">
                <div className="ArticleCard-left-imgCon">
                  <img
                    src={
                      article.image_name
                        ? `${PUBLIC_URL}/uploads-image/${article.image_name}`
                        : image
                    }
                    alt="image"
                  />
                </div>
              </div>

              <div className="ArticleCard-right">
                <h4 className="ArticleCard-right-title">
                  <Link to="/forum">{article.article_title}</Link>
                </h4>
                <div className="ArticleCard-right-content">
                  {article.article_text}
                </div>

                <div className="ArticleCard-right-bottom">
                  <div className="ArticleCard-right-bottom-con ArticleCard-right-bottom-like">
                    <AiOutlineHeart />
                    <span className="ArticleCard-likeCount">
                      {article.like_count || 0}
                    </span>
                  </div>
                  <div className="ArticleCard-right-bottom-con ArticleCard-right-bottom-comment">
                    <AiOutlineMessage />
                    <span className="ArticleCard-commentCount">
                      {article.comment_count || 0}
                    </span>
                  </div>
                  <div
                    className="ArticleCard-right-bottom-con ArticleCard-right-bottom-collect"
                    onClick={(e) => {
                      handleCollectEdit(e, article.id);
                    }}
                  >
                    <MdCollectionsBookmark />
                    <span>取消收藏</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {articleData.length === 0 && (
            <div className="MemberCenter-defaultText">
              目前您還沒有任何收藏文章喔！趕緊去
              <Link to="/forum">討論區</Link>
              逛逛吧！
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionArticle;
