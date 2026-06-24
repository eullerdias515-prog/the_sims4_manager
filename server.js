const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

let sims = [
    {
        id: 1,
        nome: "Euller",
        idade: 18,
        carreira: "Programador",
        dinheiro: 5000
    }
];

app.get('/api/sims', (req, res) => {
    res.json(sims);
});

app.post('/api/sims', (req, res) => {
    const novoSim = {
        id: sims.length + 1,
        nome: req.body.nome,
        idade: Number(req.body.idade),
        carreira: req.body.carreira,
        dinheiro: Number(req.body.dinheiro)
    };

    sims.push(novoSim);

    res.json({
        mensagem: "Sim cadastrado com sucesso!",
        sim: novoSim
    });
});

app.put('/api/sims/:id', (req, res) => {
    const id = Number(req.params.id);

    const sim = sims.find(s => s.id === id);

    if (!sim) {
        return res.status(404).json({ mensagem: "Sim não encontrado" });
    }

    sim.nome = req.body.nome || sim.nome;
    sim.idade = req.body.idade || sim.idade;
    sim.carreira = req.body.carreira || sim.carreira;
    sim.dinheiro = req.body.dinheiro || sim.dinheiro;

    res.json({
        mensagem: "Sim atualizado!",
        sim
    });
});

app.delete('/api/sims/:id', (req, res) => {
    const id = Number(req.params.id);

    sims = sims.filter(s => s.id !== id);

    res.json({
        mensagem: "Sim removido!"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
