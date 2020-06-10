var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "public/uploads/" });

//var validate = require("../validate/user.validate");
var controller = require("../controller/user.controller");

//get user

router.get("/", controller.index);

router.get("/:id/delete", controller.deleteUser);

router.get("/:id/editUser", controller.editUser);

//post user
router.post("/create",upload.single('avatar'),
            controller.postCreateUser); 

router.post("/:id/editUser", upload.single("avatar"), controller.postEditUser);

 module.exports = router;
