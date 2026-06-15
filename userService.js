// Camada de serviço — aplica regras de negócio sobre os dados do banco.

const db = require("./database");

function getUserEmail(userId) {
  console.log(`[userService] Obtendo e-mail do usuário ${userId}...`);

  // BUG #2 CORRIGIDO: findUserById pode lançar erro se o usuário não existir.
  // Sem o try/catch, a exceção subia silenciosamente e causava crash inesperado.
  // Agora capturamos e relançamos com mensagem de contexto mais clara.
  try {
    const user = db.findUserById(userId);
    return user.email;
  } catch (err) {
    throw new Error(`[userService] Falha ao obter e-mail: ${err.message}`);
  }
}

function getUserProfile(userId) {
  console.log(`[userService] Montando perfil do usuário ${userId}...`);

  const email = getUserEmail(userId);

  return {
    userId,
    email,
    fetchedAt: new Date().toISOString()
  };
}

module.exports = { getUserEmail, getUserProfile };
