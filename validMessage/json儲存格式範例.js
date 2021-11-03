const getValidMessage = require("./validMessage");

let test1 = getValidMessage("registration");
let test2 = getValidMessage("registration", "B0001");
// console.log("(種類查詢)test1: ", test1);
// console.log("(直接拿到訊息)test2: ", test2);

// 課程詳細資訊 JSON 格式範例
const coures_info_json = {
  slider_image: ["img_name", "img_name", "img_name"],
  course_name: "課程名稱",
  company_name: "餐廳名稱",
  company_address: "餐廳地址", // 供google地圖搜尋
  timeOfCourse: "平日上午10:30 ~ 下午04:00",
  course_ig: "https://www.instagram.com/",
  course_fb: "https://www.facebook.com/",
  title1_1: "標題1-1號",
  title1_2: "標題1-2號",
  content1: "介紹內容一",
  title2_1: "標題2-1號(主廚標題)",
  title2_2: "標題2-2號(主廚標題)",
  title3: "標題3號(六道菜部分)",
  food_image: [
    // 課程六道菜的圖+文
    {
      image_name: "image_name",
      image_title: "菜色標題",
      image_content: "菜色介紹",
    },
    {
      image_name: "image_name",
      image_title: "菜色標題",
      image_content: "菜色介紹",
    },
  ],
  content2: "費用包含內容＋注意事項",
};

// 主廚詳細資訊 JSON 格式範例
const chef_intro = {
  chef_word: "主廚的名言",
  chef_intro1: "主廚簡單自介",
  chef_title: "餐廳名稱 + 主廚的全職位全名",
  chef_experience: "超過20年經驗\n創立四間餐飲品牌\n旗下品牌榮獲米其林二星",
};

// order_detail student_id欄位格式範例
const student_id = ["stident_id1", "stident_id2", "stident_id3"];
