const Joi = require("joi");

// Register Validation  註冊相關格式
const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(50)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(8).max(12).required(),
  });

  return schema.validate(data); // 直接 return schema.validate(data)的結果
};

// Login Validation  登入相關格式
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(50)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(8).max(12).required(),
  });
  return schema.validate(data);
};

// UserInfo 格式
const userInfoValidation = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().min(1).max(15).required(),
    last_name: Joi.string().min(1).max(15).required(),
    telephone: Joi.string()
      .length(10)
      .pattern(new RegExp("^[0, 9]{2}[0-9]{8}$"))
      .required(),
    birthday: Joi.date().less("now").required(),
  });
  return schema.validate(data);
};

// nick_name 格式
const nickNameValidation = (data) => {
  const schema = Joi.object({
    nick_name: Joi.string().min(1).max(10).required(),
  });
  return schema.validate(data);
};

// password 格式
const passwordValidation = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(8).max(12).required(),
  });

  return schema.validate(data);
};

// creditCard 格式
const creditCardValidation = (data) => {
  const schema = Joi.object({
    number: Joi.string().length(16).required(),
    name: Joi.string().min(1).max(30).required(),
  });

  return schema.validate(data);
};

// student 格式
const studentValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    first_name: Joi.string().min(1).max(15).required(),
    last_name: Joi.string().min(1).max(15).required(),
    telephone: Joi.string()
      .length(10)
      .pattern(new RegExp("^[0, 9]{2}[0-9]{8}$"))
      .required(),
    birthday: Joi.date().less("now").required(),
    email: Joi.string()
      .min(6)
      .max(50)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  });

  return schema.validate(data);
};

// course 格式
const courseValidation = (data) => {
  const schema = Joi.object({
    category_id: Joi.number(),
    course_name: Joi.string().min(1).max(50).required(),
    course_price: Joi.number().min(1).max(9999).required(),
    course_hour: Joi.number().min(1).max(24).required(),
    course_level: Joi.number().min(1).max(6).required(),
    member_limit: Joi.number().min(1).max(99).required(),
    company_name: Joi.string().min(1).max(100).required(),
    company_address: Joi.string().min(1).max(100).required(),
    course_batch: Joi.string().required(),
    course_detail: Joi.string().required(),
  });

  return schema.validate(data);
};

// 修改基本資料(性別)
// const userEditValidation = (data) => {
//   const schema = Joi.object({
//     _id: Joi.string().required(),
//     gender: Joi.string().valid("male", "female").required(),
//   });
//   return schema.validate(data);
// };

// article insert Validation
// const articleValidation = (data) => {
//   const schema = Joi.object({
//     board: Joi.string()
//       .required()
//       .valid(
//         "NBA",
//         "健身",
//         "外送",
//         "居家",
//         "心情",
//         "感情",
//         "星座",
//         "時事",
//         "有趣",
//         "梗圖",
//         "烹飪",
//         "理財",
//         "穿搭",
//         "網購",
//         "西斯"
//       ),
//     title: Joi.string().min(6).max(50).required(),
//     content: Joi.string().min(10).max(1000).required(),
//     author: Joi.string().required(),
//     image: Joi.object(),
//   });
//   return schema.validate(data);
// };

// const commentValidation = (data) => {
//   const schema = Joi.object({
//     comment_id: Joi.string().required(),
//     user_id: Joi.string().required(),
//     text: Joi.string().min(1).max(200).required(),
//     image: Joi.string(),
//     date: Joi.string().required(),
//   });
//   return schema.validate(data);
// };

module.exports = {
  // memberCenter + 註冊相關
  registerValidation,
  loginValidation,
  userInfoValidation,
  passwordValidation,
  nickNameValidation,
  // 可能會共用的
  creditCardValidation,
  studentValidation,

  // 課程相關
  courseValidation,
};
