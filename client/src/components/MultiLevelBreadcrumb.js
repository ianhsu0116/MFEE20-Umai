import React, { useState , useEffect } from 'react'
// 高階元件樣式(HOC)，增強元件用的
import { withRouter, Link } from 'react-router-dom'
// 中文路徑對照陣列，移出到config/index.js中設定
import { pathnameList, pathnameTextList } from '../index'

import CategoryService from "../services/category.service";

function MultiLevelBreadcrumb(props) {
  const { location } = props
  // let page_category = location.pathname.substr(1, 7)
  let category_number = Math.floor(location.search.slice(1));

  //麵包屑根據種類id判斷當前是什麼
  const [categoryid , setCategoryid] = useState('')

  const [categorylength , setCategorylength] = useState()

 
  useEffect(async () => {
    try {
      let result = await CategoryService.categoryID(category_number);
      console.log(result.data.categoryID[0].category_name)
      setCategoryid(result.data.categoryID[0].category_name)
      return
    } catch (error) {
      console.log(error);
   }
  }, []);


  // 抓課程全部長度
  useEffect(async () => {
    try {
      let result = await CategoryService.categoryLength();
      setCategorylength(result.data.category_length.length)
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

 if(categoryid){
    // 麵包屑增加名字
    textArray.push(categoryid)
    }
    // textArray.replace("?","")
    // '/product/baby/birth' -> ['','product','baby', 'birth']
    const pathArray = pathnameList[index].split('/')

 
    // 可讀性偏差，但時間因素先這樣撰寫　當location.search不是空值時(Ex category?1)，判斷是不是courses，不是的話加了問號會導到首頁，是的話當?小於0或大於7會導向7(全部分類)以及預設導向7
    if(location.search != ""){
      if(pathArray[1] != "courses"){
        alert("資料錯誤，將導向首頁")
        window.location.href='http://localhost:3000/';
      }   else if(pathArray[1] == "courses" && (category_number < 1|| category_number > categorylength)){
        alert("錯誤的分類，將導向全部分類")
        window.location.href='http://localhost:3000/courses/category?7';
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

    {console.log(categorylength)}
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