// 各位需要的話可以直接修改或是新增錯誤碼，要按照以下的命名歸則
// 改別人的錯誤碼前，需要先詢問負責那個部分的同學

class validMessage {
  // A => 登入相關錯誤碼
  static login = {
    A0001: "使用者帳號或密碼錯誤！",
    A0002: "使用者帳號未曾註冊！",
    A0003: "請先登入！",
    A0004: "帳號需為有效之Email帳號！",
    A0005: "密碼必須為八位數(英文 + 數字)！",
  };

  // B => 註冊相關錯誤碼
  static registration = {
    B0001: "帳號需為有效之Email帳號！",
    B0002: "使用者帳號已註冊！",
    B0003: "密碼必須為八位數(英文 + 數字)！",
    B0004: "密碼與確認密碼不符！",
  };

  // C => 討論區相關錯誤碼
  static forum = {
    C0001: "文章標題不可空白！",
    C0002: "文章內容不可空白！",
    C0003: "看板未選擇！",
    C0004: "留言內容不可空白！",
    C0005: "上傳圖片須小於4MB！",
    C0006: "此看板內沒有任何文章！",
    C0007: "請先登入才能收藏！",
    C0008: "請先登入才能按讚！",
  };

  // D => 購物車頁面相關錯誤碼
  static cart = {
    D0001: "請先登入再加入購物車！",
  };

  // E => 課程報名相關錯誤碼
  static course = {
    E0001: "報名人數未選擇！",
    E0002: "報名梯次未選擇！",
    E0003: "報名者姓名未正確輸入！",
    E0004: "報名者Email未正確輸入！",
    E0005: "報名者電話未正確輸入！",
    E0006: "報名須知尚未打勾！",
    E0007: "課程已額滿！",
  };

  // F => 付款相關錯誤碼
  static payment = {
    F0001: "信用卡卡號格式錯誤！",
    F0002: "信用卡安全碼格式錯誤！",
    F0003: "信用卡到期日格式錯誤！",
  };
}

// 拿到錯誤碼 / 查詢錯誤碼的function
function getValidMessage(category, validCode) {
  // 如果兩者都有輸入，直接給正確的錯誤訊息
  if ((category, validCode)) {
    return validMessage[category][validCode];
  }

  // 如果只有輸入錯誤類型，則return整包此類型的錯誤碼
  else if (category) {
    return validMessage[category];
  }
}

module.exports = getValidMessage;
