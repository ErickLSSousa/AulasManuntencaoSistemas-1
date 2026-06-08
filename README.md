# 🐛 Sistema de Usuários — Projeto com Bugs Intencionais

**Disciplina:** Manutenção de Sistemas  
**Aula 3:** Investigação e Levantamento de Evidências  
**Nível:** Iniciante / Intermediário

---

## 📁 Estrutura do Projeto

```
sistema-usuarios/
├── index.js         ← Ponto de entrada (orquestra os cenários)
├── controller.js    ← Camada de controle / orquestração
├── userService.js   ← Regras de negócio
├── database.js      ← Simulação de banco de dados
├── package.json
└── README.md
```

---

## ▶️ Como Executar

> Não é necessário instalar dependências (sem pacotes externos).

```bash
node index.js
```

Para testar cada cenário individualmente, edite `index.js` comentando/
descomentando os blocos indicados.

---

## 🔴 Stack Traces Esperados

### Cenário 1 — ReferenceError
```
=== Cenário 1: ReferenceError ===
[controller] Iniciando checkout para userId=1...
[userService] Montando perfil do usuário 1...
[userService] Obtendo e-mail do usuário 1...
[database] Buscando usuário com id=1...
/caminho/database.js:26
  const result = databse.users.find(user => user.id === id);
                 ^

ReferenceError: databse is not defined
    at findUserById (database.js:26:18)
    at getUserEmail (userService.js:24:18)
    at getUserProfile (userService.js:30:17)
    at handleCheckout (controller.js:19:19)
    at Object.<anonymous> (index.js:20:12)
```

### Cenário 2 — TypeError
```
=== Cenário 2: TypeError ===
[controller] Iniciando checkout para userId=99...
[userService] Montando perfil do usuário 99...
[userService] Obtendo e-mail do usuário 99...
[database] Buscando usuário com id=99...
/caminho/userService.js:24
  return user.email;
             ^

TypeError: Cannot read properties of undefined (reading 'email')
    at getUserEmail (userService.js:24:16)
    at getUserProfile (userService.js:30:17)
    at handleCheckout (controller.js:19:19)
    at Object.<anonymous> (index.js:24:12)
```

### Cenário 3 — UnhandledPromiseRejection
```
=== Cenário 3: UnhandledPromiseRejection ===
[controller] Processando pedido assíncrono...

node:internal/process/promises:289
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[UnhandledPromiseRejection: This error originated either by throwing inside
of an async function without a catch block, or by rejecting a promise which
was not handled with .catch(). The promise rejected with the reason:
Error: userId inválido: esperado number, recebido string]
    at processarPedido (controller.js:48:14)
    at Object.<anonymous> (index.js:30:12)
```

---

## 📋 Roteiro de Atividade para os Alunos

### Parte 1 — Leitura do Stack Trace (individual)
1. Execute `node index.js` e observe a saída no terminal.
2. Identifique: **qual arquivo** e **qual linha** contém o erro.
3. Explique, em uma frase, **o que o erro significa**.
4. Trace o caminho de chamadas: de `index.js` até o ponto de falha.

### Parte 2 — Análise de Causa Raiz
- Aplique o método dos **5 Por Quês** ao Cenário 1:
  - Por quê o sistema quebrou? → `ReferenceError`
  - Por quê `ReferenceError`? → variável `databse` não existe
  - Por quê `databse`? → typo de digitação
  - Por quê o typo não foi pego antes? → sem linting configurado
  - Por quê sem linting? → falta de processo de qualidade de código

### Parte 3 — Correção
Corrija cada bug e execute novamente para confirmar que o stack trace
sumiu.

---
## 💡 Dicas para os Alunos

- **Leia o stack trace de cima para baixo**: a primeira linha é o erro,
  as seguintes mostram o caminho que levou até ele.
- **O arquivo mais relevante** geralmente é o primeiro da lista que
  pertence ao seu projeto (não ao `node:internal`).
- **ReferenceError** → variável inexistente ou com typo.
- **TypeError** → operação em `null` ou `undefined`; verifique se o
  dado foi carregado antes de usá-lo.
- **UnhandledPromiseRejection** → toda Promise que pode rejeitar precisa
  de `.catch()` ou `try/catch` em contexto `async/await`.
