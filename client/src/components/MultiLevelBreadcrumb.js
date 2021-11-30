import React, { useState , useEffect } from 'react'
// 高階元件樣式(HOC)，增強元件用的
import { withRouter, Link } from 'react-router-dom'
// 中文路徑對照陣列，移出到config/index.js中設定
import { pathnameList, pathnameTextList } from '../index'

import CategoryService from "../services/category.service";

function MultiLevelBreadcrumb(props) {
  const { location } = props
  let category_number = location.search.slice(1);


  const [categoryid , setCategoryud] = useState([
    {category_name: '日式料理'}, //1
    {category_name: '韓式料理'}, //2
    {category_name: '法式料理'}, //3
    {category_name: '義式料理'}, //4
    {category_name: '中式料理'}, //5
    {category_name: '經典調酒'}, //6
    {category_name: '全部分類'}, //7
  ])

  useEffect(async () => {
    try {
      let result = await CategoryService.categoryID(category_number);
      // setCategoryud(result.data.categoryID)
      console.log(result.data)
      return
    } catch (error) {
      console.log(error);
   }
  }, []);




  // find index，目前匹配的pathname，它的中文是什麼
  const findPathnameIndex = (pathname,search) => {
    // 找到剛好的，從前面開始找起
    const foundIndex = pathnameList.findIndex((v, i) => v === pathname)
    // 沒找到剛好的路徑時用的(動態id params會遇到)
    // 例如：product/detail/123
    // 會用patchnameList的最後一個開始找起
    // 找到最長的比對的那個為路徑
    // ex. `product/detail/112` 會找到 `product/detail`
    if (foundIndex === -1) {
      for (let i = pathnameList.length - 1; i >= 0; i--) {
        if (pathname.includes(pathnameList[i])) {
          return i
        }
      }
    }

    return foundIndex
  }

  // 有一個項目和二個項目的情況
  const formatText = (index) => {
    if (index === -1) return ''

    // '/產品/嬰兒/初生兒' -> ['','產品','嬰兒', '初生兒']
    const textArray = pathnameTextList[index].split('/')
    if(location.search !== ""){
    textArray.push(location.search)
    }
    // textArray.replace("?","")
    // '/product/baby/birth' -> ['','product','baby', 'birth']
    const pathArray = pathnameList[index].split('/')

    // console.log(pathArray[1])

    if(location.search != ""){
      if(pathArray[1] != "courses"){
        console.log(pathArray[1])
        window.location.href='http://localhost:3000/';
      }   else if(location.search === "?1" || location.search === "日式料理" ){
        location.search = "日式料理"
      } else{
        // window.location.href='http://localhost:3000/';
      }
    } else if(pathArray[1] == "courses"){
      window.location.href='http://localhost:3000/courses/category?7';
    }

    const listArray = textArray.map((v, i, array) => {
      if (i === 0) return ''

      if (i === array.length - 1) {
        return (
          <li key={i} className="st-breadcrumb-item-end active" aria-current="page">
            <span>{v}</span>
          </li>
        )
      }

      return (
        <li key={i} className="st-breadcrumb-item">
          <Link to={pathArray.slice(0, i + 1).join('/')}><span>{v}</span></Link>
        </li>
      )
    })

    return listArray
  }

  

  return (
    <>
    {console.log(categoryid)}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="st-breadcrumb-homepage">
            <Link to="/"><span>首頁</span></Link>
          </li>
          {formatText(findPathnameIndex(location.pathname))}
        </ol>
      </nav>
    </>
  )
}

export default withRouter(MultiLevelBreadcrumb)