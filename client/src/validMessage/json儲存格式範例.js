const getValidMessage = require("./validMessage");

let test1 = getValidMessage("registration");
let test2 = getValidMessage("registration", "B0001");
// console.log("(種類查詢)test1: ", test1);
// console.log("(直接拿到訊息)test2: ", test2);

// 課程詳細資訊 JSON 格式範例
// const coures_info_json = {
//   slider_image: ["img_name", "img_name", "img_name"],
//   course_name: "課程名稱",
//   company_name: "餐廳名稱",
//   company_address: "餐廳地址", // 供google地圖搜尋
//   timeOfCourse: "平日上午10:30 ~ 下午04:00",
//   course_ig: "https://www.instagram.com/",
//   course_fb: "https://www.facebook.com/",
//   title1_1: "標題1-1號",
//   title1_2: "標題1-2號",
//   content1: "介紹內容一",
//   title2: "標題3號(六道菜部分)",
//   six_dishes: [
//     // 課程六道菜的圖+文
//     {
//       image_name: "image_name",
//       image_title: "菜色標題",
//       image_content: "菜色介紹",
//     },
//     {
//       image_name: "image_name",
//       image_title: "菜色標題",
//       image_content: "菜色介紹",
//     },
//   ],
//   content2: "費用包含內容＋注意事項",
// };

// 主廚詳細資訊 JSON 格式範例
const chef_intro = {
  chef_word: "主廚的名言",
  chef_intro1: "主廚簡單自介",
  chef_title: "餐廳名稱 + 主廚的全職位全名",
  chef_experience: "超過20年經驗\n創立四間餐飲品牌\n旗下品牌榮獲米其林二星",
};

// order_detail student_id欄位格式範例
const student_id = ["stident_id1", "stident_id2", "stident_id3"];

// 新版Course格式
const newCourseJSON = {
  slider_images: ["img_name", "img_name", "img_name"], // 圖片名稱; 原本會是一個file檔案的格式，送到後端後再改名且存進檔案夾，DB中這欄只會存檔名
  time_of_course: "", // 平日上午10:30 ~ 下午04:00
  course_ig: "https://www.instagram.com/",
  course_fb: "https://www.facebook.com/",
  title1_1: "", // 標題1-1號
  title1_2: "", // 標題1-2號
  content1: "", // 介紹內容1
  title2: "", // 標題2號(六道菜部分)
  six_dishes: [
    // 課程六道菜的圖+文
    {
      dishes_image: "img_name", // 圖片名稱; 原本會是一個file檔案的格式，送到後端後再改名且存進檔案夾，DB中這欄只會存檔名
      dishes_title: "", // 菜色標題
      dishes_content: "", // 菜色介紹
    },
    {
      dishes_image: "img_name", // 圖片名稱
      dishes_title: "", // 菜色標題
      dishes_content: "", // 菜色介紹
    },
    {
      dishes_image: "img_name", // 圖片名稱
      dishes_title: "", // 菜色標題
      dishes_content: "", // 菜色介紹
    },
    {
      dishes_image: "img_name", // 圖片名稱
      dishes_title: "", // 菜色標題
      dishes_content: "", // 菜色介紹
    },
    {
      dishes_image: "img_name", // 圖片名稱
      dishes_title: "", // 菜色標題
      dishes_content: "", // 菜色介紹
    },
    {
      dishes_image: "img_name", // 圖片名稱
      dishes_title: "", // 菜色標題
      dishes_content: "", // 菜色介紹
    },
  ],
  content2: "", // 費用包含內容
  content3: "", // 注意事項說明

  // 下方是table內的獨立欄位，不是存在json內
  course_name: "", // 課程名稱
  course_price: 0,
  course_hour: 0,
  course_level: "1", // 1, 2, 3 (高階 中階 初階)
  member_limit: 0,
  company_name: "", // 餐廳名稱
  company_address: "", // 餐廳地址, 供google地圖搜尋

  // 下方為需要join的資料
  category_id: "1", // 1 ~ 6 代表category table的id
  member_id: "0001",

  // 各個梯次實際上是存在 batch table 內 這裡是要將資料送進去時的樣子
  course_batch: ["batch_id"], // 原本會存著各個梯次日期，到後端後再跑回圈將各個梯次 insert into 梯次的 table 內; ["2021-11-23", "2021-11-24", "2021-11-25"]
};
