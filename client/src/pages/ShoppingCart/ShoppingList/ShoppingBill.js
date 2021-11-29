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
                    <th><h2>課程資訊</h2></th>
                    <th><h2>課程費用</h2></th>
                    <th><h2>人數</h2></th>
                    <th><h2>優惠折扣</h2></th>
                    <th><h2>小計</h2></th>
                </tr>
                <tr>
                    <td colspan="5"><hr/></td>
                </tr> 
                <tr className="ShoppingBill-list-item">
                    <td>
                        <h4>{coursetitle.name}</h4>
                        <h5>報名人數剩餘5人</h5>
                    </td>
                    <td><h4>NT$ {coursetitle.value}</h4></td>
                    <td><h4>*{coursetitle.studentnumber}位</h4></td> 
                    <td><h4>NT$ {Math.floor(coursetitle.value*coursetitle.studentnumber*(1-coupon.discount_percent/100))}</h4></td>
                    <td><h4>NT$ {coursetitle.value*coursetitle.studentnumber-Math.floor(coursetitle.value*coursetitle.studentnumber*(1-coupon.discount_percent/100))}</h4></td>
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
                {carddata.map((data)=>{
                    return(<tr className="ShoppingBill-student-info">
                            <td>學員-{index++}</td>
                            <td>{data.lastName+data.firstName}</td>
                            <td>{data.telephone}</td>
                            <td>{data.birthday}</td>
                            <td>{data.email}</td>
                        </tr>)
                    })}
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
                    <td></td>
                    <td>{OrdererData.lastName+OrdererData.firstName}</td>
                    <td>{OrdererData.telephone}</td>
                    <td>{OrdererData.birthday}</td>
                    <td>{OrdererData.email}</td>
                </tr>
            </table>
        </div>
        </>
    )
}
export default ShoppingBill;