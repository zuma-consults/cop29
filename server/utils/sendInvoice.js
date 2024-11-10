require("dotenv").config();
const nodemailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_ADDRESS_FROM } = process.env;

const sendInvoiceEmail = async (to, name, amount, events) => {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: SENDER_EMAIL_ADDRESS,
      pass: "wvrr djes apqp nzyz", // You should use environment variables for this.
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  const eventDetailsHtml = `
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Event Title</th>
        <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Date</th>
        <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Time Slot</th>
      </tr>
    </thead>
    <tbody>
      ${events
        .map(
          (event) => `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${
              event.title
            }</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: left;">
            ${event.date.toLocaleString("en-GB", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </td>          
          <td style="padding: 10px; border: 1px solid #ddd; text-align: left;">
                  ${new Date(event.start).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })} - 
              ${new Date(event.end).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </td>

          </tr>`
        )
        .join("")}
    </tbody>
  </table>
`;

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS_FROM,
    to: to,
    subject: "COP29 Nigeria Invoice",
    text: "Payment Instructions",
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
      <h5 style="margin: 0">SIDE EVENT INVOICE</h5>
    </div>
    <div style="padding: 50px">
      <h3 style="color: #003300">Hello ${name},</h3>
      <p style="color: #336633; font-size: 15px">
        Thank you for showing interest in hosting a side event for COP29 Nigeria!
      </p>
      <div style="padding: 20px; color: #336633; font-size: 15px;">
        ${eventDetailsHtml}
        <p style="color: #336633; font-size: 15px;">
          Your application has been received. To complete the process, kindly make a payment of <strong>₦${amount}</strong> to the following account:
        </p>
        <p style="text-align: center; margin: 20px 0; font-size: 15px;">
          <strong>Account Name:</strong> National Council on Climate Change <br />
          <strong>Account Number:</strong> 0020104165045 Naira Account (TSA)<br />
        </p>
        <p style="color: #336633; font-size: 15px;">
        Upon completing your payment, please upload the payment confirmation via your profile page. Please note that the reservation for your event slot(s) is provisional and will be held for a maximum of 24 hours. If proof of payment is not received within this time frame, your request will be automatically canceled.
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

          <p style="color: #336633; font-size: 15px;">
          If you have any questions, please contact us at: <a href="mailto:copregistration@natccc.gov.ng">copregistration@natccc.gov.ng</a>
          </p>

      </div>
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
        Nigeria COP29 Focus: Actualizing Financial Commitments for Climate Action.
      </p>
      <p style="color: whitesmoke; font-size: 11px; margin-top: 15px">
        <a
          href="https://nigccdelegation.natccc.gov.ng/"
          style="color: whitesmoke; text-decoration: none"
        >Visit Website</a>
      </p>
      <p style="color: whitesmoke; font-size: 11px">© 2024 COP29 NIGERIA PORTAL</p>
    </div>
  </div>
    `,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email: ", err);
      return err;
    }
    console.log("Email sent: ", info);
    return info;
  });
};

module.exports = sendInvoiceEmail;
