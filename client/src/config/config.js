const config = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || 'dev',
    apiUrl: process.env.API_URL || 'http://localhost:3000/',    
};

export default config;