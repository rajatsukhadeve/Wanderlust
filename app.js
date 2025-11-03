if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
console.log(process.env.SECRET);

const express= require('express');
const app=express();
const port=8080;
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const flash  = require('connect-flash');
const passport = require('passport');
const LocalStatergy = require('passport-local');
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set ("view engine","ejs");
app.set ("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const dburl = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to DB");
})
.catch(err=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dburl);
}

const store = MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24*3600,
});
store.on("error",()=>{
    console.log("Error in mongo session store",err);
})

const sessionOptions ={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() +7 *24*60*60*1000, // in miliseconds
        maxAge:7 *24*60*60*1000
    }
};

app.get("/",(req,res)=>{
    res.redirect("/listings");
});



app.use(session(sessionOptions));
app.use(flash());
//ayth just after session

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStatergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.sucess=req.flash("sucess");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//routes

// app.get("/demouser",async(req,res)=>{
//     let fakeuser = new User({
//         email:"rajatSukhadeve@gamil.com",
//         username:"rajat12"
//     })
//     let reguser = await User.register(fakeuser,"pass@1234"); 
//     res.send(reguser);
// })


app.use("/listings",listingsRouter);

app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);







// app.get("/listing",async(req,res)=>{
//     let smapleListing = new Listing({
//         title: "My New Villa",
//         description: "by the beach",
//         price: 1200,
//         location: "Calungate,Goa",
//         country: "India"
//     });

//     await smapleListing.save();
//     res.send("sample was saved");
// });


// app.all("/.*/",(req,res,next)=>{
//     next(new ExpressError(404,"page not found!"));
// });

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    res.render("error.ejs",{message});
    // res.status(statusCode).send(message);
 })
app.listen(port,()=>{
    console.log("server is working");
});