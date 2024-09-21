require('dotenv').config();
const express = require('express');
const Mailjet = require('node-mailjet');
const path = require('path');

const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Servindo arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// Configurando o Mailjet com suas chaves de API
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY, // Chave pública do Mailjet
  process.env.MAILJET_API_SECRET // Chave privada do Mailjet
);

// Função para enviar Whatsapp msg
// var axios = require('axios');

// async function sendWhatsAppMessage(data) {
//   var config = {
//     method: 'post',
//     url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
//     headers: {
//       'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
//       'Content-Type': 'application/json'
//     },
//     data: data
//   };

//   return axios(config)
// }


// Rota para enviar o e-mail e SMS
app.post('/api/sendemail', (req, res) => {
  const { nome, servico, email, telefone } = req.body;

  // Envio do e-mail usando Mailjet
  const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_USER,
            Name: 'Henjy Manutenções',
          },
          To: [
            {
              Email: process.env.EMAIL_USER,
              Name: 'Henjy Manutenções',
            },
          ],
          Subject: 'Nova Solicitação de Serviço',
          TextPart: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nServiço: ${servico}`,
          HTMLPart: `
            <h3>Nova Solicitação de Serviço</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Serviço:</strong> ${servico}</p>
          `,
        },
      ],
    });

  request
    .then((result) => {
      console.log('E-mail enviado com sucesso!', result.body);

      // Enviar SMS após o envio do e-mail
      // sendWhatsAppMessage(`Nova solicitação de serviço de ${nome}. Serviço: ${servico}. Contato: ${telefone}`);

      res.json({ message: 'Informações enviadas com sucesso!' });
    })
    .catch((err) => {
      console.error('Erro ao enviar o e-mail:', err.statusCode);
      res.status(500).json({ error: 'Erro ao enviar o e-mail' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
  // sendWhatsAppMessage("Servidor iniciado")
  console.log(`Servidor rodando em http://localhost:${port}`);
});
