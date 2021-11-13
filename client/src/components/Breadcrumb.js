// import React from 'react'
// import { Link, withRouter } from 'react-router-dom'

// function Breadcrumb(props) {
//   console.log(props)

//   // 可由 props.location.pathname 得到目前的路由名稱
//   // 用一組比對的陣列
//   const pathnameList = ['/productlist', '/productdetail']
//   const pathnameTextList = ['商品列表', '商品詳細']

//   const convertPathnameToText = () => {
//     console.log(props.location.pathname)
//     // 尋找對應的索引值
//     const index = pathnameList.indexOf(props.location.pathname)

//     console.log(index)
//     // 回傳中文的名稱
//     return pathnameTextList[index]
//   }

//   return (
//     <>
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item">
//             <Link to="/">首頁</Link>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             {convertPathnameToText()}
//           </li>
//         </ol>
//       </nav>
//     </>
//   )
// }

// export default withRouter(Breadcrumb)