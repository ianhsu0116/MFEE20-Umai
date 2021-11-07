function ShoppingBill(){
    return(
        <>
        <div className="ShoppingBill-padding">
            <table className="ShoppingBill-list">
                <tr className="ShoppingBill-list-title">
                    <th><h2>課程資訊</h2></th>
                    <th><h2>課程費用</h2></th>
                    <th><h2>人數</h2></th>
                    <th><h2>小計</h2></th>
                </tr>
                <tr className="ShoppingBill-list-tool">
                    <td><h4>築地創意壽司</h4></td>
                    <td><h4>3300</h4></td>
                    <td><h4>3人</h4></td>
                    <td><h4>9900元</h4></td>
                </tr>
                <tr className="ShoppingBill-list-total">
                    <td><h4>應付金額</h4></td>
                    <td></td>
                    <td></td>
                    <td><h4>9900元</h4></td>
                </tr> 
                <tr className="ShoppingBill-list-Discount">
                    <td><h4>折扣費用</h4></td>
                    <td></td>
                    <td></td>
                    <td><h4>500元</h4></td>
                </tr>
                <tr className="ShoppingBill-list-count">
                    <td><h3>實付金額</h3></td>
                    <td></td>
                    <td></td>
                    <td><h4>9400元</h4></td>
                </tr>
            </table>
        </div>
        </>
    )
}
export default ShoppingBill;