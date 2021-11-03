function CourseDetail(props){
    return(
    <>
        <div>
            <h2>消費明細</h2>
            <hr/>
        </div>
        <table className="Consumer-details">
            <tr>
                <td><h4>應付金額</h4></td>
                <td><h4>14400</h4></td>
            </tr>
            <tr>
                <td><h4>優惠券</h4></td>
                <td>
                    <select>
                        <option>滿 10000 折 500</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><h4>折扣</h4></td>
                <td><h4>500</h4></td>
            </tr>
            <tr>
                <td><h4>實付金額</h4></td>
                <td><h4>13900</h4></td>
            </tr>
        </table>
        <hr/>
        <div><button><h5>選擇付款方式</h5></button></div>
    </>     
    )
}
export default CourseDetail;