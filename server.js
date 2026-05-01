const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO TRANSPORTADOR (SMTP)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para porta 465
    auth: {
        user: "codestage2026@gmail.com", // O e-mail que vai enviar as confirmações
        pass: "nfor bvbl zwig vpyq"  // AQUELA SENHA DE APP DE 16 LETRAS
    }
});

app.post('/api/inscricao', async (req, res) => {
    const { nome, email, area } = req.body;

    const mailOptions = {
        from: '"Code & Stage 2026" <seu-email@gmail.com>',
        to: email, // O e-mail que o usuário digitou no site
        subject: `Bem-vindo ao Code & Stage, ${nome}! 🚀`,
        html: `
            <div style="background-color: #050505; color: white; padding: 40px; font-family: sans-serif; border-top: 4px solid #ED145B;">
                <h1 style="color: #ED145B;">INSCRIÇÃO CONFIRMADA!</h1>
                <p>Olá, <strong>${nome}</strong>.</p>
                <p>Você acaba de garantir seu lugar no maior evento de automação audiovisual do Senai.</p>
                <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;">
                <p><strong>Sua Área:</strong> ${area}</p>
                <p><strong>Data:</strong> 06 de Maio de 2026</p>
                <p>Prepare seus scripts Python. O sistema Art-Net aguarda seu comando.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ E-mail enviado com sucesso para: ${email}`);
        res.status(201).json({ status: 'sucesso' });
    } catch (error) {
        console.error("❌ Falha no envio:", error);
        res.status(500).json({ status: 'erro' });
    }
});

app.listen(3000, () => console.log('🚀 Servidor de E-mail ON na porta 3000'));