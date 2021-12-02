import { useState, useEffect } from "react";
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai";
import { MdCollectionsBookmark } from "react-icons/md";
import { Link } from "react-router-dom";


function CourseCommit(props){

    const [articleData, setArticleData] = useState([{member_id:1},{article_id:1}]);

  return (
    <>
            <div className="CollectionArticle-container-cards">
          {articleData.map((article) => (
            <div className="ArticleCard">
              <div className="ArticleCard-left">
                <div className="ArticleCard-left-imgCon">
                  {/* <img
                    src={
                      article.image_name
                        ? `${PUBLIC_URL}/uploads-image/${article.image_name}`
                        : image
                    }
                    alt="image"
                  /> */}
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
                      // handleCollectEdit(e, article.id);
                    }}
                  >
                    <MdCollectionsBookmark />
                    <span>取消收藏</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>      
    </>
         )
    
}

export default CourseCommit