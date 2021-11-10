import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import CreditCards from "../../../components/CreditCards";
import { useState } from "react";

function PamentWay(){
    const [creditCardsInfo, setCreditCardsInfo] = useState({
        cvc: "",
        expiry: "",
        name: "",
        number: "",
      });
     const [ card, setCard] = useState(false);

    return(
        <>
        <div className="PamentWay-title">
            <h3>付款資訊</h3>
        </div>
        <div className="PamentWay-box">
            <div className="PamentWay-head" onClick={() => {card ? setCard(false) : setCard(true);}}>
                <MdOutlineKeyboardArrowDown />  
                <h4>請選擇付款方式</h4>
            </div>
            <div className={`PamentWay-body ${card && "PamentWay-body-open"}`}>
            <ul>
                <li><input class="form-check-input" type="radio" name="PamentWay" id="PamentWay1"/>
                <label class="form-check-label" for="PamentWay1">LINE Pay</label></li>
                <li><input class="form-check-input" type="radio" name="PamentWay" id="PamentWay2" />
                <label class="form-check-label" for="PamentWay2">信用卡</label></li>
            </ul>
            <CreditCards
            creditCardsInfo={creditCardsInfo}
            setCreditCardsInfo={setCreditCardsInfo}
          />
            </div>
        </div>
        </>
    )
}
export default PamentWay;