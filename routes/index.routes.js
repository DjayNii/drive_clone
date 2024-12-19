const express = require("express");

const router = express.Router();
const upload = require("../config/multer.config");
const supabase = require("../config/supabase.config");
const fileModel = require("../model/files.model");

const AuthMiddleWare = require("../middleware/auth");

router.get("/home", AuthMiddleWare, (req, res) => {
  res.render("home");
}); // by using the middleware this page only renders if we logged in

router.post("/upload", upload.single("file"), async (req, res) => {
  // file is the name of input in home ejs
  console.log(req.file);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const { data, error } = await supabase.storage
    .from("drive")
    .upload("uploads/" + req.file.originalname, req.file.buffer, {
      contentType: req.file.mimetype,
    });

  console.log(data);

  if (error) {
    return res.status(500).send(error.message);
  }
  const filePath = data.path;
  const originalName = req.file.originalname;

  const newFile = await fileModel.create({
    path: filePath,
    originName: originalName,
  });

  res.send({
    message: "File uploaded successfully!",
  });
});

module.exports = router;
