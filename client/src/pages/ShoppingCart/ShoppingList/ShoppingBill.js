function ShoppingBill(){
    return(
        <>
        <div className="ShoppingBill-padding">
            <table className="ShoppingBill-list">
                <tr>
                    <th><h2>課程資訊</h2></th>
                    <th><h2>課程費用</h2></th>
                    <th><h2>人數</h2></th>
                    <th><h2>小計</h2></th>
                </tr>
                <tr>
                    <td colspan="5"><hr/></td>
                </tr> 
                <tr className="ShoppingBill-list-item">
                    <td>
                        <h3>築地創意壽司</h3>
                        <h5>報名人數剩餘5人</h5>
                    </td>
                    <td><h4>NT$ 3300</h4></td>
                    <td><h4>*3位</h4></td>  
                    <td><h4>NT$ 9900</h4></td>
                </tr>
            </table>
            <table className="ShoppingBill-student ShoppingBill-table-style">
                <tr>
                    <th><h2>學員資訊</h2></th>
                    <th><h2>姓名</h2></th>
                    <th><h2>連絡電話</h2></th>
                    <th><h2>出生日期</h2></th>
                    <th><h2>Email</h2></th>
                </tr>
                <tr>
                    <td colspan="5"><hr/></td>
                </tr>
                <tr className="ShoppingBill-student-info">
                    <td>學員-1</td>
                    <td>鍾禮鴻</td>
                    <td>0912345678</td>
                    <td>1997/01/01</td>
                    <td>test.gmail.com</td>
                </tr>
            </table>
            <table className="ShoppingBill-orderer ShoppingBill-table-style">
                <tr>
                    <th><h2>訂購人資訊</h2></th>
                    <th><h2>姓名</h2></th>
                    <th><h2>連絡電話</h2></th>
                    <th><h2>出生日期</h2></th>
                    <th><h2>Email</h2></th>
                </tr>
                <tr>
                    <td colspan="5"><hr/></td>
                </tr>
                <tr className="ShoppingBill-orderer-info">
                    <td>學員-1</td>
                    <td>鍾禮鴻</td>
                    <td>0912345678</td>
                    <td>1997/01/01</td>
                    <td>test.gmail.com</td>
                </tr>
            </table>
        </div>
        </>
    )
}
export default ShoppingBill;