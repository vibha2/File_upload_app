const File = require("../models/File");

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

//Testing
//POST request
//http://localhost:4000/api/v1/upload/localFileUpload
//Body-formdata => key=> file (type=file), value => upload 1 file