const ExampleController = {
  async getExample(request) {
    const example = await this.exampleService.getExample(this, request.query);
    return example;
  },
};

export default ExampleController;
