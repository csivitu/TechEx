
const path = require('path');


const mailgun = require("mailgun-js");

function sendEmails(email, link, action, cb) {
  // File containing the email template
  let fileName = '';
  if (action === 'verify') {
    fileName = path.join(__dirname, 'verify.hbs');
  }

  if (action === 'resetpass') {
    fileName = path.join(__dirname, 'reset.hbs');
  }
  // Define the email details
  const mailSubject = 'TechEx by CSI-VIT'; // Enter mail subject
  const fromName = 'CSI-VIT'; // Enter from name
  const fromEmail = 'askcsivit@csivit.com'; // Enter from email
  const replyToMail = 'askcsivit@csivit.com'; // Reply-to email
  const replyToName = 'CSI-VIT'; // Reply-to name

  // Add the fields you want to template in the email
  const templateVals = {};
  templateVals.link = link;
  // templateVals.email = email;
};

const DOMAIN = "sandboxa180922f6d9645858b335aac6dcfc0de.mailgun.org";
const mg = mailgun({apiKey: "f920871a3d4c86374cec3f677b58ee0b-ea44b6dc-4e352d17", domain: DOMAIN});
const data = {
	from: "Mailgun Sandbox <postmaster@sandboxa180922f6d9645858b335aac6dcfc0de.mailgun.org>",
	to: "hebbarpran@gmail.com",
	subject: "Hello",
	text: "Testing some Mailgun awesomness!"
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});

module.exports = sendEmails;
