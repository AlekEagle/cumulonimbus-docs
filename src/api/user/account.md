# Account Management

These are endpoints that relate to interacting with the account of the user that is associated with the token.

## GET /user

Returns the user object of the current authenticated user.

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  -H "Authorization: token" \
  https://alekeagle.me/api/user
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user', {
  method: 'GET',
  credentials: 'include',
  headers: {
    Authorization: 'token'
  }
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [User](/reference/structures/data.md#user)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## PATCH /user

Update the current authenticated user.

At least one optional parameter is required in this request.

:::details Parameters

- Body

  - `username` _optional_

    - The new username for the account.

  - `email` _optional_

    - The new email for the account.

  - `newPassword` _optional_

    - The new password for the account.

  - `password`

    - The current password of the account for verification purposes.

:::

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X PATCH \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"bob\",\"newPassword\":\"bob\",\"password\":\"joe\"}" \
  https://alekeagle.me/api/user
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user', {
  method: 'PATCH',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'bob',
    password: 'joe',
    newPassword: 'bob'
  })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [User](/reference/structures/data.md#user)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /user

Delete the current authenticated user.

:::details Parameters

- Body

  - `username`

    - The username of the current authenticated user for verification purposes.

  - `password`

    - The password of the current authenticated user for verification purposes.

:::

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"joe\",\"password\":\"joe\"}" \
  https://alekeagle.me/api/user
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user', {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'joe',
    password: 'joe'
  })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [User](/reference/structures/data.md#user)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## POST /user

Create a new user.

:::tip No Authorization Required
This endpoint does not require authorization.
:::

:::warning Ratelimits
This endpoint uses a ratelimit that is separate from other endpoints, this endpoint may be used `1` time(s) every `30 minutes`.
:::

:::details Parameters

- Body

  - `username`

    - The username for the new user.

  - `email`

    - The email for the new user.

  - `password`

    - The password for the new user.

  - `repeatPassword`

    - Repeat the password for memory sake. (Yes, we validate the password repeating server-side, cringe, I dare you.)

  - `rememberMe` _optional_

    - Wether or not your session should last for a month or ten years.

:::

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"joe\",\"email\":\"joe@joe.joe\",\"password\":\"joe\",\"repeatPassword\":\"joe\",\"rememberMe\":true}" \
  https://alekeagle.me/api/user
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'joe',
    email: 'joe@joe.joe',
    password: 'joe',
    repeatPassword: 'joe',
    rememberMe: true
  })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 201 Created

  - [SuccessfulAuth](/reference/structures/errors.md#successfulauth)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

- 409 Conflict

  - [UserExists](/reference/structures/errors.md#userexists)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## PATCH /user/domain

Update the authenticated user's domain and subdomain selection.

:::details Parameters

- Body

  - `domain`

    - The domain you would like to select. Domain must be valid.

  - `subdomain` _optional_

    - The subdomain you would like to use. Any non alphanumeric characters will be stripped, must not be longer than 63 characters.

:::

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X PATCH \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"domain\":\"digiorno.delivery\",\"subdomain\":\"its not\"}" \
  https://alekeagle.me/api/user/domain
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/domain', {
  method: 'PATCH',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ domain: 'digiorno.delivery', subdomain: 'its not' })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [User](/reference/structures/data.md#user)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

  - [InvalidSubdomain](/reference/structures/errors.md#invalidsubdomain)

  - [SubdomainNotSupported](/reference/structures/errors.md#subdomainnotsupported)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidDomain](/reference/structures/errors.md#invaliddomain)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::
