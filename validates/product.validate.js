module.exports.createPost = async (req, res, next) => {
    if (!req.body.title) {
      req.flash("error", "Vui lòng nhập tiêu đề!");
      res.redirect("back");
      return;
    }
    if (req.body.title.length < 8) {
      req.flash("error", "Vui lòng nhập tiêu đề nhiều hơn 8 kí tự!");
      res.redirect("back");
      return;
    }
  
    next();
  };