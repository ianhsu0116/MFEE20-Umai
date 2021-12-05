const GoogleTokenStrategy = require("passport-google-token").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const connection = require("../utils/database");
const momnet = require("moment");

module.exports = (passport) => {
  // passport serialize
  passport.serializeUser(function (user, done) {
    console.log("Serializing User");

    // 判斷這是有沒有收到member資料
    if (user.member) {
      done(null, user.member.id);
    } else {
      done(null, user);
    }
  });
  // passport deserialize
  passport.deserializeUser(async function (id, done) {
    console.log("Deserializing User");
    let user = await connection.queryAsync(
      "SELECT * FROM member WHERE id = ?",
      id
    );
    done(null, user);
  });

  // Google token登入
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      async function (accessToken, refreshToken, profile, done) {
        //console.log(profile._json);
        let { id, email, given_name, family_name } = profile._json;

        try {
          // 確認是已經否註冊
          let findMember = await connection.queryAsync(
            "SELECT * FROM member WHERE email = ? AND valid = ?",
            [email, 1]
          );

          // 已註冊過，判斷是否為該google帳號所註冊
          if (findMember.length !== 0) {
            // 確認是否此email的googleId == 當前登入的googleId
            if (findMember[0].googleId === id) {
              // 製作一個要回覆給前端的 member date
              let returnMember = {
                id: findMember[0].id,
                email: findMember[0].email,
                googleId: findMember[0].googleId,
                facebookId: findMember[0].facebookId,
                first_name: findMember[0].first_name,
                last_name: findMember[0].last_name,
                nick_name: findMember[0].nick_name,
                birthday: findMember[0].birthday,
                telephone: findMember[0].telephone,
                avatar: findMember[0].avatar,
                credit_card_number: findMember[0].credit_card_number,
                credit_card_name: findMember[0].credit_card_name,
                chef_introduction: findMember[0].chef_introduction,
                member_category: findMember[0].member_category,
              };

              return done(null, {
                success: true,
                member: returnMember,
              });
            }

            // 有此email 但 googleId !== 此次登入的googleId
            // 代表此email已經被本地或是其他第三方註冊過了
            else {
              return done(null, {
                success: false,
                member: null,
              });
            }
          }

          // 紀錄當前時間
          let now = momnet().format("YYYY-MM-DDTHH:mm:ss");

          // 新會員，就幫他註冊
          let result = await connection.queryAsync(
            "INSERT INTO member (email, googleId, first_name, last_name, created_time) VALUES (?)",
            [[email, id, given_name, family_name, now]]
          );

          // 取出新的id
          let { insertId } = result;
          // 優惠券期限
          let nowPlus30 = new Date(Date.now() + 2592000000);
          // 送新用戶一張優惠券
          let couponsResult = await connection.queryAsync(
            "INSERT INTO member_coupons (member_id, coupons_id, expire_date, status, valid) VALUES (?)",
            [[insertId, 5, nowPlus30, 1, 1]]
          );

          // 製作一個要回覆給前端的 member date
          let returnMember = {
            id: result.insertId,
            email: email,
            googleId: id,
            facebookId: null,
            first_name: given_name,
            last_name: family_name,
            nick_name: null,
            birthday: null,
            telephone: null,
            avatar: null,
            credit_card_number: null,
            credit_card_name: null,
            chef_introduction: null,
            member_category: 1,
          };

          done(null, {
            success: true,
            member: returnMember,
          });
        } catch (error) {
          done(null, {
            success: false,
            message: error,
          });
        }
      }
    )
  );

  // facebook token登入
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        fbGraphVersion: "v3.0",
      },
      async function (accessToken, refreshToken, profile, done) {
        //console.log(profile);
        let { id } = profile;
        let email = profile.emails[0].value;
        let { givenName, familyName } = profile.name;

        try {
          // 確認是已經否註冊
          let findMember = await connection.queryAsync(
            "SELECT * FROM member WHERE email = ? AND valid = ?",
            [email, 1]
          );

          // 已註冊過，回傳使用者資料
          if (findMember.length !== 0) {
            // 確認是否此email的facebookId == 當前登入的 facebookId
            if (findMember[0].facebookId === id) {
              // 製作一個要回覆給前端的 member date
              let returnMember = {
                id: findMember[0].id,
                email: findMember[0].email,
                googleId: findMember[0].googleId,
                facebookId: findMember[0].facebookId,
                first_name: findMember[0].first_name,
                last_name: findMember[0].last_name,
                nick_name: findMember[0].nick_name,
                birthday: findMember[0].birthday,
                telephone: findMember[0].telephone,
                avatar: findMember[0].avatar,
                credit_card_number: findMember[0].credit_card_number,
                credit_card_name: findMember[0].credit_card_name,
                chef_introduction: findMember[0].chef_introduction,
                member_category: findMember[0].member_category,
              };

              return done(null, {
                success: true,
                member: returnMember,
              });
            }

            // 有此email 但 facebookId !== 此次登入的 facebookId
            // 代表此email已經被本地或是其他第三方註冊過了
            else {
              return done(null, {
                success: false,
                member: null,
              });
            }
          }

          // 紀錄當前時間
          let now = momnet().format("YYYY-MM-DDTHH:mm:ss");

          // 新會員，就幫他註冊
          let result = await connection.queryAsync(
            "INSERT INTO member (email, facebookId, first_name, last_name, created_time) VALUES (?)",
            [[email, id, givenName, familyName, now]]
          );

          // 取出新的id
          let { insertId } = result;
          // 優惠券期限
          let nowPlus30 = new Date(Date.now() + 2592000000);
          // 送新用戶一張優惠券
          let couponsResult = await connection.queryAsync(
            "INSERT INTO member_coupons (member_id, coupons_id, expire_date, status, valid) VALUES (?)",
            [[insertId, 5, nowPlus30, 1, 1]]
          );

          // 製作一個要回覆給前端的 member date
          let returnMember = {
            id: result.insertId,
            email: email,
            googleId: null,
            facebookId: id,
            first_name: givenName,
            last_name: familyName,
            nick_name: null,
            birthday: null,
            telephone: null,
            avatar: null,
            credit_card_number: null,
            credit_card_name: null,
            chef_introduction: null,
            member_category: 1,
          };

          done(null, {
            success: true,
            member: returnMember,
          });
        } catch (error) {
          done(null, {
            success: false,
            message: error,
          });
        }
      }
    )
  );
};
