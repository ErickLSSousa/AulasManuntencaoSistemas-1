// Camada de controle — orquestra as chamadas de serviço e processa
// as respostas antes de devolvê-las ao ponto de entrada.

const userService = require("./userService");

function handleCheckout(userId, cartItems) {
  console.log(`[controller] Iniciando checkout para userId=${userId}...`);

  // Chama a cadeia: handleCheckout → getUserProfile → getUserEmail → findUserById
  const profile = userService.getUserProfile(userId);

  console.log(`[controller] Perfil obtido: ${JSON.stringify(profile)}`);

  return {
    success: true,
    message: `Pedido processado para ${profile.email}`,
    items: cartItems,
    total: cartItems.reduce((acc, item) => acc + item.price, 0)
  };
}

// BUG #3 — UnhandledPromiseRejection
// A função retorna uma Promise que pode rejeitar, mas quem a chama
// (index.js) não encadeia um .catch() para tratar o erro.
function processarPedido(userId, cart) {
  return new Promise((resolve, reject) => {
    console.log(`[controller] Processando pedido assíncrono...`);

    setTimeout(() => {
      if (!userId || typeof userId !== "number") {
        reject(new Error(`userId inválido: esperado number, recebido ${typeof userId}`));
      } else {
        resolve(handleCheckout(userId, cart));
      }
    }, 100);
  });
}

module.exports = { handleCheckout, processarPedido };
