const express = require("express");

const router = express.Router();
const upload = require("../config/multer.config");
const supabase = require("../config/supabase.config");
const fileModel = require("../model/files.model");

router.get("/home", (req, res) => {
  res.render("home");
});

router.post("/upload", upload.single("file"), async (req, res) => {
  res.send(req.file);
});

// file is the name of input in home ejs

// const { data, error } = await supabase.storage
//   .from("drive")
//   .upload("uploads/" + req.file.originalname, req.file.buffer, {
//     contentType: req.file.mimetype,
//   });

// console.log(data);

// if (error) {
//   return res.status(500).send(error.message);
// }
// const filePath = data.path;
// const originalName = req.file.originalname;

// const newFile = await fileModel.create({
//   path: filePath,
//   originName: originalName,
// });

// res.send({
//   message: "File uploaded successfully!",
// });

module.exports = router;
