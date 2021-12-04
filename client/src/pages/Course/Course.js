import React, { useState, useEffect } from "react";
import MultiLevelBreadcrumb from "../../components/MultiLevelBreadcrumb";
import Swal from "sweetalert2";

import { withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../config/config";

import CourseCard from "../../components/CourseCard1";

import CategoryService from "../../services/category.service";
import getValidMessage from "../../validMessage/validMessage";
import { number } from "joi";

function Course(props) {
  const { location } = props;
  let category_number = location.search.slice(1);

  const [selectedOptionLevel, setSelectedOptionLevel] = useState('')
  const [selectedOptionDate, setSelectedOptionDate] = useState('')
  const [selectedOptionStart, setSelectedOptionStart] = useState('課程評價')

  const [categoryname, setCategoryname] = useState('')

  const [category , setCategory] = useState([{
    id: 12,
    member_id: 1,
    category_id: 2,
    course_detail:
      '{"slider_images":["course-3a76bc53-812a-44ee-9d35-c0183e6a5676.jpg","course-6c80c573-fd17-41bf-b0e9-55ae4fe7fb5b.jpg","course-cb4a85cf-4bdd-4d5b-aecb-6766e74bf646.jpg"],"time_of_course":"平日上午10:30 ~ 下午04:00","course_ig":"https://www.instagram.com/","course_fb":"https://www.facebook.com/","title1_1":"한국에서 가장 인기 있는 편지 요리는 모두 숨겨져 있지 않습니다！","title1_2":"讓您輕鬆學會韓國時下最流行的函式料理","content1":"     在朝鮮半島處於1萬年前的新石器時代，就已經有原始人使用石頭做的鍋子、對綠豆等豆科植物進行烹煮的記錄，這成為了石鍋拌飯和大醬湯等韓式鍋類料理的源頭。\\n5世紀的朝鮮三國時代，因為韓半島國家篤信佛教，因此禁止肉食和殺生，卻反而催生出了豐富的素菜文化。這些韓式小菜有一個專有名詞，叫作「飯饌」。到7世紀，由於新羅統一了朝鮮半島並且接受唐朝的禮樂服飾文化，原本純粹的佛教信仰被中國的「佛道儒」三教混合信仰稀釋。\\n也因為唐朝經過絲綢之路而獲得的各種新式香辛料傳入新羅，導致朝鮮半島的素菜文化漸漸褪去。此時，韓式小菜又被加上了蒜、韭菜、生薑、大蔥、小蔥、唐辛子、辣椒等輔助型辛香料。而在20世紀開始，大韓民國為了尋求自己國家美食文化的獨特性。","title2":"韓國時下年輕人最愛吃的六道韓式料理！","six_dishes":[{"dishes_image":"course-84c91fc3-cddb-406f-be45-b172173e8b4d.jpg","dishes_title":"慢燉人蔘雞湯","dishes_content":"蔘雞湯（韓語：삼계탕／蔘鷄湯）朝鮮半島的傳統名菜之一，以整隻童子雞，腹中塞入糯米、佐以紅棗、薑、蒜和人蔘長時間燉煮製成。朝鮮王朝時期的雞肉類菜餚以清燉雞為主，在日本殖民統治時期，朝鮮半島的富裕階層發明了在清燉雞湯上添撒人參粉的做法。現代的參雞湯最早出現於上世紀60年代，在70年代以後逐漸家喻戶曉。"},{"dishes_image":"course-1f829d2a-c262-4101-bd7b-f2eaab2eb78f.jpg","dishes_title":"韓式醬菜","dishes_content":"辛奇起源於朝鮮三國時代，最初稱為「沉菜」（中古朝鮮語：침채／沈菜 Chimchae）。概因其原為一種利用當地蔬菜製作的酸菜或鹹菜，取菜沉於水中之貌而命名，而後語音訛變才成為今日之名。另外據《三國史記》記載，神文王於683年娶王妃時下令準備的聘禮中包括醬油、大醬、醬汁類等食品。即「泡菜類」，中國稱其為「葅」，在朝鮮三國時代後經過統一新羅時代、高麗時代，其製作方法不斷改變。在當時，辛奇可能是以蘿蔔為主"},{"dishes_image":"course-1116feb2-8b63-438a-a711-b3cfa5a6e492.jpg","dishes_title":"韓國炸牛排","dishes_content":"炸牛排選用的牛肉部位較便宜也比較少人愛吃，例如牛肩、腿肉，有時會用腹肉。也可以用碎牛肉、絞肉或臀尖肉做炸牛排。用牛絞肉做的炸牛排有時稱為「chuckwagon」。 炸牛排通常在午餐或晚餐食用，澆有奶油肉汁，配菜是馬鈴薯泥、蔬菜與比司吉。炸牛排在中西部則常見於早餐，搭配吐司和薯餅。炸牛排可以夾入漢堡麵包；也可以切丁後塞進烤馬鈴薯，搭配肉汁和起司；也可以切條裝在籃子裡薯條及肉汁一起吃。"},{"dishes_image":"course-5892c8bd-3e9d-4409-bc28-34d07a9ff40e.jpg","dishes_title":"韓式醬油蟹","dishes_content":"醬油蟹（韓語：게장），韓國五大名菜之一，將未經烹調的生蟹放在醬油中醃製而成，當地民眾喜愛直接將白飯加進蟹蓋內與蟹黃一起伴吃，故這道菜色又名「偷飯賊」。朝鮮傳統醫學認為螃蟹性寒，有助驅除春溫，醬油蟹於山林經濟、閨閤叢書、是議全書等李氏朝鮮時期的典籍中有所記載。追源中國蟹醬，這種吃法起源很早，在《周禮》上早有記載。 蟹醬，是一種把蟹搗爛、鹽藏酒漬而成的調味品。"},{"dishes_image":"course-cb75e705-e89b-4da3-8095-37bd092dbd40.jpeg","dishes_title":"韓式辣炒年糕","dishes_content":"辣炒年糕（韓語：떡볶이），又叫韓式炒年糕，是一道很受歡迎的韓國小吃，一般能在當地的路邊攤或布帳馬車處買到[1]。這道菜的雛形是燉朝鮮打糕（떡찜），是用年糕片、肉、蛋和調味料做成的一道燉菜。炒年糕從前是朝鮮宮廷料理中的一道菜[2]。這種炒年糕是由水煮條狀年糕、肉、菜及調味汁製成，上桌前會在上面加白果及核桃。最初的炒年糕（當時叫宮中炒年糕）是宮廷用作招待賓客的菜，因此是當時高檔菜的代表作。"},{"dishes_image":"course-c88107ff-de5c-4563-8696-5f55fc0ebc24.jpeg","dishes_title":"韓式蒸蛋","dishes_content":"蒸蛋（中國大陸、香港稱為蒸水蛋），又稱水蒸蛋、雞蛋羹 ，為韓國飪中常見的小菜。各地做法細節均有所不同，一般而言，蒸蛋應先將雞蛋打散成蛋液，加入調味料如鹽或醬油和飲用水一起攪勻蒸熟後，澆上熟油或蔥花即可。"}],"content2":"韓國料理由來\\n韓國料理基本知識\\n韓式泡菜認識\\n六道流行韓式料理\\n韓式醬菜\\n韓國炸牛排\\n慢燉人蔘雞湯\\n韓式醬油蟹\\n韓式辣炒年糕\\n韓式蒸蛋\\n韓式餐具一套(湯匙、筷子)","content3":"由於課前需帶同學認識廚房安全知識以及，簡單的韓國料理歷史，需要報名的學員於開課時間前15分鍾來到現場。"}',
    course_image: "course-3a76bc53-812a-44ee-9d35-c0183e6a5676.jpg",
    course_name: "2021時下流行韓國精緻料理",
    course_price: 4800,
    course_hour: 6,
    course_level: 2,
    member_limit: 20,
    company_name: "楓 - 韓式料理",
    company_address: "台北101",
    created_time: "2021-11-25 17:58:23",
    valid: 1,
    category_name: "韓式料理",
    first_name: "Tony",
    last_name: "Stark",
    score_sum: null,
    score_count: 0,
    closest_batchs: {
      batch_id: 56,
      course_id: 12,
      batch_date: "2021-12-01",
      member_count: 0,
    },
  }])

  //設定一個不會動的陣列
  const [categoryOrigin , setCategoryOrigin] = useState([{
    id: 12,
    member_id: 1,
    category_id: 2,
    course_detail:
      '{"slider_images":["course-3a76bc53-812a-44ee-9d35-c0183e6a5676.jpg","course-6c80c573-fd17-41bf-b0e9-55ae4fe7fb5b.jpg","course-cb4a85cf-4bdd-4d5b-aecb-6766e74bf646.jpg"],"time_of_course":"平日上午10:30 ~ 下午04:00","course_ig":"https://www.instagram.com/","course_fb":"https://www.facebook.com/","title1_1":"한국에서 가장 인기 있는 편지 요리는 모두 숨겨져 있지 않습니다！","title1_2":"讓您輕鬆學會韓國時下最流行的函式料理","content1":"     在朝鮮半島處於1萬年前的新石器時代，就已經有原始人使用石頭做的鍋子、對綠豆等豆科植物進行烹煮的記錄，這成為了石鍋拌飯和大醬湯等韓式鍋類料理的源頭。\\n5世紀的朝鮮三國時代，因為韓半島國家篤信佛教，因此禁止肉食和殺生，卻反而催生出了豐富的素菜文化。這些韓式小菜有一個專有名詞，叫作「飯饌」。到7世紀，由於新羅統一了朝鮮半島並且接受唐朝的禮樂服飾文化，原本純粹的佛教信仰被中國的「佛道儒」三教混合信仰稀釋。\\n也因為唐朝經過絲綢之路而獲得的各種新式香辛料傳入新羅，導致朝鮮半島的素菜文化漸漸褪去。此時，韓式小菜又被加上了蒜、韭菜、生薑、大蔥、小蔥、唐辛子、辣椒等輔助型辛香料。而在20世紀開始，大韓民國為了尋求自己國家美食文化的獨特性。","title2":"韓國時下年輕人最愛吃的六道韓式料理！","six_dishes":[{"dishes_image":"course-84c91fc3-cddb-406f-be45-b172173e8b4d.jpg","dishes_title":"慢燉人蔘雞湯","dishes_content":"蔘雞湯（韓語：삼계탕／蔘鷄湯）朝鮮半島的傳統名菜之一，以整隻童子雞，腹中塞入糯米、佐以紅棗、薑、蒜和人蔘長時間燉煮製成。朝鮮王朝時期的雞肉類菜餚以清燉雞為主，在日本殖民統治時期，朝鮮半島的富裕階層發明了在清燉雞湯上添撒人參粉的做法。現代的參雞湯最早出現於上世紀60年代，在70年代以後逐漸家喻戶曉。"},{"dishes_image":"course-1f829d2a-c262-4101-bd7b-f2eaab2eb78f.jpg","dishes_title":"韓式醬菜","dishes_content":"辛奇起源於朝鮮三國時代，最初稱為「沉菜」（中古朝鮮語：침채／沈菜 Chimchae）。概因其原為一種利用當地蔬菜製作的酸菜或鹹菜，取菜沉於水中之貌而命名，而後語音訛變才成為今日之名。另外據《三國史記》記載，神文王於683年娶王妃時下令準備的聘禮中包括醬油、大醬、醬汁類等食品。即「泡菜類」，中國稱其為「葅」，在朝鮮三國時代後經過統一新羅時代、高麗時代，其製作方法不斷改變。在當時，辛奇可能是以蘿蔔為主"},{"dishes_image":"course-1116feb2-8b63-438a-a711-b3cfa5a6e492.jpg","dishes_title":"韓國炸牛排","dishes_content":"炸牛排選用的牛肉部位較便宜也比較少人愛吃，例如牛肩、腿肉，有時會用腹肉。也可以用碎牛肉、絞肉或臀尖肉做炸牛排。用牛絞肉做的炸牛排有時稱為「chuckwagon」。 炸牛排通常在午餐或晚餐食用，澆有奶油肉汁，配菜是馬鈴薯泥、蔬菜與比司吉。炸牛排在中西部則常見於早餐，搭配吐司和薯餅。炸牛排可以夾入漢堡麵包；也可以切丁後塞進烤馬鈴薯，搭配肉汁和起司；也可以切條裝在籃子裡薯條及肉汁一起吃。"},{"dishes_image":"course-5892c8bd-3e9d-4409-bc28-34d07a9ff40e.jpg","dishes_title":"韓式醬油蟹","dishes_content":"醬油蟹（韓語：게장），韓國五大名菜之一，將未經烹調的生蟹放在醬油中醃製而成，當地民眾喜愛直接將白飯加進蟹蓋內與蟹黃一起伴吃，故這道菜色又名「偷飯賊」。朝鮮傳統醫學認為螃蟹性寒，有助驅除春溫，醬油蟹於山林經濟、閨閤叢書、是議全書等李氏朝鮮時期的典籍中有所記載。追源中國蟹醬，這種吃法起源很早，在《周禮》上早有記載。 蟹醬，是一種把蟹搗爛、鹽藏酒漬而成的調味品。"},{"dishes_image":"course-cb75e705-e89b-4da3-8095-37bd092dbd40.jpeg","dishes_title":"韓式辣炒年糕","dishes_content":"辣炒年糕（韓語：떡볶이），又叫韓式炒年糕，是一道很受歡迎的韓國小吃，一般能在當地的路邊攤或布帳馬車處買到[1]。這道菜的雛形是燉朝鮮打糕（떡찜），是用年糕片、肉、蛋和調味料做成的一道燉菜。炒年糕從前是朝鮮宮廷料理中的一道菜[2]。這種炒年糕是由水煮條狀年糕、肉、菜及調味汁製成，上桌前會在上面加白果及核桃。最初的炒年糕（當時叫宮中炒年糕）是宮廷用作招待賓客的菜，因此是當時高檔菜的代表作。"},{"dishes_image":"course-c88107ff-de5c-4563-8696-5f55fc0ebc24.jpeg","dishes_title":"韓式蒸蛋","dishes_content":"蒸蛋（中國大陸、香港稱為蒸水蛋），又稱水蒸蛋、雞蛋羹 ，為韓國飪中常見的小菜。各地做法細節均有所不同，一般而言，蒸蛋應先將雞蛋打散成蛋液，加入調味料如鹽或醬油和飲用水一起攪勻蒸熟後，澆上熟油或蔥花即可。"}],"content2":"韓國料理由來\\n韓國料理基本知識\\n韓式泡菜認識\\n六道流行韓式料理\\n韓式醬菜\\n韓國炸牛排\\n慢燉人蔘雞湯\\n韓式醬油蟹\\n韓式辣炒年糕\\n韓式蒸蛋\\n韓式餐具一套(湯匙、筷子)","content3":"由於課前需帶同學認識廚房安全知識以及，簡單的韓國料理歷史，需要報名的學員於開課時間前15分鍾來到現場。"}',
    course_image: "course-3a76bc53-812a-44ee-9d35-c0183e6a5676.jpg",
    course_name: "2021時下流行韓國精緻料理",
    course_price: 4800,
    course_hour: 6,
    course_level: 2,
    member_limit: 20,
    company_name: "楓 - 韓式料理",
    company_address: "台北101",
    created_time: "2021-11-25 17:58:23",
    valid: 1,
    category_name: "韓式料理",
    first_name: "Tony",
    last_name: "Stark",
    score_sum: null,
    score_count: 0,
    closest_batchs: {
      batch_id: 56,
      course_id: 12,
      batch_date: "2021-12-01",
      member_count: 0,
    },
  ]);

  useEffect(async () => {
    try {
      let result = await CategoryService.categoryID(category_number);
      setCategory(result.data.courseDetail)
      setCategoryOrigin(result.data.courseDetail)
      setCategoryname(result.data.categoryID[0].category_name)
      return
    } catch (error) {
      console.log(error);
    }
  }, []);

  if(location.search != ""){
    if(category_number == "Japan" || category_number == 1 || category_number == "%E6%97%A5%E5%BC%8F%E6%96%99%E7%90%86" ){
      category_number = 1
      console.log(category_number)
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
    } else category_number = 0}

  //    // 當前所有收藏課程
  // const [currentCourses, setCurrentCourses] = useState([]);

  // // 當前使用者所有的收藏課程id
  // const [collectionIds, setCollectionIds] = useState([]);

  // // 重整當前收藏課程
  // let refreshCollection = async () => {
  //   try {
  //     let result = await CourseService.course_collection(currentUser.id);

  //     // 如果這次沒回傳任何course
  //     if (!result.data.course) {
  //       //console.log("good");
  //       setCurrentCourses([]);
  //       setCollectionIds([]);
  //       return;
  //     }

  //     // 設定當前課程的資料Array
  //     setCurrentCourses(result.data.course);

  //     // 設定當前使用者的所有收藏課程Array
  //     setCollectionIds(result.data.course.map((item) => item.id));
  //   } catch (error) {
  //     console.log(error.response);
  //     let { code } = error.response.data;

  //     // 跳通知
  //     Swal.fire({
  //       icon: "error",
  //       title: getValidMessage("course", code),
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }
  // };



  // NaN資料型態是Number
  useEffect(()=> {
    if(selectedOptionDate === "離今日最近"){
      setCategory(
        [...category].filter(function(item){
           return item.closest_batchs.batch_date != null
        }).sort(function (a, b) {
          return a.closest_batchs.batch_date >  b.closest_batchs.batch_date  ? 1 : -1;
       })
      );
  }
  if(selectedOptionDate === "離今日最遠"){
    setCategory(
      [...category].filter(function(item){
         return item.closest_batchs.batch_date != null
      }).sort(function (a, b) {
        return a.closest_batchs.batch_date <  b.closest_batchs.batch_date ? 1 : -1;
     })
    );}
  },[selectedOptionDate]);
  
  useEffect(()=> {
    if(selectedOptionStart === "評分由高到低" && selectedOptionDate === "離今日最近"){
      setCategory(
        [...category].sort(function (a, b) {
        return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
        }).sort(function (a, b) {
          return a.closest_batchs.batch_date  > b.closest_batchs.batch_date ? 1 : -1;
          })
      );
    } else if(selectedOptionStart === "評分由高到低" && selectedOptionDate === "離今日最遠"){
    setCategory(
      [...category].sort(function (a, b) {
      return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
      }).sort(function (a, b) {
        return a.closest_batchs.batch_date  < b.closest_batchs.batch_date ? 1 : -1;
        })
    );
   }  
    else if (selectedOptionStart === "評分由高到低"){
    setCategory(
      [...category].sort(function (a, b) {
      return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  < (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
      })
    );
   }
  if(selectedOptionStart === "評分由低到高" && selectedOptionDate === "離今日最近"){
    setCategory(
      [...category].sort(function (a, b) {
      return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  < (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
      }).sort(function (a, b) {
        return a.closest_batchs.batch_date  > b.closest_batchs.batch_date ? 1 : -1;
        })
    );
 }  else if(selectedOptionStart === "評分由低到高" && selectedOptionDate === "離今日最遠"){
  setCategory(
    [...category].sort(function (a, b) {
    return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  < (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
    }).sort(function (a, b) {
      return a.closest_batchs.batch_date  < b.closest_batchs.batch_date ? 1 : -1;
      })
  );
 }   
 else if (selectedOptionStart === "評分由低到高"){
  setCategory(
    [...category].sort(function (a, b) {
    return (isNaN(a.score_sum / a.score_count) ? 0 : a.score_sum / a.score_count )  > (isNaN(b.score_sum / b.score_count) ?  0 : b.score_sum / b.score_count) ? 1 : -1;
    })
  );
    }
  },[selectedOptionStart]);
  
// 根據level判斷分類 3初2中1高
  useEffect(()=> {
    if(selectedOptionLevel === ""){
      setCategory(
        [...categoryOrigin]
      );
  }
    if(selectedOptionLevel === "3"){
      setCategory(
        [...categoryOrigin].filter(function(item){
           return item.course_level == 3
        })
      );
  }
  if(selectedOptionLevel === "2"){
    setCategory(
      [...categoryOrigin].filter(function(item){
         return item.course_level == 2
      })
    );
}
  if(selectedOptionLevel === "1"){
    setCategory(
      [...categoryOrigin].filter(function(item){
        return item.course_level == 1
     })
   );
   ;}
},[selectedOptionLevel]);



  let categoryCard = []
  for (let i = 0; i < category.length ; i++)
  {
    categoryCard.push(<CourseCard
      courseDetail={category[i]}
      collectionIds={["1"]} //判斷是否收藏(可以給空)
      handleAddIntoCollection={122} //加入收藏
      handleAddIntoCart={5464} //加入購物車
      handlePurchase={4564} //直接購買
    />)
  }
  return (
    <>
    {console.log(category)}
    <div className="Course">
      <div className="CourseBreadbox"><MultiLevelBreadcrumb /></div>
      <div className="CourseCategroy">{categoryname}</div>
      <div className="st-line"></div>
      <div className="CourseRecommendTitle">本週推薦課程</div>
      <div className="CourseVideo"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/MKdvHnTk0xs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
      <div className="CourseRecommendTitle">熱門學習組合</div>
      <div className="CourseSixBox"></div>
      <div className="CourseCategroy">課程列表</div>
      <div className="st-line"></div>
        <div className="CourseSelect">
          <select
            onChange={(e) => {
              setSelectedOptionLevel(e.target.value)
              setSelectedOptionDate("");
            }}
          >
          {/* 3 初級 2 中級 1 高級  */}
            <option value="">全部分類</option>
            <option value="3">初級</option>
            <option value="2">中級</option>
            <option option value="1">高級</option>
          </select>

          <select
            onChange={(e) => { 
              setSelectedOptionDate(e.target.value)
            }}
          >
            <option value="" selected={selectedOptionDate == ''}>上課時間</option>
            <option value="離今日最近">離今日最近</option>
            <option value="離今日最遠">離今日最遠</option>
          </select>

          <select
            onChange={(e) => {
              setSelectedOptionStart(e.target.value)
            }}
          >
            <option value="">課程評分</option>
            <option value="評分由高到低">評分由高到低</option>
            <option value="評分由低到高">評分由低到高</option>
          </select>
        </div>
            <div className="CourseCard">
            {categoryCard}
            </div>
    </div>
    </>
  );
}

export default withRouter (Course);
