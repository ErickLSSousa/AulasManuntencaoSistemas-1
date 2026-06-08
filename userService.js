// Camada de serviço — aplica regras de negócio sobre os dados do banco.

const db = require("./database");

function getUserEmail(userId) {
  console.log(`[userService] Obtendo e-mail do usuário ${userId}...`);

  const user = db.findUserById(userId);
  return user.email;
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
