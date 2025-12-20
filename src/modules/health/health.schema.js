import fp from 'fastify-plugin';

const healthResSchema = {
  $id: 'schema:health:healthRes',
  type: 'object',
  required: ['app', 'database'],
  additionalProperties: false,
  properties: {
    app: {
      type: 'object',
      required: ['status'],
      additionalProperties: false,
      properties: {
        status: { type: 'string', enum: ['up', 'down'] },
      },
    },
    database: {
      type: 'object',
      required: ['status'],
      additionalProperties: false,
      properties: {
        status: { type: 'string', enum: ['up', 'down'] },
      },
    },
  },
};

export default fp(async (healthModule) => {
  healthModule.addSchema(healthResSchema);
});
