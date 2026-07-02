// Contrato do corpo da resposta de login, validado com AJV.
// Garante que o token de autenticação sempre venha presente e não vazio.
export const loginSchema = {
  type: "object",
  required: ["message", "authorization"],
  properties: {
    message: { type: "string" },
    authorization: { type: "string", minLength: 1 },
  },
};
