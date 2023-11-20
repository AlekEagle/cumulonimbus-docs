# The Cumulonimbus Wrapper

Cumulonimbus also has a wrapper for Node.js and browsers. TypeScript type definitions are included. It is available on [npm](https://npmjs.com/package/cumulonimbus-wrapper).

## Installation

```bash
# npm
npm install cumulonimbus-wrapper

# yarn
yarn add cumulonimbus-wrapper

# some other package manager
<package manager> install cumulonimbus-wrapper
# maybe, I don't know
```

## Usage

```js
// CommonJS
const Cumulonimbus = require('cumulonimbus-wrapper');

// ES6
import Cumulonimbus from 'cumulonimbus-wrapper';

// Browser
// Pray that you bundled it correctly and import it how you would according to your bundler

// Pre existing token
const client = new Cumulonimbus('your-api-token');

// Login (Creates a new token)
const client = await Cumulonimbus.login({
  username: 'username',
  password: 'password',
});

// Register (Creates a new user and token)
const client = await Cumulonimbus.register({
  username: 'username',
  password: 'password',
  confirmPassword: 'password',
  email: 'email',
});

console.log((await client.getSession()).result);
```
