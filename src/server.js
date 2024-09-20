const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servindo arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));


// Rota para enviar email
app.post('/api/sendemail', async (req, res) => {
  const { nome, servico, email, telefone } = req.body;

  // Configuração do transporte de e-mail
  const transporter = nodemailer.createTransport({
      service: 'gmail', // ou outro serviço de e-mail
      auth: {
          user: 'seu-email@gmail.com', // Seu e-mail
          pass: 'sua-senha' // Sua senha
      }
  });

  // Configuração do e-mail
  const mailOptions = {
      from: 'seu-email@gmail.com', // Seu e-mail
      to: 'seu-email@gmail.com', // Seu e-mail (para você mesmo)
      subject: 'Solicitação de Serviço',
      text: `Nome: ${nome}\nServiço: ${servico}\nE-mail: ${email}\nTelefone: ${telefone}`
  };

  // Envio do e-mail
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.status(500).send('Erro ao enviar o e-mail.');
      } else {
          console.log('E-mail enviado: ' + info.response);
          res.send('E-mail enviado com sucesso!');
      }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
