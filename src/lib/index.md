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
const Cumulonimbus = require("cumulonimbus-wrapper");

// With a token
const client = new Cumulonimbus(
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q"
);

// Logging in with a username and password
const client = await Cumulonimbus.login("username", "password");

// Registering an account
const client = await Cumulonimbus.register(
  "username",
  "email",
  "password",
  "password"
);

// Get your user object
console.log((await client.getUser()).result);
```
