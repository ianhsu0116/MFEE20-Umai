const GoogleTokenStrategy = require("passport-google-token").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const connection = require("../utils/database");
const momnet = require("moment");

module.exports = (passport) => {
  // passport serialize
  passport.serializeUser(function (user, done) {
    console.log("Serializing User");
    done(null, user.member.id);
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
                birthday: findMember[0].birthday,
                telephone: findMember[0].telephone,
                avatar_image: findMember[0].avatar_image,
                credit_card_number: findMember[0].credit_card_number,
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

          // 製作一個要回覆給前端的 member date
          let returnMember = {
            id: result.insertId,
            email: email,
            googleId: id,
            facebookId: null,
            first_name: given_name,
            last_name: family_name,
            birthday: null,
            telephone: null,
            avatar_image: null,
            credit_card_number: null,
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
                birthday: findMember[0].birthday,
                telephone: findMember[0].telephone,
                avatar_image: findMember[0].avatar_image,
                credit_card_number: findMember[0].credit_card_number,
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

          // 製作一個要回覆給前端的 member date
          let returnMember = {
            id: result.insertId,
            email: email,
            googleId: null,
            facebookId: id,
            first_name: givenName,
            last_name: familyName,
            birthday: null,
            telephone: null,
            avatar_image: null,
            credit_card_number: null,
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

const e = {
  cookie: { originalMaxAge: null, expires: null, httpOnly: true, path: "/" },
  passport: {
    user: {
      success: true,
      member: {
        id: 37,
        email: "ianhsu0116@gmail.com",
        googleId: "103273704943821784507",
        facebookId: null,
        first_name: "Ian",
        last_name: "Hsu",
        birthday: null,
        telephone: null,
        avatar_image: null,
        credit_card_number: null,
        chef_introduction: null,
        member_category: 1,
      },
    },
  },
  member: {
    success: true,
    member: {
      id: 37,
      email: "ianhsu0116@gmail.com",
      googleId: "103273704943821784507",
      facebookId: null,
      first_name: "Ian",
      last_name: "Hsu",
      birthday: null,
      telephone: null,
      avatar_image: null,
      credit_card_number: null,
      chef_introduction: null,
      member_category: 1,
    },
  },
  __lastAccess: 1636969637113,
};
