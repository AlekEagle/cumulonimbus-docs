# The Cumulonimbus Wrapper

Cumulonimbus also has a wrapper for Node.js and browsers. It is available on [npm](https://npmjs.com/package/cumulonimbus-wrapper).

## Installation

```bash
# npm
npm install cumulonimbus-wrapper

# yarn
yarn add cumulonimbus-wrapper

# some other package manager
<package manager> install cumulonimbus-wrapper
# that's probably a lie
```

## Usage

```js
// CommonJS
const Cumulonimbus = require('cumulonimbus-wrapper');

// ES6
import Cumulonimbus from 'cumulonimbus-wrapper';

// Browser
// Pray that you bundled it

// Pre existing token
const client = new Cumulonimbus('your-api-token');

// Login (Creates a new token)
const client = await Cumulonimbus.login('username', 'password');

// Register (Creates a new user and token)
const client = await Cumulonimbus.register(
  'username',
  'email',
  'password',
  'repeatPassword',
);

console.log((await client.getSession()).result);
```
