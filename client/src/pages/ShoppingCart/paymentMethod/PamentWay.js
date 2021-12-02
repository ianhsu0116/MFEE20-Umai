import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CreditCards from "../../../components/CreditCards";
import { useState,useEffect } from "react";
import { FiLogIn } from "react-icons/fi";

function PamentWay(props){
    //設定信用卡資料
    const [creditCardsInfo, setCreditCardsInfo] = useState({
        cvc: "",
        expiry: "",
        name: "",
        number: "",
      });
      
    //控制卡片開關
    const [ card, setCard] = useState(true);
     
    //修改信用卡資料
    useEffect(()=>{
        props.getcreditCards(creditCardsInfo)
    },[creditCardsInfo])
    
    return(
        <>
        <div className="PamentWay-title">
            <h3>付款資訊</h3>
        </div>
        <div className="PamentWay-box" >
            <div className={`PamentWay-head  ${card && "turnicon"}`} onClick={() => {card ? setCard(false) : setCard(true);}}>
                <MdOutlineKeyboardArrowRight />  
                <h5>請選擇付款方式</h5>
            </div>
            <div className={`PamentWay-body ${card && "PamentWay-body-open"}`}>
            <ul>
                {/* <li><input class="form-check-input" type="radio" name="PamentWay" id="PamentWay1"/>
                <label class="form-check-label" for="PamentWay1">LINE Pay</label></li> */}
                <li><input class="form-check-input" type="radio" checked="checked" value="1" onFocus={(e)=>{props.getpaymenttype(e.target.value)}} name="PamentWay" id="PamentWay2" />
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