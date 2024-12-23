const express = require("express");
const router = express.Router();

const createValidate = require("../../validates/account.validate");

const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/account.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  createValidate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.upload,
  createValidate.createPost,
  controller.editPatch
);
module.exports = router;
