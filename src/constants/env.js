export default (mode) => {
  switch (mode) {
    case 'staging':
      return {
        baseUrl: 'http://localhost:5000/api/v1',
        appName: 'BDDOX',
        version: '1.0.0-beta',
      };
    case 'production':
      return {
        baseUrl: 'http://localhost:5000/api/v1',
        appName: 'BDDOX',
        version: '1.0.0-beta',
      };
    default:
      return {
        baseUrl: 'http://localhost:5000/api/v1',
        appName: 'BAT Armada',
        version: '1.0.0-beta',
      };
  }
};
