require("dotenv").config();
const nodemailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS } = process.env;

const sendResetPassword = async (to, url, txt, name) => {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // true for 465, false for other ports
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
      user: SENDER_EMAIL_ADDRESS, // generated ethereal user
      pass: "dtic brkx vpht lgah", // generated ethereal password
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "COP29 NIGERIA",
    text: "Change Password",
    html: `
    <div style={{
      backgroundColor: '#f6f6f6',
      fontFamily: 'Arial, sans-serif',
      margin: '0',
      padding: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '650px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#2c5f2d',
          color: '#ffffff',
        }}>
          <h5>Nigeria @COP29</h5>
        </div>
        <div style={{
          padding: '50px',
          display: 'grid',
        }}>
          <h3 style="color: #003300;">Hello ${name},</h3>
          <p style={{ color: '#666666', fontSize: '15px' }}>
            We received a request to reset your password for your Cop29 Nigeria
            account. If you made this request, please click the link below to
            reset your password:
          </p>

          <a href=${url} 
            style="
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              background-color: #28a745;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
        "
          >
            <strong>${txt}</strong>
          </a>
          <p style={{ color: '#666666', fontSize: '15px' }}>
            If you did not request a password reset, please ignore this email.
          </p>

          <p style={{ color: '#666666', fontSize: '15px' }}>
            Best regards,<br />
            Cop29 Nigeria Team
          </p>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#2c5f2d',
          color: '#ffffff',
          fontSize: '14px',
        }}>
          <p style={{ color: 'whitesmoke', fontSize: '11px', margin: '0' }}>
            <a href="https://cop29.vercel.app/" style={{ color: 'whitesmoke', textDecoration: 'none' }}>Visit Website</a>
          </p>
          <p style={{ color: 'whitesmoke', fontSize: '11px', margin: '15px 0 0 0' }}>© 2024 Cop29 Nigeria</p>
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

module.exports = sendResetPassword;
