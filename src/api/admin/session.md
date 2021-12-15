# Session Management

These are endpoints that relate to interacting with users' sessions.

## GET /user/:id/sessions

Get a users sessions.

:::details Parameters

- Path

  - `id`

    - The ID of the user who's sessions you want to retrieve.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/1234567890/sessions
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user1234567890/sessions', {
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

  - [List](/reference/structures/data.md#list)<[Session](/reference/structures/data.md#session)>

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidUser](/reference/structures/errors.md#invaliduser)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## GET /user/:id/session/:sid

Get a specific session of a user.

:::details Parameters

- Path

  - `id`

    - The user who owns the session you are requesting.

  - `sid`

    - The session ID you are requesting.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/1234567890/session/1234567890
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/1234567890/session/1234567890', {
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

  - [Session](/reference/structures/data.md#session)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidUser](/reference/structures/errors.md#invaliduser)

  - [SessionMissing](/reference/structures/errors.md#sessionmissing)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::
