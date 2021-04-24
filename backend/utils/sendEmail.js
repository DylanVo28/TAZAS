const { options } = require("../routes/user");
const nodemailer=require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
const sendEmail=async options=>{
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'kedinhvo2000@gmail.com',
          pass: 'Dinhvo280700'
        }
      }));
    const message={
        from:`kedinhvo2000@gmail.com`,
        to:options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(message)
}
module.exports=sendEmail