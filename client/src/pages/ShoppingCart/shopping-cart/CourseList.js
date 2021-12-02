/* eslint-disable react-hooks/exhaustive-deps */
import { FiChevronRight } from "react-icons/fi";
import DefaultStudentCard from "./DefaultStudentCard";
import React, { useEffect, useState } from "react";
import Orderinfo from "./orderinfo";
import axios from "axios";
import Swal from 'sweetalert2'

function CourseList(props){
    //取得會員id
    const { currentUser } = props;
    //控制卡片開關
    const [ card, setCard] = useState(true)
    //存取學員資料
    const [ studentdata, setstudentdata] = useState([])

    let coursetitle=props.coursetitle;
    let carddata=props.carddata;
    
    //將訂單移除購物車
    async function modifycart(){
        try {
            let result = await axios.put(`http://localhost:8080/api/order/modifycart`,{ 
                memberid: currentUser.id, 
                courseid:coursetitle.course_id, 
                batchid:coursetitle.batch_id} ,{ withCredentials: true,});
          } catch (error) {
            console.log(error);
          }
          Swal.fire({
            icon: 'success',
            text:'刪除成功'
        }).then(
            (result)=>{
                if (result.isConfirmed)window.location.href='http://localhost:3000/'
            })
          
    }

    //將訂單加入收藏
    async function modifycollection(){
        try {
            let result = await axios.put(`http://localhost:8080/api/order/modifycollection`,{ 
                memberid: currentUser.id, 
                courseid:coursetitle.course_id, 
                batchid:coursetitle.batch_id} ,{ withCredentials: true,});
          } catch (error) {
            console.log(error);
          }
          Swal.fire({
            icon: 'success',
            text:'加入收藏成功'
        })
    }

    // 初次渲染時，拿取當前使用者的預設學員
    async function get (){
        try {
        // 拿取所有學員料
        let result = await axios.get("http://localhost:8080/api/member/student", {
        withCredentials: true,
        });
        setstudentdata(result.data.students)
        } catch (error) {
        console.log(error);
        }
    };
    useEffect(()=>{
        get()
    },[])

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
            <tr className={`CourseList-list-item ${card && "turnicon"}`}>
                <td><button onClick={() => {
    card ? setCard(false) : setCard(true)
  }}><FiChevronRight size="3em"/></button></td>
                <td>
                    <h4>{coursetitle.name}</h4>
                    <h6>報名人數剩餘{coursetitle.membercount}人</h6>
                </td>
                <td><h4>NT$ {coursetitle.value}</h4></td>
                <td><h4>*{coursetitle.studentnumber}位</h4></td>  
                <td><h4>NT$ {coursetitle.value*coursetitle.studentnumber}</h4></td>
            </tr>
            <tr className="CourseList-list-tool">
                <td colSpan="5">
                    <button onClick={()=>{modifycollection()}}>收藏</button>
                    <button onClick={()=>{modifycart()}}>刪除</button>
                </td>
            </tr>
            <tr>
                <td className={`Insert-area ${card && "Showarea"}`} colspan="5">
                    <div className="Cardarea">
                        <div className="Insert-area-title">
                            <h4>訂購人資訊</h4>
                        </div>
                        <Orderinfo changeorderdata={(data)=>{props.changeorderdata(data)}}/>
                        <div className="Insert-area-title">
                            <h4>學員資料</h4>
                            <button onClick={()=>{
                               props.newcarddata(carddata)
                                }}>新增學員</button>
                        </div>
                        <div className="Student-card">
                        {carddata.map((data,i) => 
                            <DefaultStudentCard 
                                data={data} 
                                index={i+1} 
                                carddata={carddata}
                                studentdata={studentdata}
                                coursetitle={coursetitle}
                                changecarddata={(index,newdata)=>{props.changecarddata(index,newdata)}}
                                deletecarddata={(index,newdata,coursetitle)=>{props.deletecarddata(index,newdata,coursetitle)}}
                            />)}
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </> 
    )
}
export default CourseList;