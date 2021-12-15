import { useState, useEffect } from "react";
import StarGroup from "../../components/StarGroup";
import { PUBLIC_URL } from "../../config/config";

function CourseCommit(props) {
  let { course_comment } = props;

  const [articleData, setArticleData] = useState([]);
  useEffect(() => {
    if (
      course_comment != 0 &&
      course_comment != null &&
      course_comment != undefined
    )
      setArticleData(course_comment);
  }, [course_comment]);

  return (
    <>
      {/* {console.log(articleData)} */}
      <div className="CourseCategroy" id="Comment">
        課程評論
      </div>
      <div className="st-line"></div>
      <div className="CoursesCommitCard-container-cards">
        {articleData.map((article) => (
          <div className="CoursesCommitCard">
            <div className="CoursesCommitCard-left">
              <div className="CoursesCommitCard-left-imgCon">
                <img
                  src={`${PUBLIC_URL}/upload-images/${article.avatar}`}
                  alt=""
                ></img>
              </div>
            </div>

            <div className="CoursesCommitCard-right">
              <h4 className="ArticleCard-right-title">
                <div>{article.first_name + article.last_name}</div>
              </h4>
              <span>
                <StarGroup
                  percent={article.score * 20}
                  allScore={article.score}
                />
                <div>{article.created_time}</div>
              </span>
              <div className="CoursesCommitCard-right-content">
                {article.comment_text}
              </div>
            </div>
          </div>
        ))}
        {articleData.length === 0 && (
          <div className="MemberCenter-defaultText">
            目前該課程還沒有留言哦！歡迎跟大家分享課堂的心得。
          </div>
        )}
      </div>
    </>
  );
}

export default CourseCommit;
