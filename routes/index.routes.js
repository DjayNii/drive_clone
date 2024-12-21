const express = require("express");

const router = express.Router();
const upload = require("../config/multer.config");
const supabase = require("../config/supabase.config");
const fileModel = require("../model/files.model");

const AuthMiddleWare = require("../middleware/auth");

router.get("/home", AuthMiddleWare, (req, res) => {
  res.render("home");
}); // by using the middleware this page only renders if we logged in

router.post(
  "/upload",
  AuthMiddleWare,
  upload.single("file"),
  async (req, res) => {
    // file is the name of input in home ejs

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { data, error } = await supabase.storage
      .from("drive")
      .upload("uploads/" + req.file.originalname, req.file.buffer, {
        contentType: req.file.mimetype,
      }); // this extracts the data from supabase

    if (error) {
      return res.status(500).send(error.message);
    }

    const filePath = data.path; // extracting file path from that data
    const originalName = req.file.originalname; // extracting orginal name from that data

    const newFile = await fileModel.create({
      path: filePath,
      originName: originalName,
      user: req.user.userID,
    });

    res.json(newFile);
  }
);

module.exports = router;
