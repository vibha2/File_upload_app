const express = require("express");
const router = express.Router();

// const {imageUpload, videoUpload, imageReducerUpload, localFilUpload} = require("../controllers/fileUpload");
const { localFileUpload } = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload", localFileUpload );

module.exports =  router;