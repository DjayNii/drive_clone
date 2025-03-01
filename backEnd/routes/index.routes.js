const express = require("express");

const router = express.Router();
const upload = require("../config/multer.config");
const supabase = require("../config/supabase.config");
const fileModel = require("../model/files.model");
const userModel = require("../model/user.model");

const AuthMiddleWare = require("../middleware/auth");

router.get("/home", AuthMiddleWare, async (req, res) => {
  const userFile = await fileModel.find({
    user: req.user.userID,
  });
  const userDets = await userModel.findById(req.user.userID);

  // res.render("home", {
  //   files: userFile,
  // });
  res.json({
    files: userFile,
    dets: userDets,
  });
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
    const userID = req.user.userID;
    const filePathSupabase = `aakpak/${req.file.originalname}`;

    const { data, error } = await supabase.storage
      .from("thrive")
      .upload(filePathSupabase, req.file.buffer, {
        contentType: req.file.mimetype,
      }); // this extracts the data from supabase

    if (error) {
      return res.status(500).send(error.message);
    }

    const filePath = data.path; // extracting file path from that data
    const originalName = req.file.originalname; // extracting orginal name from that data
    const fileType = req.file.mimetype; // extracting file type from that data

    const newFile = await fileModel.create({
      path: filePath,
      originName: originalName,
      user: req.user.userID,
      fileType: fileType,
    });

    console.log("Generated Signed URL:");
    const { data: signedData, error: signedError } = await supabase.storage
      .from("thrive")
      .createSignedUrl(filePath, 60);

    if (signedError) {
      console.error("Signed URL Error:", signedError.message);
      return res.status(500).send(signedError.message);
    }

    res.json({
      file: newFile,
      signedUrl: signedData.signedUrl,
    });
  }
);

router.get("/download/:path", AuthMiddleWare, async (req, res) => {
  const path = req.params.path;
  const download_path = `uploads/${path}`;

  const file = await fileModel.findOne({
    user: req.user.userID,
    path: download_path,
  });

  if (!file) {
    return res.status(401).json({
      message: "file not found",
    });
  }

  const { data, error } = await supabase.storage
    .from("thrive")
    .createSignedUrl(download_path, 60, { download: file.name });

  if (error) {
    console.error("Supabase Signed URL Error:", error.message);
    return res.status(500).send(error.message);
  }

  const signedUrl = data.signedUrl;
  return res.json({ sign: signedUrl });
});

module.exports = router;
