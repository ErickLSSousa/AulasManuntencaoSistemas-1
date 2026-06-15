// index.js
// Ponto de entrada da aplicação.
// Executa três cenários em sequência para demonstrar os três bugs.

const controller = require("./controller");

const carrinho = [
  { produto: "Notebook", price: 3500 },
  { produto: "Mouse", price: 120 }
];

// ─── Cenário 1: (BUG #1) ───────
// console.log("=== Cenário 1: ReferenceError ===");
// controller.handleCheckout(1, carrinho);

// ─── Cenário 2: (BUG #2) ────────────
// Descomente o bloco abaixo e comente o Cenário 1 para testar.
//
// controller.handleCheckout(99, carrinho);

// ─── Cenário 3: (BUG #3) ─────
// BUG #3 CORRIGIDO: a Promise retornada por processarPedido não tinha .catch().
// Uma rejeição sem tratamento causa UnhandledPromiseRejection e encerra o processo.
// Agora o erro é capturado e exibido de forma controlada.
controller.processarPedido("abc", carrinho)
  .then(result => {
    console.log("[index] Pedido concluído:", result);
  })
  .catch(err => {
    console.error("[index] Erro ao processar pedido:", err.message);
  });
