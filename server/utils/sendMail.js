require("dotenv").config();
const nodemailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_ADDRESS_FROM } = process.env;

const sendEmail = async (to, name, amount) => {
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
    subject: "COP 29 INVOICE",
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
        padding: 20px 0;
        background-color: #004d00;
        color: #ffffff;
      "
    >
      <h5>Invoice - Cop29 Nigeria</h5>
    </div>
    <div style="padding: 50px; display: grid;">
      <h3 style="color: #003300;">Hello ${name},</h3>
      <p
        style="
          color: #336633;
          font-size: 15px;
          margin-bottom: 20px;
        "
      >
        Your application has been processed, and you are required to pay the
        amount of <span style="font-weight: bold;">${amount}</span> to reserve
        your slot.
      </p>

      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;">
          <span style="font-weight: bold;">Please use the following information for payment:</span>
        </p>
        <p style="margin: 5px 0;">
          Account Name: <span style="font-weight: bold;">[Account Name]</span>
        </p>
        <p style="margin: 5px 0;">
          Account Number: <span style="font-weight: bold;">[Account Number]</span>
        </p>
        <p style="margin: 5px 0;">
          Bank Name: <span style="font-weight: bold;">[Bank Name]</span>
        </p>
      </div>

      <p
        style="
          color: #336633;
          font-size: 15px;
          margin-bottom: 20px;
        "
      >
        Make sure to upload the payment evidence to confirm your reservation.
      </p>

      <p style="color: #336633; font-size: 15px;">
        Thank you,<br />
        Finance Officer, Cop29 Nigeria
      </p>
    </div>
    <div
      style="
        text-align: center;
        padding: 20px 70px;
        background-color: #004d00;
        color: #ffffff;
        font-size: 14px;
      "
    >
      <p style="color: whitesmoke; font-size: 11px; margin: 15px 0;">
       Nigeris COP29 Theme: Actualizing financial commitments for Climate Action.
      </p>
      <p
        style="
          color: whitesmoke;
          font-size: 11px;
          display: flex;
          justify-content: flex-start;
          margin-top: 15px;
        "
      >
        <a
          href="https://cop29.vercel.app/"
          style="color: whitesmoke; text-decoration: none;"
          >Visit Website</a
        >
      </p>
      <p style="color: whitesmoke; font-size: 11px;">© 2024 COP29 NIGERIA PORTAL</p>
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

module.exports = sendEmail;
