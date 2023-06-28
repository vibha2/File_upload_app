const File = require("../models/File");

//localFileUpload -> handler function

exports.localFileUpload = async (req, res) => {
    try{
        //fetch file, jo bhi send ki hogi
        const file = req.files.file;
        console.log("File Aagyi hai=> ",file);

        // here path = server path
        // We mention Date.now() here because it gives every time a diff number,
        // So, we'll get different path everytime
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.'[1])}`;
        console.log("PATH => ",path);
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local File Uploaded Successfully",
        });

    }
    catch(error){

    }
}