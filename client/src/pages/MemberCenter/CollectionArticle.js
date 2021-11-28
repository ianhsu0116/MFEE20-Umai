import React, { useState } from "react";
import { Link } from "react-router-dom";

const CollectionArticle = (props) => {
  return (
    <div className="CollectionArticle">
      <div className="CollectionArticle-container">
        <header className="CollectionArticle-container-header">
          <h2>收藏文章</h2>
        </header>

        <div className="CollectionArticle-container-cards">
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
