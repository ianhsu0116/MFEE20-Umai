import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

function Receipt(){
    const [ card, setCard] = useState(false);
    return(
        <>
        <div className="Receipt-box">
            <div className="Receipt-head" onClick={() => {card ? setCard(false) : setCard(true);}}>
                <MdOutlineKeyboardArrowDown />  
                <h4>請選擇發票收據選項</h4>
            </div>
            <div className={`Receipt-body ${card && "Receipt-body-open"}`}>
            <ul>
                <li><input class="form-check-input" type="radio" checked="checked" name="Receipt" id="Receipt1"/>
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