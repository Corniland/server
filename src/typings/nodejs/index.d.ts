/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGODB_CONNECTION: string;
    ACCESS_TOKEN_SECRET: string;
    ADMIN_ACCESS_TOKEN_SECRET: string;
  }
}
