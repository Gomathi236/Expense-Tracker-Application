import express from "express";
import loginController from "../controllers/loginController";
import signupController from "../controllers/signupController"
import homePageController from  "../controllers/homeController"
import auth from "../validation/authValidation"
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController"
import expenseController from "../controllers/expenseController";
import incomeController from "../controllers/incomeController";
import addsourseController from "../controllers/addsourseController";

let router = express.Router();

initPassportLocal();

let initWebRoutes = (app) =>{
    router.get("/",loginController.checkLoggedIn, homePageController.getHomePage);

    router.get("/login",loginController.checkLoggedOut, loginController.getLoginPage)
    router.post("/login",passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash:true
    }));
    router.get("/signup",signupController.getsignupPage);
    router.post("/signup",auth.validateSignup, signupController.createNewUser);
    router.get("/income",incomeController.getIncomePage)
    router.get("/expense",expenseController.getExpensePage)
    router.get("/addsource",addsourseController.getSourcePage)

    router.post("/logout",loginController.postLogOut);
   

     return app.use("/",router);
}


module.exports = initWebRoutes;