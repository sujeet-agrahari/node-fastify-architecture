const HealthService = {
  async getExample(context, requestQuery) {
    return {
      message: 'Example',
      data: requestQuery,
    };
  },
};

export default HealthService;
