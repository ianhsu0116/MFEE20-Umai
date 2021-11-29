function ShoppingBill(props){
    let coursetitle = props.coursetitle;
    let coupon = props.coupon;
    let carddata = props.carddata;
    let OrdererData = props.OrdererData;
    let index = 1;
    return(
        <>
        <div className="ShoppingBill-padding">
            <table className="ShoppingBill-list">
                <tr>
                    <th><h4>課程資訊</h4></th>
                    <th><h4>課程費用</h4></th>
                    <th><h4>人數</h4></th>
                    <th><h4>優惠折扣</h4></th>
                    <th><h4>小計</h4></th>
                </tr>
                <tr>
                    <td colspan="5"><hr/></td>
                </tr> 
                <tr className="ShoppingBill-list-item">
                    <td>
                        <h4>{coursetitle.name}</h4>
                        <h5>報名人數剩餘 5 人</h5>
                    </td>
                    <td><h5>NT$ {coursetitle.value}</h5></td>
                    <td><h5>*{coursetitle.studentnumber}位</h5></td> 
                    <td><h5>NT$ {Math.floor(coursetitle.value*coursetitle.studentnumber*(1-coupon.discount_percent/100))}</h5></td>
                    <td><h5>NT$ {coursetitle.value*coursetitle.studentnumber-Math.floor(coursetitle.value*coursetitle.studentnumber*(1-coupon.discount_percent/100))}</h5></td>
                </tr>
            </table>
            <table className="ShoppingBill-student ShoppingBill-table-style">
                <tr>
                    <th><h4>學員資訊</h4></th>
                    <th><h4>姓名</h4></th>
                    <th><h4>連絡電話</h4></th>
                    <th><h4>出生日期</h4></th>
                    <th><h4>Email</h4></th>
                </tr>
                <tr>
                    <td colspan="5"><hr/></td>
                </tr>
                {carddata.map((data)=>{
                    return(<tr className="ShoppingBill-student-info">
                            <td><h5>學員-{index++}</h5></td>
                            <td><h5>{data.lastName+data.firstName}</h5></td>
                            <td><h5>{data.telephone}</h5></td>
                            <td><h5>{data.birthday}</h5></td>
                            <td><h5>{data.email}</h5></td>
                        </tr>)
                    })}
            </table>
            <table className="ShoppingBill-orderer ShoppingBill-table-style">
                <tr>
                    <th><h4>訂購人資訊</h4></th>
                    <th><h4>姓名</h4></th>
                    <th><h4>連絡電話</h4></th>
                    <th><h4>出生日期</h4></th>
                    <th><h4>Email</h4></th>
                </tr>
                <tr>
                    <td colspan="5"><hr/></td>
                </tr>
                <tr className="ShoppingBill-orderer-info">
                    <td><h5>課程訂購人</h5></td>
                    <td><h5>{OrdererData.lastName+OrdererData.firstName}</h5></td>
                    <td><h5>{OrdererData.telephone}</h5></td>
                    <td><h5>{OrdererData.birthday}</h5></td>
                    <td><h5>{OrdererData.email}</h5></td>
                </tr>
            </table>
        </div>
        </>
    )
}
export default ShoppingBill;