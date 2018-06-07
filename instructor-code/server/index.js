require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0"),
  massive = require("massive");

const {
  SERVER_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  CONNECTION_STRING
} = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid profile"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      const db = app.get("db");
      let { id, displayName, picture } = profile;
      db.find_user([id]).then(user => {
        if (user[0]) {
          done(null, user[0].id);
        } else {
            db.create_user([displayName, picture, id]).then( (createdUser) => {
                done(null, createdUser[0].id);
            })
        }
      });
    }
  )
);

passport.serializeUser((id, done) => {
  done(null, id);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000"
  })
);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: `, SERVER_PORT);
});
