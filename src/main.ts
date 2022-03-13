import { parseCookie, removeCookie, setCookie } from './utils/cookie';

const cache = {
  cookie: document.cookie,
  parsed: parseCookie(document.cookie),
  params: {},
};

const checkCookie = () => {
  if (document.cookie !== cache.cookie) {
    // cookie is different, parse again.
    cache.cookie = document.cookie;
    cache.parsed = parseCookie(document.cookie);
  }
};

export default new Proxy<object>(Object.create(null), {
  get: function (obj, prop): string {
    if (typeof prop === 'symbol') {
      throw new TypeError('Key cannot be a symbol.');
    }
    checkCookie();
    return cache.parsed[prop];
  },
  set: function (obj, prop, value: string) {
    if (typeof prop === 'symbol') {
      throw new TypeError('Key cannot be a symbol.');
    }
    if (typeof value !== 'string') {
      throw new TypeError('Value should be a string.');
    }
    setCookie(prop, value);
    checkCookie();
    return true;
  },
  deleteProperty: function (obj, prop) {
    if (typeof prop === 'symbol') {
      throw new TypeError('Key cannot be a symbol.');
    }
    removeCookie(prop);
    return true;
  },
});
