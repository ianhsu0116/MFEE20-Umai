import React, { useState, useEffect } from "react";
import MemberService from "../../services/member.service";
import ChefCard2 from "../../components/member/ChefCard2";

const ChefIntro = (props) => {
  const { currentUser } = props;
  return (
    <div className="ChefIntro">
      <div className="ChefIntro-container">
        <header className="ChefIntro-container-header">
          <h2>主廚卡片</h2>
        </header>

        <ChefCard2 />
      </div>
    </div>
  );
};

export default ChefIntro;
