require("dotenv").config();
const nodemailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_ADDRESS_FROM } = process.env;

const sendVerifyEmail = async (to, url, txt, name) => {
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
    from: SENDER_EMAIL_ADDRESS_FROM,
    to: to,
    subject: "COP29 NIGERIA",
    text: "Activate Account",
    html: `
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
        padding: 20px 0;
        background-color: #004d00;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
      "
    >
      <h5 style="margin: 0">UNFCCC COP29 NIGERIA REGISTRATION</h5>
    </div>
    <div style="padding: 50px">
      <h3 style="color: #003300">Hello ${name},</h3>
      <p style="color: #336633; font-size: 15px">
        Thank you for signing up for Cop29 Nigeria!
      </p>
      <div style="padding: 20px;">
      <p>
        To complete your registration, please click the link below:
      </p>
      <p style="text-align: center; margin: 20px 0;">
        <a
          href="${url}"
          style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          "
        >
          <strong>${txt}</strong>
        </a>
      </p>
      <p>
        If the button doesn’t work, please copy and paste the following URL into your web browser:
        <a href="${url}">${url}</a>
      </p>
    </div>
    
      <p style="color: #336633; font-size: 15px">
        If you did not sign up for this account, please ignore this email.
      </p>
      <p style="color: #336633; font-size: 15px">
        Best regards,<br />
        COP29 Nigeria Team
      </p>
    </div>
    <div
      style="
        text-align: center;
        padding: 20px;
        background-color: #004d00;
        color: #ffffff;
        font-size: 14px;
        border-radius: 0 0 8px 8px;
      "
    >
      <p style="color: whitesmoke; font-size: 11px">
       Nigeris COP29 Theme: Actualizing financial commitments for Climate Action.
      </p>
      <p style="color: whitesmoke; font-size: 11px; margin-top: 15px">
        <a
          href="https://cop29.vercel.app/"
          style="color: whitesmoke; text-decoration: none"
          >Visit Website</a
        >
      </p>
      <p style="color: whitesmoke; font-size: 11px">© 2024 COP29 NIGERIA PORTAL</p>
    </div>
  </div>
    `,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = sendVerifyEmail;
