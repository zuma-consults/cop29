require("dotenv").config();
const nodemailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS } = process.env;

const sendMessageEmail = async (
  name,
  phone,
  reasonForMeeting,
  email,
  preferredDateTime
) => {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // true for 465, false for other ports
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
      user: SENDER_EMAIL_ADDRESS, // generated ethereal user
      pass: "wvrr djes apqp nzyz", // generated ethereal password
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: "fagbuji@gmail.com",
    subject: "International Organization Meeting Request",
    html: `
    <div style="background-color: #f6f6f6; margin: 0; padding: 0;">
  <div
    style="
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    "
  >
    <div
      style="
        text-align: center;
        padding: 10px 0;
        background-color: #004d00;
        color: #ffffff;
      "
    >
      <h3>Meeting Request</h3>
    </div>
    <div style="padding: 50px; display: grid;">
      <h3 style="color: #003300;">Name: ${name}</h3> 
      <br></br>
      <br></br>

      <h3 style="color: #003300;">Phone: ${phone}</h3> 
      <br></br>
      <br></br>

      <h3 style="color: #003300;">Reason: ${reasonForMeeting}</h3> 
      <br></br>
      <br></br>

      <h3 style="color: #003300;">Email: ${email}</h3> 
      <br></br>
      <br></br>

      <h3 style="color: #003300;">Preferred Date and Time: ${preferredDateTime}</h3> 
      <br></br>
      <br></br>
    </div>
  </div>
</div>

    `,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = sendMessageEmail;
