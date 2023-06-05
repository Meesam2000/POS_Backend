const Mailer = require('../utils/mailer')

exports.sendConfirmationEmail = async (name, email, confirmationCode) => {
    new Mailer().sendMail(email, "Account Confirmation", `<h1>Email Confirmation</h1>
    <h2>Welcome ${name}!</h2>
    <h3>You are one step away from successful creation of your signup account</h3>
    <p>Please verify your email to complete your account setup.</p>
    <a href=http://localhost:3000/account/confirm/${confirmationCode}> Click here to proceed</a>
    </div>`).then(() => {
        console.log("Email sent successfully...")
    }).catch(err => console.log(err));
};
exports.sendToken = (name, email, token) => {

    new Mailer().sendMail(email, "Reset password request", `<h1>Forget Password Code</h1>
    <h2>Welcome ${name}</h2>
    <p>This is your forget password code ,copy it and paste at input field of website</p>
    <h1 style={{color:'green'}}>Code: ${token}</h1>
    </div>`).then(() => {
        console.log("Email sent successfully...")
    }).catch(err => console.log(err));
};
exports.sendFaq = (name, email, subject, body) => {

    new Mailer().sendMail('g.p.o.s4u@gmail.com', subject,
    `<h1>Query</h1>
    <h2>This mail is from ${name}</h2>
    <h2>Email Address: ${email}</h2>
    <p>${body}</p>
    </div>`).then(() => {
        console.log("Email sent successfully...")
    }).catch(err => console.log(err));
};