import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";
import MemberSidebar from "../../components/member/MemberSidebar";
import MemberInfo from "./MemberInfo";
import DefaultStudent from "./DefaultStudent";
import OrderInfo from "./OrderInfo";
import CollectionCourse from "./CollectionCourse";
import CollectionCoupons from "./CollectionCoupons";
import CollectionArticle from "./CollectionArticle";
import CourseInsert from "./CourseInsert";
import ChefIntro from "./ChefIntro";

import CourseReview from "./CourseReview/CourseReview";

const MemberCenter = (props) => {
  let {
    currentUser,
    setCurrentUser,
    clearNewAddCourse,
    addCourseIntoCart,
    checkoutCourse,
    setCheckoutCourse,
  } = props;

  // 確認當前登入狀態
  const history = useHistory();
  useEffect(async () => {
    // 如果當前沒有使用者的話，直接導回首頁
    if (!currentUser) {
      return history.push("/");
    }
  }, []);

  // 紀錄當前正在瀏覽的看板
  const [currentBoard, setCurrentBoard] = useState("會員資訊");

  // 是否為預覽狀態 (給CourseInsert專用)
  const [isReview, setIsReview] = useState(false);

  // CourseReview的預設資料
  // const [courseDetail, setCourseDetail] = useState({
  //   slider_images: ["img_name", "img_name", "img_name"],
  //   time_of_course: "範例：平日上午10:30 ~ 下午04:00",
  //   course_ig: "https://www.instagram.com/",
  //   course_fb: "https://www.facebook.com/",
  //   title1_1: "請填寫課程介紹區的上標題",
  //   title1_2: "請填寫課程介紹區的下標題",
  //   content1: "請填寫課程介紹區的詳細內容",
  //   title2: "請填寫六種課程教材展示區的標題",
  //   six_dishes: [
  //     {
  //       dishes_image: "img_name",
  //       dishes_title: "教材標題",
  //       dishes_content: "請填寫課程教材介紹",
  //     },
  //     {
  //       dishes_image: "img_name",
  //       dishes_title: "教材標題",
  //       dishes_content: "請填寫課程教材介紹",
  //     },
  //     {
  //       dishes_image: "img_name",
  //       dishes_title: "教材標題",
  //       dishes_content: "請填寫課程教材介紹",
  //     },
  //     {
  //       dishes_image: "img_name",
  //       dishes_title: "教材標題",
  //       dishes_content: "請填寫課程教材介紹",
  //     },
  //     {
  //       dishes_image: "img_name",
  //       dishes_title: "教材標題",
  //       dishes_content: "請填寫課程教材介紹",
  //     },
  //     {
  //       dishes_image: "img_name",
  //       dishes_title: "教材標題",
  //       dishes_content: "請填寫課程教材介紹",
  //     },
  //   ],
  //   content2: "費用包含詳細內容\n請條列式敘述",
  //   content3: "請填寫課程所需的注意事項說明",

  //   // 下方是table內的獨立欄位，不是存在json內
  //   course_image: "", // 課程卡片的首圖 (拿slider的第一張圖來用)
  //   course_name: "請填寫課程名稱",
  //   course_price: 2000,
  //   course_hour: "XX",
  //   course_level: "1", // 1, 2, 3 (高階 中階 初階)
  //   member_limit: 30,
  //   company_name: "請填寫公司名稱",
  //   company_address: "請填寫公司詳細地址",
  //   category_id: "1",
  //   member_id: "1",
  //   course_batch: [""],

  //   member_count: 0, //現在人數　　原本沒有我新增的
  //   course_score: 5, //分數　　　　原本沒有我新增的
  //   course_percent: 0, //評論人數　 原本沒有我新增的
  //   course_chef: currentUser
  //     ? `${currentUser.first_name} ${currentUser.last_name}`
  //     : "主廚名稱", //主廚名稱　 原本沒有我新增的
  // });

  // 課程新增頁面的課程詳細資料（預設）
  const [courseDetail, setCourseDetail] = useState({
    slider_images: ["img_name", "img_name", "img_name"],
    time_of_course: "平日上午10:30 ~ 下午04:00",
    course_ig: "https://www.instagram.com/",
    course_fb: "https://www.facebook.com/",
    title1_1: "한국에서 가장 인기 있는 편지 요리는 모두 숨겨져 있지 않습니다！",
    title1_2: "讓您輕鬆學會韓國時下最流行的函式料理",
    content1:
      "     在朝鮮半島處於1萬年前的新石器時代，就已經有原始人使用石頭做的鍋子、對綠豆等豆科植物進行烹煮的記錄，這成為了石鍋拌飯和大醬湯等韓式鍋類料理的源頭。\n\n5世紀的朝鮮三國時代，因為韓半島國家篤信佛教，因此禁止肉食和殺生，卻反而催生出了豐富的素菜文化。這些韓式小菜有一個專有名詞，叫作「飯饌」。到7世紀，由於新羅統一了朝鮮半島並且接受唐朝的禮樂服飾文化，原本純粹的佛教信仰被中國的「佛道儒」三教混合信仰稀釋。\n\n也因為唐朝經過絲綢之路而獲得的各種新式香辛料傳入新羅，導致朝鮮半島的素菜文化漸漸褪去。此時，韓式小菜又被加上了蒜、韭菜、生薑、大蔥、小蔥、唐辛子、辣椒等輔助型辛香料。\n\n而在20世紀開始，大韓民國為了尋求自己國家美食文化的獨特性，叫作「飯饌」。到7世紀，由於新羅統一了朝鮮半島並且接受唐朝的禮樂服飾文化，原本純粹的佛教信仰被中國的「佛道儒」。",
    title2: "韓國時下年輕人最愛吃的六道韓式料理！",
    six_dishes: [
      {
        dishes_image: "img_name",
        dishes_title: "慢燉人蔘雞湯",
        dishes_content:
          "蔘雞湯（韓語：삼계탕／蔘鷄湯）朝鮮半島的傳統名菜之一，以整隻童子雞，腹中塞入糯米、佐以紅棗、薑、蒜和人蔘長時間燉煮製成。朝鮮王朝時期的雞肉類菜餚以清燉雞為主，在日本殖民統治時期，朝鮮半島的富裕階層發明了在清燉雞湯上添撒人參粉的做法。現代的參雞湯最早出現於上世紀60年代，在70年代以後逐漸家喻戶曉。",
      },
      {
        dishes_image: "img_name",
        dishes_title: "韓式醬菜",
        dishes_content:
          "辛奇起源於朝鮮三國時代，最初稱為「沉菜」（中古朝鮮語：침채／沈菜 Chimchae）。概因其原為一種利用當地蔬菜製作的酸菜或鹹菜，取菜沉於水中之貌而命名，而後語音訛變才成為今日之名。另外據《三國史記》記載，神文王於683年娶王妃時下令準備的聘禮中包括醬油、大醬、醬汁類等食品。即「泡菜類」，中國稱其為「葅」，在朝鮮三國時代後經過統一新羅時代、高麗時代，其製作方法不斷改變。在當時，辛奇可能是以蘿蔔為主",
      },
      {
        dishes_image: "img_name",
        dishes_title: "韓國炸牛排",
        dishes_content:
          "炸牛排選用的牛肉部位較便宜也比較少人愛吃，例如牛肩、腿肉，有時會用腹肉。也可以用碎牛肉、絞肉或臀尖肉做炸牛排。用牛絞肉做的炸牛排有時稱為「chuckwagon」。 炸牛排通常在午餐或晚餐食用，澆有奶油肉汁，配菜是馬鈴薯泥、蔬菜與比司吉。炸牛排在中西部則常見於早餐，搭配吐司和薯餅。炸牛排可以夾入漢堡麵包；也可以切丁後塞進烤馬鈴薯，搭配肉汁和起司；也可以切條裝在籃子裡薯條及肉汁一起吃。",
      },
      {
        dishes_image: "img_name",
        dishes_title: "韓式醬油蟹",
        dishes_content:
          "醬油蟹（韓語：게장），韓國五大名菜之一，將未經烹調的生蟹放在醬油中醃製而成，當地民眾喜愛直接將白飯加進蟹蓋內與蟹黃一起伴吃，故這道菜色又名「偷飯賊」。朝鮮傳統醫學認為螃蟹性寒，有助驅除春溫，醬油蟹於山林經濟、閨閤叢書、是議全書等李氏朝鮮時期的典籍中有所記載。追源中國蟹醬，這種吃法起源很早，在《周禮》上早有記載。 蟹醬，是一種把蟹搗爛、鹽藏酒漬而成的調味品。",
      },
      {
        dishes_image: "img_name",
        dishes_title: "韓式辣炒年糕",
        dishes_content:
          "辣炒年糕（韓語：떡볶이），又叫韓式炒年糕，是一道很受歡迎的韓國小吃，一般能在當地的路邊攤或布帳馬車處買到[1]。這道菜的雛形是燉朝鮮打糕（떡찜），是用年糕片、肉、蛋和調味料做成的一道燉菜。炒年糕從前是朝鮮宮廷料理中的一道菜[2]。這種炒年糕是由水煮條狀年糕、肉、菜及調味汁製成，上桌前會在上面加白果及核桃。最初的炒年糕（當時叫宮中炒年糕）是宮廷用作招待賓客的菜，因此是當時高檔菜的代表作。",
      },
      {
        dishes_image: "img_name",
        dishes_title: "韓式蒸蛋",
        dishes_content:
          "蒸蛋（中國大陸、香港稱為蒸水蛋），又稱水蒸蛋、雞蛋羹 ，為韓國飪中常見的小菜。各地做法細節均有所不同，一般而言，蒸蛋應先將雞蛋打散成蛋液，加入調味料如鹽或醬油和飲用水一起攪勻蒸熟後，澆上熟油或蔥花即可。",
      },
    ],
    content2:
      "韓國料理由來\n韓國料理基本知識\n韓式泡菜認識\n六道流行韓式料理\n韓式醬菜\n韓國炸牛排\n慢燉人蔘雞湯\n韓式醬油蟹\n韓式辣炒年糕\n韓式蒸蛋\n韓式餐具一套(湯匙、筷子)",
    content3:
      "由於課前需帶同學認識廚房安全知識以及，簡單的韓國料理歷史，需要報名的學員於開課時間前15分鍾來到現場。",

    // 下方是table內的獨立欄位，不是存在json內
    course_image: "", // 課程卡片的首圖 (拿slider的第一張圖來用)
    course_name: "2021時下流行韓國精緻料理",
    course_price: 4800,
    course_hour: 6,
    course_level: "2", // 1, 2, 3 (高階 中階 初階)
    member_limit: 20,
    company_name: "楓 - 韓式料理",
    company_address: "台北101",
    category_id: "2",
    member_id: "1",
    course_batch: [""],

    member_count: 0, //現在人數　　原本沒有我新增的
    course_score: 5, //分數　　　　原本沒有我新增的
    course_percent: 0, //評論人數　 原本沒有我新增的
    course_chef: currentUser
      ? `${currentUser.first_name} ${currentUser.last_name}`
      : "主廚名稱", //主廚名稱　 原本沒有我新增的
  });
  // 即時更新課程預設資料內的主廚名稱
  useEffect(() => {
    setCourseDetail({
      ...courseDetail,
      course_chef: currentUser
        ? `${currentUser.first_name} ${currentUser.last_name}`
        : "主廚名稱",
    });
  }, [currentUser]);

  // 課程新增頁面 => 儲存slider上傳的圖片(二元編碼 即時顯示使用)
  const [sliderImage, setSliderImage] = useState(["", "", ""]);

  // 課程新增頁面 => 儲存課程教材(six_dishes)上傳的圖片(二元編碼 即時顯示用)
  const [sixDishesImage, setSixDishesImage] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  return (
    <div className="MemberCenter">
      <div className="MemberCenter-container">
        <MemberSidebar
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        {currentBoard === "會員資訊" && (
          <MemberInfo
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
        {currentBoard === "預設學員" && (
          <DefaultStudent currentUser={currentUser} />
        )}
        {currentBoard === "訂單資訊" && <OrderInfo currentUser={currentUser} />}
        {currentBoard === "收藏課程" && (
          <CollectionCourse currentUser={currentUser} />
        )}
        {currentBoard === "收藏文章" && (
          <CollectionArticle currentUser={currentUser} />
        )}
        {currentBoard === "優惠券" && (
          <CollectionCoupons currentUser={currentUser} />
        )}
        {currentBoard === "主廚卡片" && (
          <ChefIntro
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
        {currentBoard === "新增課程" && (
          <CourseInsert
            isReview={isReview}
            setIsReview={setIsReview}
            currentUser={currentUser}
            courseDetail={courseDetail}
            setCourseDetail={setCourseDetail}
            sliderImage={sliderImage}
            setSliderImage={setSliderImage}
            sixDishesImage={sixDishesImage}
            setSixDishesImage={setSixDishesImage}
            setCurrentBoard={setCurrentBoard}
          />
        )}

        {/* 課程新增頁內的即時預覽頁面 */}
        {isReview && (
          <CourseReview
            courseDetail={courseDetail}
            sliderImage={sliderImage}
            sixDishesImage={sixDishesImage}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
};

export default MemberCenter;
