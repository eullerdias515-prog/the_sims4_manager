const form = document.getElementById('formSim');
const lista = document.getElementById('listaSims');

async function carregarSims() {
    const resposta = await fetch('/api/sims');
    const sims = await resposta.json();

    lista.innerHTML = '';

    sims.forEach(sim => {
        lista.innerHTML += `
            <div class="sim">
                <h3>${sim.nome}</h3>
                <p>Idade: ${sim.idade}</p>
                <p>Carreira: ${sim.carreira}</p>
                <p>Dinheiro: §${sim.dinheiro}</p>
            </div>
        `;
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        carreira: document.getElementById('carreira').value,
        dinheiro: document.getElementById('dinheiro').value
    };

    await fetch('/api/sims', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    form.reset();

    carregarSims();
});

carregarSims();
