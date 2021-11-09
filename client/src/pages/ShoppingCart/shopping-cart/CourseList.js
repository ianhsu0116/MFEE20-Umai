import { FiChevronRight } from "react-icons/fi";
import DefaultStudentCard from "../../../components/DefaultStudentCard";
import React, { useState } from "react";

function CourseList(props){
    const [ card, setCard] = useState(false);

    return(
    <>
        <div className="CourseList-title">
            <h1>訂單結帳</h1>
            <h5>總計4堂課</h5>
        </div>
        <hr/>
        <table className="CourseList-list-title">
            <tr>
                <th><h2>課程資訊</h2></th>
                <th></th>
                <th><h2>課程費用</h2></th>
                <th><h2>人數</h2></th>
                <th><h2>小計</h2></th>
            </tr>
        </table>
        <table className="CourseList-list">
            <tr className="CourseList-list-item">
                <td><button onClick={() => {
    card ? setCard(false) : setCard(true);
  }}><FiChevronRight size="3em"/></button></td>
                <td>
                    <h3>築地創意壽司</h3>
                    <h5>報名人數剩餘5人</h5>
                </td>
                <td><h4>NT$ 3300</h4></td>
                <td><h4>*3位</h4></td>  
                <td><h4>NT$ 9900</h4></td>
            </tr>
            <tr className="CourseList-list-tool">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button>收藏</button> / <button>刪除</button></td>
            </tr>
            <tr>
                <td className={`Insert-area ${card && "Showarea"}`} colspan="5">
                    <div className="Cardarea">
                        <DefaultStudentCard />
                        <DefaultStudentCard />
                    </div>
                </td>
            </tr>
        </table>
    </> 
    )
}
export default CourseList;