function CourseList(props){
    return(
        <table className="list">
                <tr className="list-title">
                    <th><h2>課程資訊</h2></th>
                    <th></th>
                    <th><h2>課程費用</h2></th>
                    <th><h2>人數</h2></th>
                    <th><h2>小計</h2></th>
                </tr>
                <tr className="list-item">
                    <td><i className="fas fa-chevron-right"></i></td>
                    <td>
                        <h2>築地創意壽司</h2>
                        <h4>報名人數剩餘5人</h4>
                    </td>
                    <td><h3>4800元</h3></td>
                    <td><h3>*3位</h3></td>
                    <td><h3>14400元</h3></td>
                </tr>
                <tr className="list-tool">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><a href="">收藏</a>|<a href="">刪除</a></td>
                </tr>
            </table>
    )
}
export default CourseList;