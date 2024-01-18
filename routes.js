import express from  'express';

const router = express.Router()
import { Getusers, Addusers, Updateusers, Deleteusers, Logincokie, Register,Login,Logout, Adduserspostgres } from './utils.js';


router.route("/users").get(Getusers);
router.route("/add-users").post(Addusers);
router.route("/update-users").put(Updateusers);
router.route("/delete-users").delete(Deleteusers);
router.route("/login-cookie").post(Logincokie);
router.route("/api/login").post(Login);
router.route("/api/register").post(Register);
router.route("/api/logout").post(Logout);
router.route("/add-users-postgres").post(Adduserspostgres);


export default router;