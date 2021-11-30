import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ForumService from "../../services/forum.service";
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai";
import { MdCollectionsBookmark } from "react-icons/md";
import { PUBLIC_URL } from "../../config/config";
import image from "../../components/images/img5.jpg";

const CollectionArticle = (props) => {
  const { currentUser } = props;

  // 所有文章Array
  const [articleData, setArticleData] = useState([]);

  // 拿到收藏的文章
  useEffect(async () => {
    try {
      let result = await ForumService.collection(currentUser.id);
      // console.log(result.data.article);

      setArticleData(result.data.article);
    } catch (error) {
      console.log(error.response);
      // let { code } = error.response.data;
      // setErrorMsg(getValidMessage("member", code));
      Swal.fire({
        icon: "error",
        title: "不知名錯誤！",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, []);

  return (
    <div className="CollectionArticle">
      <div className="CollectionArticle-container">
        <header className="CollectionArticle-container-header">
          <h2>收藏文章</h2>
        </header>

        <div className="CollectionArticle-container-cards">
          {articleData.map((article) => (
            <Link to="/forum" className="ArticleCard">
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
                  {article.article_title}
                </h4>
                <div className="ArticleCard-right-content">
                  {article.article_text}
                </div>

                <div className="ArticleCard-right-bottom">
                  <div className="ArticleCard-right-bottom-con ArticleCard-right-bottom-like">
                    <AiOutlineHeart />
                    <span className="ArticleCard-likeCount">150</span>
                  </div>
                  <div className="ArticleCard-right-bottom-con ArticleCard-right-bottom-comment">
                    <AiOutlineMessage />
                    <span className="ArticleCard-commentCount">350</span>
                  </div>
                  <div className="ArticleCard-right-bottom-con ArticleCard-right-bottom-collect">
                    <MdCollectionsBookmark />
                    <span>取消收藏</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <div className="MemberCenter-defaultText">
            目前您還沒有任何收藏文章喔！趕緊去
            <Link to="/forum">討論區</Link>
            逛逛吧！
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionArticle;
