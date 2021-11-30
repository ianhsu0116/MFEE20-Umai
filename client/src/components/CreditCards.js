import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

// 備註 使用時一定要傳復合下方格式的state近來才能使用
// const [creditCardsInfo, setCreditCardsInfo] = useState({
//   cvc: "",
//   expiry: "",
//   name: "",
//   number: "",
// });

const CreditCards = (props) => {
  const { creditCardsInfo, setCreditCardsInfo } = props;
  const [currentFocus, setCurrentFocus] = useState({
    focus: "",
  });

  const handleCardsChange = (e) => {
    setCreditCardsInfo({ ...creditCardsInfo, [e.target.name]: e.target.value });
  };

  const handleInputFocus = (e) => {
    setCurrentFocus({ ...currentFocus, focus: e.target.name });
  };

  return (
    <div className="CreditCards">
      <div className="CreditCards-left">
        <Cards
          cvc={creditCardsInfo.cvc}
          expiry={creditCardsInfo.expiry}
          focused={currentFocus.focus}
          name={creditCardsInfo.name}
          number={creditCardsInfo.number}
        />
      </div>
      <div className="CreditCards-right">
        <div className="CreditCards-right-row">
          <input
            type="text"
            name="number"
            className="CreditCards-right-row-input"
            placeholder="請輸入信用卡卡號(16碼)"
            maxLength="16"
            onChange={handleCardsChange}
            onFocus={handleInputFocus}
            value={creditCardsInfo.number}
          />
        </div>
        <div className="CreditCards-right-row">ex. 4477 5773 3084 7812</div>
        <div className="CreditCards-right-row">
          <input
            type="text"
            name="name"
            className="CreditCards-right-row-input"
            placeholder="持卡人姓名"
            onChange={handleCardsChange}
            onFocus={handleInputFocus}
            value={creditCardsInfo.name}
          />
        </div>
        <div className="CreditCards-right-row">
          <input
            type="text"
            name="expiry"
<<<<<<< HEAD
            className="CreditCards-right-row-input CreditCards-right-row-date"
=======
            className="CreditCards-right-row-input"
>>>>>>> 6e5cd6ec554d430d1b4a17d42a5590a0bec1aa5a
            placeholder="到期日(YYDD)"
            maxLength="4"
            onChange={handleCardsChange}
            onFocus={handleInputFocus}
            value={creditCardsInfo.expiry}
          />
          <input
            type="text"
            name="cvc"
<<<<<<< HEAD
            className="CreditCards-right-row-input CreditCards-right-row-cvc"
=======
            className="CreditCards-right-row-input"
>>>>>>> 6e5cd6ec554d430d1b4a17d42a5590a0bec1aa5a
            placeholder="安全碼"
            maxLength="3"
            onChange={handleCardsChange}
            onFocus={handleInputFocus}
            value={creditCardsInfo.cvc}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCards;
