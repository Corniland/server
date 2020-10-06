/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGODB_CONNECTION: string;
    JWT_SECRET_USER: string;
    JWT_SECRET_ADMIN: string;
  }
}
