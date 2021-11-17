/* eslint-disable react-hooks/exhaustive-deps */
import { FiChevronRight } from "react-icons/fi";
import DefaultStudentCard from "./DefaultStudentCard";
import React, { useState } from "react";

function CourseList(props){
    const [ card, setCard] = useState(false);
    const [ carddata, setCarddata] = useState(props.carddata);

    let index=1;    

    return(
    <>
        <div className="CourseList-title">
            <h1>訂單結帳</h1>
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
                    <h3>{props.coursetitle.name}</h3>
                    <h5>報名人數剩餘5人</h5>
                </td>
                <td><h4>NT$ {props.coursetitle.value}</h4></td>
                <td><h4>*{props.coursetitle.studentnumber}位</h4></td>  
                <td><h4>NT$ {props.coursetitle.value*props.coursetitle.studentnumber}</h4></td>
            </tr>
            <tr className="CourseList-list-tool">
                <td colSpan="5"><button>收藏</button><button>刪除</button></td>
            </tr>
            <tr>
                <td className={`Insert-area ${card && "Showarea"}`} colspan="5">
                    <div className="Cardarea">
                        <div className="Insert-area-title">
                            <h4>訂購人資訊</h4>
                        </div>
                        <table className="Orderer-info">
                            <tr>
                                <td>
                                    <label>名字</label>
                                    <input type="text"></input>
                                </td>
                                <td>
                                    <label>姓氏</label>
                                    <input type="text"></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>連絡電話</label>
                                    <input type="text"></input>
                                </td>
                                <td>
                                    <label>生日</label>
                                    <input type="date"></input>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <label>Email</label>
                                    <input type="text"></input>
                                </td>
                            </tr>
                        </table>
                        <div className="Insert-area-title">
                            <h4>學員資料</h4>
                            <button onClick={()=>{
                               props.newcarddata(carddata)
                                }}>新增學員</button>
                        </div>
                        <div className="Student-card">
                        {carddata.map((data) => <DefaultStudentCard data={data} index={index++} carddata={carddata}/>)}
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </> 
    )
}
export default CourseList;