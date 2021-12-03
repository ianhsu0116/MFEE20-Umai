function PaymentDetails(props){
    let OrdererData = props.OrdererData;
    return(
        <>
            <div className="ShoppingBill-padding">
            <table className="ShoppingBill-list">
                <tr>
                    <th><h4>付款方式</h4></th>
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
                    <th><h4>發票資訊</h4></th>
                    <th><h4>發票選項</h4></th>
                    <th><h4>聯絡人姓名</h4></th>
                    <th><h4>連絡電話</h4></th>
                    <th><h4>Email</h4></th>
                </tr>
                <tr>
                    <td colspan="5"><hr/></td>
                </tr>
                <tr className="ShoppingBill-student-info">
                    <td><h5>發票聯絡人</h5></td>
                    <td><h5>Email寄送</h5></td>
                    <td><h5>{OrdererData.last_name+OrdererData.first_name}</h5></td>
                    <td><h5>{OrdererData.telephone}</h5></td>
                    <td><h5>{OrdererData.email}</h5></td>
                </tr>
            </table>
        </div>
        </>
    )
}
export default PaymentDetails;