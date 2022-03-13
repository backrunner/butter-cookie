# 🍪 Butter Cookie

Manipulate cookie easily via Proxy, less than 1KB after gzip.

## 🔧 Usage

First of all, you should install this package via `npm` or other package manager you're using.

```bash
npm install butter-cookie
```

Then use it like this:

```js
import Cookie from 'butter-cookie';

// To get the value of some key from document.cookie
// For example, you want to get the value of key named "username"

console.log(Cookie.username);

// To set a new value to cookie
Cookie.username = 'new_user';

// To set a new value to cookie with expires or other attributes
Cookie.username = {
  sameSite: 'lax',
  expires: '1h',
  value: 'new_user',
};

// To remove a key from cookie
delete Cookie.username;

// To remove a key from certain domain and path
Cookie.username = {
  expires: '-1',
  domain: 'github.com',
  path: '/backrunner',
};
```

## ✒ License

MIT
