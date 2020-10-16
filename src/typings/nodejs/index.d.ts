/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    DEFAULT_ADMIN_LOGIN: string;
    DEFAULT_ADMIN_PASSWORD: string;
    JWT_SECRET_ADMIN: string;
    JWT_SECRET_USER: string;
    MONGODB_CONNECTION: string;
    PORT: string;
  }
}
