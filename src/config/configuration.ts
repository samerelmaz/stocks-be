export default () => ({
  polygon: {
    apiKey: process.env.POLYGON_API_KEY || 'dummy-api-key',
    baseUrl: 'https://api.polygon.io',
    timeframe: {
      multiplier: 1,
      timespan: 'day',
      from: new Date(Date.now() - 60 * 60 * 1000 * 24)
        .toISOString()
        .split('T')[0],
      to: new Date().toISOString().split('T')[0],
    },
  },
});
