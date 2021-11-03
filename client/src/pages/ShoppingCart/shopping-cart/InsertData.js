function InsertData(){
    return(
        <>
            <div className="collapse">
                <h2>學員資料填寫</h2>
                <table className="Insert-data">
                    <tr>
                        <td className="Order-of-otudent"><h3>第1位學員資料填寫</h3></td>
                        <td className="Import-student-data"><a href="/ShoppingCart">匯入學員資料</a></td>
                    </tr>
                    <tr>
                        <td>
                            <div className="Box">
                                <h5>姓氏</h5>
                                <input className="Firstname" type="text"></input>
                            </div>
                        </td>
                        <td>
                            <div className="Box">
                                <h5>名字</h5>
                                <input className="Lastname" type="text"></input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="Box">
                                <h5>性別</h5>
                                <input className="Gender" type="text"></input>
                            </div>
                        </td>
                        <td>
                            <div className="Box">
                                <h5>出生日期</h5>
                                <input className="Birthdate" type="text"></input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="Box">
                                <h5>身分證字號</h5>
                                <input className="Idnumber" type="text"></input>
                            </div>
                        </td>
                        <td>
                            <div className="Box">
                                <h5>電話</h5>
                                <input className="Telephone" type="text"></input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="Box">
                                <h5>E-mail</h5>
                                <input className="Email" type="text"></input>
                            </div>
                        </td>
                        <td className="Update-to-student">
                            <div>
                                <input type="checkbox" className="Update-to-data"></input><h4>同步新增至預設學員資料</h4>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    )
}
export default InsertData;