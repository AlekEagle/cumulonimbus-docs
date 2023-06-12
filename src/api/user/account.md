# Account Management

These are endpoints that relate to interacting with the account of the user that is associated with the token.

## GET /user

Get the current authenticated user.

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
fetch("https://alekeagle.me/api/user", {
  method: "GET",
  credentials: "include",
  headers: {
    Authorization: "token",
  },
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

## PATCH /user/username

Update the current authenticated user's username.

:::details Parameters

- Body

  - `username`

    - The new username for the account.

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
  -d "{\"username\":\"bob\",\"password\":\"joe\"}" \
  https://alekeagle.me/api/user/username
```

</code-block>

<code-block title="JS Fetch">

```js
fetch("https://alekeagle.me/api/user/username", {
  method: "PATCH",
  credentials: "include",
  headers: {
    Authorization: "token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "bob",
    password: "joe",
  }),
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

  - [InvalidPassword](/reference/structures/errors.md#invalidpassword)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 409 Conflict

  - [UsernameTaken](/reference/structures/errors.md#usernametaken)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## PATCH /user/email

Update the current authenticated user's email.

:::details Parameters

- Body

  - `email`

    - The new email for the account.

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
  -d "{\"email\":\"real@email.biz\",\"password\":\"joe\"}" \
  https://alekeagle.me/api/user/email
```

</code-block>

<code-block title="JS Fetch">

```js
fetch("https://alekeagle.me/api/user/email", {
  method: "PATCH",
  credentials: "include",
  headers: {
    Authorization: "token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "real@email.biz",
    password: "joe",
  }),
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

  - [InvalidPassword](/reference/structures/errors.md#invalidpassword)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 409 Conflict

  - [UserExists](/reference/structures/errors.md#userexists)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## PATCH /user/password

Update the current authenticated user's password.

:::details Parameters

- Body

  - `password`

    - The current password of the account for verification purposes.

  - `newPassword`

    - The new password for the account.

  - `confirmNewPassword`

    - The new password for the account, must match `newPassword` field.

:::

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X PATCH \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"password\":\"joe\",\"newPassword\":\"bob\",\"confirmNewPassword\":\"bob\"}" \
  https://alekeagle.me/api/user/password
```

</code-block>

<code-block title="JS Fetch">

```js
fetch("https://alekeagle.me/api/user/password", {
  method: "PATCH",
  credentials: "include",
  headers: {
    Authorization: "token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    password: "joe",
    newPassword: "bob",
    confirmNewPassword: "bob",
  }),
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

  - [InvalidPassword](/reference/structures/errors.md#invalidpassword)

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
fetch("https://alekeagle.me/api/user", {
  method: "DELETE",
  credentials: "include",
  headers: {
    Authorization: "token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "joe",
    password: "joe",
  }),
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

  - [InvalidUser](/reference/structures/errors.md#invaliduser)

  - [InvalidPassword](/reference/structures/errors.md#invalidpassword)

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
fetch("https://alekeagle.me/api/user", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "joe",
    email: "joe@joe.joe",
    password: "joe",
    repeatPassword: "joe",
    rememberMe: true,
  }),
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

Update the current authenticated user's domain and subdomain selection.

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
fetch("https://alekeagle.me/api/user/domain", {
  method: "PATCH",
  credentials: "include",
  headers: {
    Authorization: "token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ domain: "digiorno.delivery", subdomain: "its not" }),
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
