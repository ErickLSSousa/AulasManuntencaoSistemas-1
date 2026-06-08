// index.js
// Ponto de entrada da aplicação.
// Executa três cenários em sequência para demonstrar os três bugs.

const controller = require("./controller");

const carrinho = [
  { produto: "Notebook", price: 3500 },
  { produto: "Mouse", price: 120 }
];

// ─── Cenário 1: (BUG #1) ───────
console.log("=== Cenário 1: ReferenceError ===");
controller.handleCheckout(1, carrinho);

// ─── Cenário 2: (BUG #2) ────────────
// Descomente o bloco abaixo e comente o Cenário 1 para testar.
//
// controller.handleCheckout(99, carrinho);

// ─── Cenário 3: (BUG #3) ─────
// Descomente o bloco abaixo e comente os anteriores para testar.
//
// controller.processarPedido("abc", carrinho);
