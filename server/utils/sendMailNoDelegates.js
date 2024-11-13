require("dotenv").config();
const nodemailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_ADDRESS_FROM } = process.env;

const sendEmailNoDelegates = async (to, name, subject, message1, message2) => {
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
    subject: subject,
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
          <h3>COP 29 Invoice</h3>
        </div>
        <div style="padding: 50px; display: grid">
          <h3 style="color: #003300">Dear ${name},</h3>
          <p style="color: #336633; font-size: 15px; margin-bottom: 20px">
          ${message1}
          </p>
  
          <p style="color: #336633; font-size: 15px; margin-bottom: 20px">
          ${message2}
          </p>
  
          <p style="color: #336633; font-size: 15px; margin-bottom: 20px">
            Warm regards, <br />
            COP29 Nigeria
          </p>
  
          <h4 style="color: #003300; margin-top: 30px;">NATIONAL COUNCIL ON CLIMATE CHANGE COP29 PAYMENT GUIDE</h4>
          <p style="color: #336633; font-size: 15px; margin-bottom: 20px">
            Payments can now be made via the channel below:
          </p>
  
          <p style="color: #336633; font-size: 15px; margin-bottom: 10px;">
            1. Go to <a href="https://www.remita.net" style="color: #004d00; text-decoration: none;">www.remita.net</a><br />
            2. Click on "Pay TSA and States"<br />
            3. Click on "FGN: Federal Government of Nigeria"<br />
            4. Click "Who do you want to pay *" (type NATIONAL COUNCIL ON CLIMATE CHANGE)<br />
            5. Click "Name of service/purpose *" (type NCCC Resourcing Activities & Grant)<br />
            6. Click "Description *" (type description of payment)<br />
            7. Click "GIFMIS CODE (If unknown contact the MDA) *" (type GIFMIS CODE)<br />
            8. Enter the Amount, Payer's name, Payer Phone, and Payer Email<br />
            9. Click "I'm not a robot"<br />
            10. Click "Submit"
          </p>
  
          <p style="color: #336633; font-size: 15px; margin-bottom: 10px;">
            You can choose to pay using the following options:
            <ul style="margin-left: 20px; color: #336633;">
              <li>Debit/Credit Cards</li>
              <li>Bank Transfer</li>
              <li>USSD</li>
              <li>At a Bank Branch</li>
              <li>With Internet Banking</li>
            </ul>
          </p>
  
          <p style="color: #336633; font-size: 15px; margin-bottom: 10px;">
            <strong>(1)</strong> If you choose to pay at a Bank Branch, take your RRR and the total amount to pay and visit any Bank Branch to make the payment.<br />
            <strong>(2)</strong> If you choose to pay with your card, please allow the process to complete before you move to the next step. If not, you will not get the RRR in your email because of interruption.<br />
            <br />
            Please note your Remita Retrieval Reference (RRR).
          </p>
  
          <p style="color: #336633; font-size: 15px; margin-bottom: 20px;">
            Payers will be issued an electronic receipt following payment or a bank teller, which should be taken to the National Council on Climate Change. You can call Mr. Sadiq at 0809 898 7738 for any assistance.
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
            Nigeria COP29 Focus: Actualizing Financial Commitments for Climate Action.
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
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = sendEmailNoDelegates;
