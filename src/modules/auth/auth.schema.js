import fp from 'fastify-plugin';

const loginSchema = {
  $id: 'schema:auth:login',
  type: 'object',
  required: ['name', 'email'],
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
};

const loginResSchema = {
  $id: 'schema:auth:loginRes',
  type: 'object',
  required: ['id', 'name', 'email'],
  additionalProperties: false,
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
};

export default fp(async (authModule) => {
  authModule.addSchema(loginSchema);
  authModule.addSchema(loginResSchema);
});
