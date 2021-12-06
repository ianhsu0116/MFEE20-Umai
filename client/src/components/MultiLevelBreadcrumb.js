import { alt } from 'joi';
import React, { useState , useEffect } from 'react'
// 高階元件樣式(HOC)，增強元件用的
import { withRouter, Link } from "react-router-dom";
// 中文路徑對照陣列，移出到config/index.js中設定
import { pathnameList, pathnameTextList } from "../index";

import CategoryService from "../services/category.service";

function MultiLevelBreadcrumb(props) {
  const { location } = props
  // let page_category = location.pathname.substr(1, 7)
  let category_number = location.search.slice(1);
  //麵包屑根據種類id判斷當前是什麼
  const [categoryid , setCategoryid] = useState('')

 
  useEffect(async () => {
    try {
      let result = await CategoryService.categoryLength(category_number);
      setCategoryid(result.data.category_length[0].category_name)
      return
    } catch (error) {
      console.log(error);
   }
  }, []);
  



  // find index，目前匹配的pathname，它的中文是什麼
  const findPathnameIndex = (pathname, search) => {
    // 找到剛好的，從前面開始找起
    const foundIndex = pathnameList.findIndex((v, i) => v === pathname);
    // 沒找到剛好的路徑時用的(動態id params會遇到)
    // 例如：product/detail/123
    // 會用patchnameList的最後一個開始找起
    // 找到最長的比對的那個為路徑
    // ex. `product/detail/112` 會找到 `product/detail`
    if (foundIndex === -1) {
      for (let i = pathnameList.length - 1; i >= 0; i--) {
        if (pathname.includes(pathnameList[i])) {
          return i;
        }
      }
    }

    return foundIndex;
  };

  // 有一個項目和二個項目的情況
  const formatText = (index) => {
    if (index === -1) return "";

    // '/產品/嬰兒/初生兒' -> ['','產品','嬰兒', '初生兒']
    const textArray = pathnameTextList[index].split('/')

 if(categoryid){
    // 麵包屑增加名字
    textArray.push(categoryid)
    }
    // textArray.replace("?","")
    // '/product/baby/birth' -> ['','product','baby', 'birth']
    const pathArray = pathnameList[index].split("/");
    if(location.search != ""){
    if(category_number == "Japan" || category_number == 1 || category_number == "%E6%97%A5%E5%BC%8F%E6%96%99%E7%90%86" ){
      category_number = 1
    } else if(category_number == "Korea" || category_number == 2 || category_number == "%E9%9F%93%E5%BC%8F%E6%96%99%E7%90%86"){
      category_number = 2
    } else if(category_number == "France" || category_number == 3 || category_number == "%E6%B3%95%E5%BC%8F%E6%96%99%E7%90%86"){
      category_number = 3
    } else if(category_number == "Italy" || category_number == 4 || category_number == "%E7%BE%A9%E5%BC%8F%E6%96%99%E7%90%86"){
      category_number = 4
    } else if(category_number == "Chinese" || category_number == 5 || category_number == "%E4%B8%AD%E5%BC%8F%E6%96%99%E7%90%86"){
      category_number = 5
    } else if(category_number == "Mediation" || category_number == 6 || category_number == "%E7%B6%93%E5%85%B8%E8%AA%BF%E9%A3%B2"){
      category_number = 6
    } else if(category_number == "All" || category_number == 7 || category_number == "all"){
      category_number = 7
    } else category_number = 0
     if(pathArray[1] != "courses"){
      alert("資料錯誤，將導向首頁")
      window.location.href='http://localhost:3000/';
    }   else if(pathArray[1] == "courses" && (category_number < 1|| category_number > 7)){
      alert("錯誤的分類，將導向全部分類")
      window.location.href='http://localhost:3000/courses/category?All';
    }
  }else if(pathArray[1] == "courses"){
    window.location.href='http://localhost:3000/courses/category?All';
  }

    // 可讀性偏差，但時間因素先這樣撰寫　當location.search不是空值時(Ex category?1)，判斷是不是courses，不是的話加了問號會導到首頁，是的話當?小於0或大於7會導向7(全部分類)以及預設導向7

  



    const listArray = textArray.map((v, i, array) => {
      if (i === 0) return "";

      if (i === array.length - 1) {
        return (
          <li
            key={i}
            className="st-breadcrumb-item-end active"
            aria-current="page"
          >
            <span>{v}</span>
          </li>
        );
      }

      return (
        <li key={i} className="st-breadcrumb-item">
          <Link to={pathArray.slice(0, i + 1).join("/")}>
            <span>{v}</span>
          </Link>
        </li>
      );
    });

    return listArray;
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="st-breadcrumb-homepage">
            <Link to="/">
              <span>首頁</span>
            </Link>
          </li>
          {formatText(findPathnameIndex(location.pathname))}
        </ol>
      </nav>
    </>
  );
}

export default withRouter(MultiLevelBreadcrumb);
