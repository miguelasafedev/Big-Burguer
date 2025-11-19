
const categorias = {
    sanduiches: [
        {
            img: "./img/bigsalada.png",
            nome: "BIG SALADA",
            desc: "Pão, hambúrguer, alface, tomate, queijo..."
        },
        {
            img: "./img/bigbacon.png",
            nome: "BIG BACON",
            desc: "Pão, hambúrguer, bacon, cebola caramelizada..."
        },
        {
            img: "./img/bigchicken.png",
            nome: "BIG CHICKEN",
            desc: "Pão, frango, alface, queijo, molho branco..."
        },
        {
            img: "./img/bigfish.png",
            nome: "BIG FISH",
            desc: "Pão, peixe frito, alface, tomate, molho..."
        }
    ],

    bebidas: [
        {
            img: "./img/coca-cola.png",
            nome: "Coca-Cola",
            desc: "350ml gelada."
        },
        {
            img: "./img/guarana.png",
            nome: "Guaraná",
            desc: "350ml gelado."
        },
        {
            img: "./img/suco.png",
            nome: "Suco natural",
            desc: "Sabores variados."
        },
        {
            img: "./img/shake.png",
            nome: "Milkshake",
            desc: "Chocolate, morango ou baunilha."
        }
    ],

    sobremesas: [
        {
            img: "./img/brownie.png",
            nome: "Brownie",
            desc: "Com calda de chocolate."
        },
        {
            img: "./img/sorvete.png",
            nome: "Sorvete",
            desc: "Baunilha, chocolate ou morango."
        },
        {
            img: "./img/petit.png",
            nome: "Petit Gateau",
            desc: "Quente com sorvete."
        },
        {
            img: "./img/acai.png",
            nome: "Açaí",
            desc: "350ml com granola."
        }
    ]
};



function mudarCategoria(tipo) {
    const grid = document.querySelector(".produtos-grid");
    const cards = grid.querySelectorAll(".produto-card");

    categorias[tipo].forEach((item, i) => {
        const card = cards[i];
        card.querySelector("img").src = item.img;
        card.querySelector(".produto-info h3").textContent = item.nome;
        card.querySelector(".produto-info p").textContent = item.desc;
    });
}



document.getElementById("btn-sanduiches").addEventListener("click", () => mudarCategoria("sanduiches"));
document.getElementById("btn-bebidas").addEventListener("click", () => mudarCategoria("bebidas"));
document.getElementById("btn-sobremesas").addEventListener("click", () => mudarCategoria("sobremesas"));

const botoes = document.querySelectorAll(".cardapio-menu button");

botoes.forEach(btn => {
    btn.addEventListener("click", () => {
        
        botoes.forEach(b => b.classList.remove("ativo"));
        
        btn.classList.add("ativo");
    });
});
