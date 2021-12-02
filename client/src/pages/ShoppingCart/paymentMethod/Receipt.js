import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

function Receipt(props){
    //控制卡片開關
    const [ card, setCard] = useState(true);

    return(
        <>
        <div className="Receipt-box">
            <div className={`Receipt-head ${card && "turnicon"}`} onClick={() => {card ? setCard(false) : setCard(true);}}>
                <MdOutlineKeyboardArrowRight />  
                <h5>請選擇發票收據選項</h5>
            </div>
            <div className={`Receipt-body ${card && "Receipt-body-open"}`}>
            <ul>
                <li><input class="form-check-input" type="radio" checked="checked" value="1" onFocus={(e)=>{props.getreceipttype(e.target.value)}} name="Receipt" id="Receipt1"/>
                    <label class="form-check-label" for="Receipt1">Email 寄送</label></li>
                {/* <li><input class="form-check-input" type="radio" name="Receipt" id="Receipt2" />
                    <label class="form-check-label" for="Receipt2">愛心捐贈</label></li> */}
            </ul>
            </div>
        </div>
        </>
    )
}
export default Receipt;