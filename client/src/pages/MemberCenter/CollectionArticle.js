import React, { useState } from "react";

const CollectionArticle = (props) => {
  return (
    <div className="CollectionArticle">
      <div className="CollectionArticle-container">
        <header className="CollectionArticle-container-header">
          <h2>收藏文章</h2>
        </header>

        <div className="CollectionArticle-container-cards">
          目前您還沒有任何收藏文章喔！快去討論區逛逛吧！
        </div>
      </div>
    </div>
  );
};

export default CollectionArticle;
