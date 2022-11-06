# Session Management

These are endpoints that relate to interacting with users' sessions.

## GET /user/:id/sessions

Get a users sessions.

:::details Parameters

- Path

  - `id`

    - The ID of the user who's sessions you want to retrieve.

- Query

  - `limit` _optional_

    - The number of domains returned in the request, the default and max is 50.

  - `offset` _optional_

    - Used to paginate requests, default is no offset.

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
fetch('https://alekeagle.me/api/user/1234567890/sessions', {
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

Get a specific session of a specific user.

:::details Parameters

- Path

  - `id`

    - The user who the session belongs to.

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

## DELETE /user/:id/session/:sid

Delete a specific session owned by a specific user.

:::details Parameters

- Path

  - `id`

    - The ID of the user who owns the session.

  - `sid`

    - The ID of the session you want to delete.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/1234567890/session/1234567890
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/1234567890/session/1234567890', {
  method: 'DELETE',
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

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /user/:id/sessions

Bulk delete a list of provided sessions for a given user.

:::details Parameters

- Path

  - `id`

    - The ID of the user who owns the sessions provided.

- Body

  - `sessions`

    - An array of sessions that you wish to be deleted, invalid sessions will be ignored, but still count to the bulk delete limit.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"sessions\":[\"1234567890\",\"0987654321\"]}" \
  https://alekeagle.me/api/user/1234567890/sessions
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/1234567890/sessions', {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ sessions: ['1234567890', '0987654321'] })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [DeleteBulk](/reference/structures/data.md#deletebulk)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

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

## DELETE /user/:id/sessions/all

Bulk delete all of a user's sessions.

:::details Parameters

- Path

  - `id`

    - The ID of the user who's sessions you wish to delete.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/1234567890/sessions/all
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/1234567890/sessions/all', {
  method: 'DELETE',
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

  - [DeleteBulk](/reference/structures/data.md#deletebulk)

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
