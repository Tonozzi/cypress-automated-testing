// Contrato do corpo da resposta de "usuário criado", validado com AJV.
// Protege contra mudanças silenciosas da API (id faltando, tipo errado, etc.).
export const usuarioCriadoSchema = {
  type: "object",
  required: ["message", "_id"],
  properties: {
    message: { type: "string" },
    _id: { type: "string", minLength: 1 },
  },
};
