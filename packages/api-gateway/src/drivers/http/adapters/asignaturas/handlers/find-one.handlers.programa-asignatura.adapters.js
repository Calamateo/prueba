const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findProgramaAsignatura(req, reply) {
  try {
    const { programaId } = req.params;

    Logger.info('[programa]: Getting asignatura - programa');
    const asignatura = await this.solicitudServices.findProgramaAsignatura(
      { programaId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: asignatura });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findProgramaAsignatura;
