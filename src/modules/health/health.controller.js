const HealthController = {
  async getHealthStatus() {
    const healthStatus = await this.healthService.getHealthStatus(this);
    return healthStatus;
  },
};

export default HealthController;
