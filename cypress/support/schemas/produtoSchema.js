// Contrato do corpo da resposta de "produto criado", validado com AJV.
export const produtoCriadoSchema = {
  type: "object",
  required: ["message", "_id"],
  properties: {
    message: { type: "string" },
    _id: { type: "string", minLength: 1 },
  },
};
