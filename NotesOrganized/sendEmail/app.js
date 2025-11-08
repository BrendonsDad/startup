const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 5000;


function sendEmail() {
    
    return new Promise((resolve, reject) => {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'freindziewebsite@gmail.com',
                pass: 'odot sxoj rkbs bdqj'
            }
        });

        const mail_option = {
        from:'freindziewebsite@gmail.com',
        to:'orraubury@gmail.com',
        subject:'Testing Email Sender',
        text:'This is a test email sent from the Node.js application.'
    }
        transporter.sendMail(mail_option, function(error, info){
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info.response);
            }           
        });
    })

    
}


app.get('/', (req, res) => {
    sendEmail()
    .then(response => res.send(response.message))
    .catch(error => res.status(500).send(error.message()));
});


app.listen(port, () => {
  console.log(`Email sending service is running on http://localhost:${port}`);
});