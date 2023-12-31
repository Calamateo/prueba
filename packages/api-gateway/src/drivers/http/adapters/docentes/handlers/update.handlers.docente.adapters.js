const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updatedocente(req, reply) {
  try {
    const { ...data } = req.body;
    const { docenteId } = req.params;

    Logger.info('[docentes]: Updating solicitud');

    const solicitud = await this.solicitudServices.updateDocente(
      { id: docenteId },
      data,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updatedocente;
