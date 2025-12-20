const ExampleService = {
  async getExample(context, requestQuery) {
    return {
      message: 'Example',
      data: requestQuery,
    };
  },
};

export default ExampleService;
