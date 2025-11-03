const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
        const {email,username,password} = req.body;
        const newUser = new User({
            email:email,
            username:username,
        });
        const registerdUser = await User.register(newUser,password);
        
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("sucess","Registration successful!")
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{

    req.flash("sucess","welcome back to wanderlust");
    res.redirect(res.locals.redirectUrl || '/listings');

};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("sucess","you're loged out!");
        res.redirect("/listings"); 
    })
};