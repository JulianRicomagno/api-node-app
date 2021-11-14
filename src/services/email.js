const nodemailer = require('nodemailer');
const userEmail = process.env.EMAIL_USER;
const passEmail = process.env.EMAIL_PASS;

const send = async (to, name, passwd) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: userEmail,
            pass: passEmail
        }
    });

    const response = transporter.sendMail({
        from: "TURISMO POSADAS <municipioposadasturismo@gmail.com>",
        to,
        subject: "[Aplicacion Posadas] Nueva password",
        html: `
              <h1>¡Hola ${name}!</h1>
              <p>A continuación te damos tu nueva password, recorda que podes cambiarla cuando desees desde el menu "Mi cuenta" </p>
              <br/>
              <p>Su nueva password es: <strong>${passwd}</strong </p>
              <br/>
              <br/>
              <p>Saludos cordiales,</p>
              <p>TURISMO POSADAS - Municipalidad de Posadas.</p>
              <img src="cid:logo" width="180" height="80"/>
              <br/>
              <br/>`,
        attachments: [{
            file: "logomuni.png",
            path: "https://posadas.gov.ar/cultura/wp-content/uploads/2016/08/logomuni.png",
            cid:  "logo"      
        }]
    })
    return response;
}

module.exports = {
  send,
};