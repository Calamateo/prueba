const { plantelesAdapter } = require('../../adapters');

const {
  createHigieneSchema,
} = require('./schema');

async function plantelRouter(fastify, opts, next) {
  await fastify.post(

    '/:plantelId/higiene/:higieneId',
    {
      schema: createHigieneSchema,
    },
    plantelesAdapter.createPlantelHigiene,
  );

  next();
}

module.exports = plantelRouter;
