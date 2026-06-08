// Simula uma camada de acesso ao banco de dados.

const database = {
  users: [
    { id: 1, name: "Ana Souza", email: "ana@email.com", role: "admin" },
    { id: 2, name: "Bruno Lima", email: "bruno@email.com", role: "user" },
    { id: 3, name: "Carla Mendes", email: "carla@email.com", role: "user" }
  ]
};

function findUserById(id) {
  console.log(`[database] Buscando usuário com id=${id}...`);

  // BUG #1 — ReferenceError: 'databse' is not defined
  // O programador escreveu 'databse' em vez de 'database'.
  const result = databse.users.find(user => user.id === id);

  return result;
}

function getAllUsers() {
  console.log("[database] Retornando todos os usuários...");
  return database.users;
}

module.exports = { findUserById, getAllUsers };
