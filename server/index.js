require('dotenv').config();
 const express =require('express');
 const session=require('express-session');
 const passport=require('passport');
 const Auth0Strategy=require('passport-auth0');
 const massive=require('massive');

 const{
     SERVER_PORT,
     SESSION_SECRET,
     DOMAIN,
     CLIENT_ID,
     CLIENT_SECRET,
     CALLBACK_URL,
     CONNECTION_STRING
 }=process.env;

 const app=express();

 app.use(express.static(__dirname + './../build'))

 massive(CONNECTION_STRING).then(db=>{
    //  app.set is a way of storing some information where you can add it by saying to set info on key: val pair essentially
     app.set('db', db);
 })

 app.use(session({
     secret: SESSION_SECRET,
     resave: false,
     saveUninitialized: true
 }))

 app.use(passport.initialize());
//  then, store info for the login user in session memory(aka session store)
// this is accessed with req.session(represents whichever person's session we are interacting with at that time)
 app.use(passport.session());

 passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
    // when the user authenticates, this is what we want to get back
 }, (accessToken, refreshToken, extraParams, profile, done)=>{
    //  this is where auth0 sends back info from google or whatever
    // instead of the done method, we will query our database and see if there is a user with the id
    const db=app.get('db')
    // this asks passport to retrieve the value tied to db, which is set above
    let{id, displayName, picture}=profile;
    // the id used here is the auth_id from the database
    db.find_user([id]).then(user=>{
        // we are getting info back from our sql table, whic is usally an object, but nested in an array
        if(user[0]){
            done(null, user[0].id)
        }else{
            db.create_user([displayName, picture, id]).then((createdUser)=>{
                done(null, createdUser[0].id)
            })
        }
    })
 }));
//  after you set the above step up, create auth0 app and add infor to .env

passport.serializeUser((primaryKeyId, done)=>{
    done(null, primaryKeyId);
       //  the above profile object is added to the session store
})

passport.deserializeUser((primaryKeyId, done)=>{
    // goes into session store, grabs any value tied to the session(ie profile) and injects info into the callback
    // whatever we pass out of deserializeUser gets added to req.user
    // deserializeUser runs as middleware
    app.get("db").find_session_user([primaryKeyId]).then(user=>{
        done(null, user[0])
        // this returns all the info for the user, which is put on req.user
    })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    // redirect the user to the front end back where they started the login
    successRedirect: 'http://localhost:3005/#/private'
    // use the hash symbol above because we are using HashRouter
}))

app.get('/auth/user', (req, res)=>{
    if(req.user){
        res.status(200).send(req.user);
    }else{
        res.status(401).send('Unauthorized user');
    }
})

app.get('/auth/logout', (req, res)=>{
    req.logOut();
    // this is a built in method in passport that kills the session and resets the user property, which is somethign that req.session.destroy() does not do
    res.redirect('http://localhost:3005');
})


 app.listen(SERVER_PORT, ()=>{
    console.log(`Listening on port:`, SERVER_PORT)
 });
