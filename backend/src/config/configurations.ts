export default () => ({
  DATABASE: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  },
  FIREBASE: {
    API_KEY: process.env.firebase_api_key,
    AUTH_DOMAIN: process.env.firebase_auth_domain,
    PROJECT_ID: process.env.firebase_project_id,
    STORAGE_BUCKET: process.env.firebase_storage_bucket,
    MESSAGING_SENDER_ID: process.env.firebase_messaging_sender_id,
    APP_ID: process.env.firebase_app_id,
    MEASUREMENT_ID: process.env.firebase_measurement_id,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
  }
});
