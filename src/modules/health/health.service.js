const HealthService = {
  async getHealthStatus(context) {
    const appHealthStatus = {
      database: { status: 'down' },
      app: { status: 'down' },
    };
    try {
      await context.db.$queryRaw`SELECT 1`;
      appHealthStatus.database.status = 'up';
    } catch (error) {
      // Database connection error
      this.log.error(error);
      appHealthStatus.database.status = 'down';
    }

    appHealthStatus.app.status = 'up';

    return appHealthStatus;
  },
};

export default HealthService;
