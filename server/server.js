require('dotenv').config(); 

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/enviar-email', (req, res) => {
  const { subject, message, toEmail } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email enviado com sucesso');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor estar rodando na porta ${port}`);
});
