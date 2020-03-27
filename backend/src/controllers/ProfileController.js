const connection = require("../database/connection");

module.exports = {
  //listar os casos especificos das ongs
  async index(request, response) {
    const ong_id = request.headers.authorization;
    const incidents = await connection("incidents")
      .where("ong_id", ong_id)
      .select("*");
    return response.json(incidents);
  }
};
