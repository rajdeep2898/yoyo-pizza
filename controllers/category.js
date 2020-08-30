const User = require("../models/user");
const Order = require("../models/order");
const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    // console.log("cate", cate);
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save category in DB",
      });
    }
    res.json({ category });
  });
};
exports.getCategory = (req, res) => {
  return res.json(req.category);
};
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO Category found",
      });
    }
    res.json(categories);
  });
};
// exports.updateProduct = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "problem with image",
//       });
//     }

//     let product = req.product;
//     product = _.extend(product, fields);

//     if (file.photo) {
//       if (file.photo.size > 3000000) {
//         return res.status(400).json({
//           error: "File size too big!",
//         });
//       }
//       product.photo.data = fs.readFileSync(file.photo.path);
//       product.photo.contentType = file.photo.type;
//     }
//     product.save((err, product) => {
//       if (err) {
//         res.status(400).json({
//           error: "Updation of product failed",
//         });
//       }
//       res.json(product);
//     });
//   });
// };
exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  const cname = category.name;
  console.log("new Category", req.body.name);
  console.log("Category object", category);
  console.log("Category object1", cname);

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to Update catagory",
      });
    }
    res.json(updatedCategory);
  });
};
exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to Delete this catagory",
      });
    }
    res.json({
      message: "Successfully Deleted",
    });
  });
};
