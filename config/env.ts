const endpointConfigs = {
  // 测试环境
  test: {
    API_SERVER: 'your-api-path',
  },

  // 开发环境
  dev: {
    API_SERVER: 'http://127.0.0.1:5000/',
  },

  // 本地
  prod: {
    API_SERVER: 'https://56xljbuw49.execute-api.us-east-1.amazonaws.com/dev/',
  },
};

export default endpointConfigs;
