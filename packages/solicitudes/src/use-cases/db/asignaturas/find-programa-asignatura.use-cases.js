const { checkers } = require('@siiges-services/shared');

const findProgramaAsignatura = (findProgramaAsignaturaQuery) => async (identifierObj) => {
  const asignaturas = await findProgramaAsignaturaQuery({ identifierObj });

  checkers.throwErrorIfDataIsFalsy(asignaturas, 'asignaturas', identifierObj.id);

  return asignaturas;
};

module.exports = findProgramaAsignatura;
