import { FiChevronRight } from "react-icons/fi";
import InsertData from "./InsertData";
function CourseList(props){
    return(
    <>
        <div className="CourseList-title">
            <h2>訂單結帳</h2>
            <h4>總計4堂課</h4>
        </div>
        <hr/>
        <table className="CourseList-list">
            <tr className="CourseList-list-title">
                <th><h2>課程資訊</h2></th>
                <th></th>
                <th><h2>課程費用</h2></th>
                <th><h2>人數</h2></th>
                <th><h2>小計</h2></th>
            </tr>
            <tr className="CourseList-list-item">
                <td><button data-toggle="collapse" data-target=".collapse"><FiChevronRight size="3em"/></button></td>
                <td>
                    <h2>築地創意壽司</h2>
                    <h4>報名人數剩餘5人</h4>
                </td>
                <td><h3>3300元</h3></td>
                <td><h3>*3位</h3></td>  
                <td><h3>9900元</h3></td>
            </tr>
            <tr className="CourseList-list-tool">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button>收藏</button> / <button>刪除</button></td>
            </tr>
            <tr>
                <td colspan="5">
                    <InsertData/>
                </td>
            </tr>
        </table>
    </> 
    )
}
export default CourseList;