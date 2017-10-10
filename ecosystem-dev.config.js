module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'API',
      script: 'npm',
      args: 'start',
      error_file: 'logs/error/err.log',
      out_file: 'logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        NODE_ENV: 'development',
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },

    // Second application
    {
      name: 'WEB',
      script: 'npm',
      args: 'run client'
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    dev: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};
