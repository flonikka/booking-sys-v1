import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan"; //? nodemon message
import flash from "connect-flash";
import session from "express-session";
import dotenv from "dotenv"; //? load dotenv -> import before PORT
dotenv.config();
console.log(process.env.PORT);
console.log(process.env.mongoURI);
import bodyParser from "body-parser"; //? get API - user input variable (e.g numeric)
import mongoose from "mongoose"; //? node driver
import methodOverride from "method-override"; //? creat, delete variable
const app = express();
const PORT = process.env.PORT || 3100; //? change from dotenv setting

//? promise
mongoose
  .connect(process.env.mongoURI) //? database location e.g. I.P address mongodb://localhost:27017/note-dev
  .then(() => console.log("Mongodb connected.."))
  .catch((err) => console.log(err));

import ideasRoute from "./routes/ideasRoute.js";
import usersRoute from "./routes/usersRoute.js";
import bookingsRoute from "./routes/bookingsRoute.js";
import contactsRoute from "./routes/contactsRoute.js";
import adminRoute from "./routes/adminRoute.js";

import passport from "passport";
import passportConfig from "./config/passportConfig.js";
import ensureAuthenticated from "./helpers/auth.js";
passportConfig(passport); //? import verify if user login

//! setup handlebars template engine middleware - (API)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(morgan("tiny"));
app.use(express.static("views/public"));
app.use(bodyParser.urlencoded({ extended: false })); //? debug message
app.use(bodyParser.json()); //? decide conversion format
app.use(methodOverride("_method")); //? run delete function
//! session & flash use after bodyParser
app.use(
  session({
    //? create sid.signature :{__}
    secret: "anything", //? hash func. (e.g. generate random id by func.)
    resave: true,
    saveUninitialized: true, //? auth user's tokens
    cookie: { maxAge: 1500 * 10000 }, //? set time duration e.g auto-logout 150 * 1000
    //genid: function ()
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//?set @ main.handlebars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg"); //? locals.__ is a global variable
  res.locals.error_msg = req.flash("error_msg");
  res.locals.fail_passport = req.flash("fail_passport"); //? pass passportConfig err message
  res.locals.user = req.user || null;
  //? Add *** NEW
  if (req.user) {
    // console.log("req.user.admin => ",req.user.admin);
    if (req.user.admin == true) {
      res.locals.admin = true;
    } else {
      res.locals.admin = false;
    }
    console.log("user ==> ", res.locals.user);
  }
  //console.log("=== login user ===", res.locals.user);
  next(); //? initialize flash()
});

//! handlebars middleware template engine - (API)
//? middleware (run as single thread) -> top-to-bottom as priority
app.get("/", (req, res) => {
  console.log(req.session.cookie.maxAge / 1000); //?
  //console.log(req.seesion.genid());
  res.render("index", { title: "Welcome !" });
});
app.get("/course", (req, res) => {
  res.render("Course");
});
app.get("/demo", (req, res) => {
  res.render("Demo");
});
app.get("/contact", (req, res) => {
  res.render("Contact");
});
//todo = Joe : select calendar days => searchart => booking
app.get("/calendar", (req, res) => {
  res.render("calendar"); //calendar sandbox /changed by francis
});
app.get("/seatchart", (req, res) => {
  res.render("Seatchart"); //seating plan sandbox
});
//! testing
app.get("/front", (req, res) => {
  res.render("front"); //front-end sandbox
});
//! middleware
app.use("/ideas", ensureAuthenticated, ideasRoute);
app.use("/users", usersRoute);
app.use("/bookings", ensureAuthenticated, bookingsRoute);
app.use("/contacts", contactsRoute);
app.use("/admin", adminRoute);

app.use(function (req, res, next) {
  console.log("Time", Date.now());
  next();
});

app.get("*", (req, res) => {
  res.status(404); //? can be add message ".send("")"
  //res.status(404).send("WTF");
  res.render("404");
}); //404

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
