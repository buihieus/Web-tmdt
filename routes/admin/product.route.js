const express = require("express");
const router = express.Router();
const multer = require("multer");
// const storage = require("../../helpers/storageMulter");
const upload = multer();
const createValidate = require("../../validates/product.validate");

const controller = require("../../controllers/admin/product.controller");
const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");


router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMultiStatus);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  createValidate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  createValidate.createPost,
  controller.editPatch
);

router.get("/details/:id", controller.details);
module.exports = router;
