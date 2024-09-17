require("dotenv").config();
const nodemailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_ADDRESS_FROM } = process.env;

const sendEmail = async (to, name, code) => {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // true for 465, false for other ports
    logger: false,
    debug: true,
    secureConnection: true,
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
    subject: "COP 29 DELEGATE STATUS",
    html: `
    <div style="background-color: #f6f6f6; margin: 0; padding: 0">
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
        <h3>COP 29 Delegate</h3>
      </div>
      <div style="padding: 50px; display: grid">
        <h3 style="color: #003300">Hello ${name},</h3>
        <p style="color: #336633; font-size: 15px; margin-bottom: 20px">
          We are pleased to inform you that your application has been
          successfully processed and approved. Please find your unique QR code
          as an attachment, which you are required to keep securely. This QR code will be
          essential for marking your attendance at COP 29.
        </p>

        <p style="color: #336633; font-size: 15px; margin-bottom: 20px">
          Thank you for your participation, and we look forward to welcoming
          you to the event.
        </p>

        <p style="color: #336633; font-size: 15px">
          Warm regards,,<br />
          COP29 Nigeria
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
        <p style="color: whitesmoke; font-size: 11px; margin: 15px 0">
          Nigeria COP29 Theme: Actualizing Financial Commitments for Climate
          Action.
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
            href="https://nigccdelegation.natccc.gov.ng/"
            style="color: whitesmoke; text-decoration: none"
            >Visit Website</a
          >
        </p>
        <p style="color: whitesmoke; font-size: 11px">
          © 2024 COP29 NIGERIA PORTAL
        </p>
      </div>
    </div>
  </div>
    `,
    attachments: [
      {
        filename: `${name}-code.png`,
        path: code, // The QR code URL that was generated
        cid: "qrCodeImage", // A unique identifier for embedding inline images if needed
      },
    ],
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = sendEmail;
