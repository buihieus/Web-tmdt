const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", controller.editPatch);

router.get("/permissions", controller.permissions);

router.patch("/permissions", controller.permissionsPatch);

// router.post("/delete/:id", controller.delete); // Xóa quyền

router.post("/delete-permanent/:id", controller.deletePermanent); // Xóa vĩnh viễn quyền




module.exports = router;