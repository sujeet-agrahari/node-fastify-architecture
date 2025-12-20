export default async function ExampleRoutes(exampleModule) {
  exampleModule.route({
    method: 'GET',
    url: '/',
    handler: exampleModule.exampleController.getExample,
  });
}
