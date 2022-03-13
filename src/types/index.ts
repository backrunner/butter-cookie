export interface CookieParams {
  value: string;
  expires?: number | string | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: string;
}
