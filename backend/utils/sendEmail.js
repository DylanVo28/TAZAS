const { options } = require("../routes/user");
const nodemailer=require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
const sendEmail=async options=>{
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'dinhdeptrainhatvutruso7@gmail.com',
          pass: 'dinhdeptraiquata'
        }
      }));
    const message={
        from:`deskita@gmail.com`,
        to:options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(message)
}
module.exports=sendEmail