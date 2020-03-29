//os teste sao escritos em formatos de frases.
//USA-SE O "IT" PARA DEFINIR O QUE SERA GERADO;
// IT = COISA = ABSTRATA
const generateUniqueId = require("../../src/utils/generateUniqueId");

describe("Generate Unique ID", () => {
  it("deve gerar um chave unica", () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  });
});
