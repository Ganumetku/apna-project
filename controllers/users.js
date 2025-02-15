const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.Signup = async(req,res) => {
    try { 
    let {username, email, password} = req.body;
    const newUser = new User( {email, username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to wanderlust");
        res.redirect("/listings");
    });
  
    } catch(e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderlogin = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req ,res) => {
    req.flash("success", "Welcome to wanderlust You are logged in !");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect( redirectUrl);
};

module.exports.logout = (req, res )=> {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged Out!");
        res.redirect("/listings");
    })
}; 