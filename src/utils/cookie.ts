import { CookieParams } from '../types';

const timeSecs = {
  year: 31104000,
  y: 31104000,
  month: 2592000,
  m: 2592000,
  day: 86400,
  d: 86400,
  hour: 3600,
  h: 3600,
  minute: 60,
  min: 60,
  second: 1,
  sec: 1,
  s: 1,
};

export const parseCookie = (cookie: string) => {
  const result: Record<string, string> = {};
  cookie.split('; ').forEach((cookieItem) => {
    const [key, value] = cookieItem.split('=').map((item) => decodeURIComponent(item));
    result[key] = value;
  });
  return result;
};

const getExpiresStr = (expires: number | string | Date) => {
  if (expires <= 0) {
    return `; expires=-1`;
  }
  if (expires === Infinity) {
    return '; expires=Fri, 31 Dec 2999 23:59:59';
  }
  if (typeof expires === 'number') {
    if (isNaN(expires)) {
      throw new Error('expires should not be NaN.');
    }
    return `; max-age=${expires}`;
  }
  if (expires instanceof Date) {
    return `; expires=${expires.toUTCString()}`;
  }
  if (!/^(?:\d+)\s*(y|year|m|month|day|d|hour|h|minute|min|sec|second|s)$/i.test(expires)) {
    throw new Error('Cannot parse expires time.');
  }
  const timeAmount = parseInt(
    expires.replace(/^(\d+)(?:y|year|m|month|day|d|hour|h|minute|min|sec|second|s)$/i, '$1'),
    10,
  );
  const timeUnit = expires
    .replace(/^(?:\d+)\s*(y|year|m|month|day|d|hour|h|minute|min|sec|second|s)$/i, '$1')
    ?.toLowerCase() as keyof typeof timeSecs;
  if (isNaN(timeAmount) || !timeUnit || !timeSecs[timeUnit]) {
    throw new Error('Cannot parse expires time.');
  }
  return `; expires=${timeAmount * timeSecs[timeUnit]}`;
};

const buildCookieStr = (key: string, params: CookieParams) => {
  const { value, expires, domain, path, secure, sameSite } = params;
  let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  if (domain) {
    cookie += `; domain=${domain}`;
  }
  if (path) {
    cookie += `; path=${path}`;
  }
  if (secure) {
    cookie += `; secure=Secure`;
  }
  if (sameSite) {
    cookie += `; SameSite=${sameSite}`;
  }
  if (expires) {
    cookie += getExpiresStr(expires);
  }
  return cookie;
};

export const setCookie = (key: string, value: string | CookieParams) => {
  if (typeof value === 'string') {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    return;
  }
  document.cookie = buildCookieStr(key, value);
};

export const removeCookie = (key: string) => {
  document.cookie = `${encodeURIComponent(key)}; expires=-1`;
};
