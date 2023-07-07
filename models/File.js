const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});

//POST MIDDLEWARE
fileSchema.post("save", async function(doc) {
    try{
        console.log("doc: ",doc);
        //doc is basicaly entry which we created on db

        //transporter creater
        //TODO: Shift this configration under /config folder
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,

            }
        });

        //send mail
        console.log("doc.emil => ",doc.email);
        let info = await transporter.sendMail({
            from: `Coder`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2>Hello Jee</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>  `,
        })
        console.log("INFO: ",info);
    }
    catch(error){
        console.log("error");
    }
})


const File = mongoose.model("File", fileSchema);
module.exports = File;