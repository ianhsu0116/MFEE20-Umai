function PaymentDetails(props){
    let OrdererData = props.OrdererData;
    return(
        <>
            <div className="ShoppingBill-padding">
            <table className="ShoppingBill-list">
                <tr>
                    <th><h2>付款方式</h2></th>
                </tr>
                <tr>
                    <td><hr/></td>
                </tr> 
                <tr className="ShoppingBill-list-item">
                    <td>
                        <h5>信用卡</h5>
                    </td>
                </tr>
            </table>
            <table className="ShoppingBill-student ShoppingBill-table-style">
                <tr>
                    <th><h2>發票資訊</h2></th>
                    <th><h2>發票選項</h2></th>
                    <th><h2>聯絡人姓名</h2></th>
                    <th><h2>連絡電話</h2></th>
                    <th><h2>Email</h2></th>
                </tr>
                <tr>
                    <td colspan="5"><hr/></td>
                </tr>
                <tr className="ShoppingBill-student-info">
                    <td>發票聯絡人</td>
                    <td>Email寄送</td>
                    <td>{OrdererData.lastName+OrdererData.firstName}</td>
                    <td>{OrdererData.telephone}</td>
                    <td>{OrdererData.email}</td>
                </tr>
            </table>
        </div>
        </>
    )
}
export default PaymentDetails;