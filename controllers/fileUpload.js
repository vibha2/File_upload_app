const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileUpload -> handler function

exports.localFileUpload = async (req, res) => {
    try{
        //fetch file, jo bhi send ki hogi
        const file = req.files.file;
        console.log("\nFile Aagyi hai-> ",file);

        // __dirname => current directory
        // here path = server path
        // We mention Date.now() here because it gives every time a diff number,
        // So, we'll get different path everytime
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.'[1])}`;
        console.log("\nPATH => ",path);
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local File Uploaded Successfully",
        });

    }
    catch(error){
        console.log("Not able to upload the file on server");
        console.log(err);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality)
{
    const options = { folder };
    //using this uploader method we can upload file to cloudinary
    console.log("\ntempFilePath: ", file.tempFilePath);
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
    
}

//ImageUpload Handler
exports.imageUpload = async (req, res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log("\nname: ",name);
        console.log("\ntags: ",tags);
        console.log("\nemail: ",email);

        //while testing in postman, use imageFile as file
        const file = req.files.imageFile;
        console.log("\nfile: ",file);

        //we've fetched all the data now, we're doing validations

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        //current file type
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("\nfileType: ", typeof(fileType));

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported then upload in cloudinary
        console.log("Uploading to cloudinary");
        const response = await  uploadFileToCloudinary(file, "myTest");
        

        console.log("response: ",response);
        //db me entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message: 'Image Successfully Uploaded',
        })


    }
    catch(error){
        console.log("error: ",error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });

    }
}

//video upload ka handler
exports.videoUpload = async (req, res) => {
    try
    {
        //data fetch
        const { name, tags, email} = req.body;
        console.log("\nname: ",name);
        console.log("\ntags: ",tags);
        console.log("\nemail: ",email);
        
        const file = req.files.videoFile;

        //validation
        const supportedTypes = ["mp4", "mov"];
        //current file type
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("\nfileType: ", typeof(fileType));

        // add a upper limit of 5 mb
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported then upload in cloudinary
        console.log("Uploading to cloudinary");
        const response = await  uploadFileToCloudinary(file, "myTest");
        console.log("response: ",response);

         //db me entry save krni hai
         const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            videoUrl: response.secure_url,
            message: 'Video Successfully Uploaded',
        })




    }
    catch(error)
    {
        console.log("error: ",error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });
    }
}

//TODO: Compress using height attribute

//ImageReduce upload ka handler
exports.imageReducerUpload = async (req, res) => {
    try
    {
        //data fetch
        const { name, tags, email} = req.body;
        console.log("\nname: ",name);
        console.log("\ntags: ",tags);
        console.log("\nemail: ",email);
        
        const file = req.files.imageFile;

       //validation
       const supportedTypes = ["jpg", "jpeg", "png"];
       //current file type
       const fileType = file.name.split('.')[1].toLowerCase();
       console.log("\nfileType: ", typeof(fileType));


        // add a upper limit of 5 mb
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported then upload in cloudinary
        console.log("Uploading to cloudinary");
        const response = await  uploadFileToCloudinary(file, "myTest", 30);
        console.log("response: ",response);

         //db me entry save krni hai
         const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message: 'Reduce Image Successfully Uploaded',
        })




    }
    catch(error)
    {
        console.log("error: ",error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });
    }
}

//Testing
//POST request
//http://localhost:4000/api/v1/upload/localFileUpload
//Body-formdata => key=> file (type=file), value => upload 1 file

//POST request
//http://localhost:4000/api/v1/upload/imageUpload
//Body-formdata key -> value
// name -> vibha
// tags -> material
// email -> vibha@gmail.com
// imageFile -> photo.jpg

//POST request
//http://localhost:4000/api/v1/upload/videoUpload
//Body-formdata key -> value
// same for video

// Read this: https://cloudinary.com/documentation/transformations_on_upload
// we hav attribute name quality
// https://cloudinary.com/documentation/image_optimization
//POST request
//http://localhost:4000/api/v1/upload/imageReducerUpload
//Body-formdata key -> value
// same for ImageReducer

