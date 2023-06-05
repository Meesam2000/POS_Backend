const nodemailer = require('nodemailer')
const { google } = require('googleapis')

async function getTemplateHtml(template) {
  try {
    const templatePath = path.resolve(
      `./static/emails/templates/${template}.html`
    )
    return await readFile(templatePath, 'utf8')
  } catch (err) {
    console.log(err)
    return Promise.reject(
      `Could not load html template at: ./static/emails/templates/${template}.html`
    )
  }
}

module.exports = class Mailer {
  constructor(config = {}) {
    const gmail =  {
        "email": "g.p.o.s4u@gmail.com",
        "clientId": "Add you client ID here",
        "clientSecret": "Add your Client Secret here",
        "refreshToken": "Add your refresh token here"
      }
    this.REFRESH_TOKEN = gmail.refreshToken

    this.oAuth2Client = new google.auth.OAuth2(
      gmail.clientId,
      gmail.clientSecret,
      'https://developers.google.com/oauthplayground'
    )
    this.oAuth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN })
    const smtpConfig = {
      service: 'Gmail',
      port: 587,
      auth: {
        type: 'OAuth2',
        user: gmail.email,
        clientId: gmail.clientId,
        clientSecret: gmail.clientSecret
      }
    }
    this.transporter = nodemailer.createTransport(smtpConfig)
    this.mailConfig = {
      from: smtpConfig.auth.user,
      to: config.to || '',
      subject: config.subject || '',
      html: config.html || ''
    }
  }

  async sendMail(mailConfig) {
    const accessToken = await this.oAuth2Client.getAccessToken()
    console.log("this is Accesss token ", accessToken);

    mailConfig = {
      ...this.mailConfig,
      ...mailConfig,
      auth: {
        refreshToken: this.REFRESH_TOKEN,
        accessToken: accessToken
      }
    }

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailConfig, (err, data) => {
        if (err) {
          return reject(err)
        } else {
          console.log('Email sent: ' + data.response)
          return resolve(data)
        }
      })
    })
  }

  async sendMail(to, subject, content) {
    const accessToken = await this.oAuth2Client.getAccessToken()

    const mailConfig = {
      ...this.mailConfig,
      to,
      subject,
      html: content,
      auth: {
        refreshToken: this.REFRESH_TOKEN,
        accessToken: accessToken
      }
    }

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailConfig, (err, data) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(data)
        }
      })
    })
  }
}

module.exports.getTemplateHtml = getTemplateHtml