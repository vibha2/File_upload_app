const express = require("express");
const router = express.Router();

// const {imageUpload, videoUpload, imageReducerUpload, localFilUpload} = require("../controllers/fileUpload");
const { localFileUpload, imageUpload, videoUpload } = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload", localFileUpload );
router.post("/imageUpload", imageUpload );
router.post("/videoUpload", videoUpload );

module.exports =  router;