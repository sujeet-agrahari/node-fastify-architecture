import HealthService from './health.service.js';

const HealthController = {
  async getHealthStatus() {
    const healthStatus = await HealthService.getHealthStatus(this);
    return healthStatus;
  },
};

export default HealthController;
