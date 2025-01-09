const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' }); // Cấu hình lưu tệp
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

// Route mới cho tải lên tệp CSV
router.post(
  "/upload-csv",
  upload.single("csvFile"), // Sử dụng multer để xử lý tệp CSV
  (req, res, next) => {
    // Kiểm tra xem tệp có được tải lên hay không
    if (!req.file) {
      req.flash("error", "Không có tệp nào được tải lên!");
      return res.redirect("back");
    }
  
    // Kiểm tra định dạng tệp
    const fileExtension = req.file.originalname.split('.').pop();
    if (fileExtension !== 'csv') {
      req.flash("error", "Vui lòng tải lên tệp CSV hợp lệ!");
      return res.redirect("back");
    }
    
    next();
  },
  controller.uploadCSV // Thêm controller xử lý tệp CSV
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