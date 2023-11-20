# Session Endpoints

## POST /login

Login to Cumulonimbus.

::: warning Ratelimit
This endpoint uses a ratelimit that is separate from the rest of the API. This ratelimit is 3 requests per 3 minutes per IP address. If you try to register an account while providing a session, you will receive an [InvalidSession](/reference/errors#invalidsession) error.
:::

::: tip Custom Session Name
You can provide a custom session name by setting the `X-Session-Name` header. This will override the server's name generated from the user agent.
:::

**Parameters**

| Name         | Type    | Location | Required | Description                              |
| ------------ | ------- | -------- | -------- | ---------------------------------------- |
| `username`   | string  | body     | yes      | The username of the account to login to. |
| `password`   | string  | body     | yes      | The password of the account to login to. |
| `rememberMe` | boolean | body     | no       | Whether or not to remember the session.  |

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST https://alekeagle.me/api/login \
  -H "Content-Type: application/json" \
  -H "X-Session-Name: Way Cool Cumulonimbus Session" \
  -d '{"username": "alekeagle", "password": "password", "rememberMe": true}'
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Session-Name': 'Way Cool Cumulonimbus Session',
  },
  body: JSON.stringify({
    username: 'alekeagle',
    password: 'password',
    rememberMe: true,
  }),
});
```

:::

**Responses**

- 201 Created
  - [SuccessfulAuth](/reference/structures#successfulauth)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [InvalidPassword](/reference/errors#invalidpassword)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## GET /users/:uid/sessions/:sid

Get a session.

**Parameters**

| Name  | Type   | Location | Required | Description                                             |
| ----- | ------ | -------- | -------- | ------------------------------------------------------- |
| `uid` | string | path     | yes      | The [User's ID](/api/#user-ids)                         |
| `sid` | string | path     | yes      | The session ID. Can be `me` to get the current session. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/me/sessions/me
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/me/sessions/me', {
  method: 'GET',
  headers: {
    Authorization:
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
  },
});
```

:::

**Responses**

- 200 OK
  - [Session](/reference/structures#session)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
  - [InvalidSession](/reference/errors#invalidsession)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## GET /users/:uid/sessions

Fetch a list of sessions for a user.

**Parameters**

| Name     | Type   | Location | Required | Description                                                     |
| -------- | ------ | -------- | -------- | --------------------------------------------------------------- |
| `uid`    | string | path     | yes      | The [User's ID](/api/#user-ids)                                 |
| `limit`  | number | query    | no       | The maximum number of sessions to return. (Default and max: 50) |
| `offset` | number | query    | no       | The number of sessions to skip. (Default: 0)                    |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/me/sessions
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/sessions', {
  method: 'GET',
  headers: {
    Authorization:
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
  },
});
```

:::

**Responses**

- 200 OK
  - [List](/reference/structures#list)<[Session](/reference/structures#session)>
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## DELETE /users/:uid/sessions/:sid

Delete a session.

**Parameters**

| Name  | Type   | Location | Required | Description                                             |
| ----- | ------ | -------- | -------- | ------------------------------------------------------- |
| `uid` | string | path     | yes      | The [User's ID](/api/#user-ids)                         |
| `sid` | string | path     | yes      | The session ID. Can be `me` to get the current session. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/me/sessions/me
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/sessions/me', {
  method: 'DELETE',
  headers: {
    Authorization:
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
  },
});
```

:::

**Responses**

- 200 OK
  - [DeleteSession](/reference/successes#deletesession)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
  - [InvalidSession](/reference/errors#invalidsession)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## DELETE /users/:uid/sessions

Delete multiple sessions for a user.

**Parameters**

| Name  | Type     | Location | Required | Description                                                      |
| ----- | -------- | -------- | -------- | ---------------------------------------------------------------- |
| `uid` | string   | path     | yes      | The [User's ID](/api/#user-ids)                                  |
| `ids` | string[] | body     | yes      | The session IDs. Can include `me` to target the current session. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"ids":["me"]}' \
https://alekeagle.me/api/users/me/sessions
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/sessions', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ ids: ['me'] }),
});
```

:::

**Responses**

- 200 OK
  - [DeleteSessions](/reference/successes#deletesessions)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
  - [InvalidSession](/reference/errors#invalidsession)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## DELETE /users/:uid/sessions/all

Delete all sessions for a user.

**Parameters**

| Name           | Type    | Location | Required | Description                                                  |
| -------------- | ------- | -------- | -------- | ------------------------------------------------------------ |
| `uid`          | string  | path     | yes      | The [User's ID](/api/#user-ids)                              |
| `include-self` | boolean | query    | no       | Whether to include the current session. Defaults to `false`. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/me/sessions/all
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/sessions/all', {
  method: 'DELETE',
  headers: {
    Authorization:
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
  },
});
```

:::

**Responses**

- 200 OK
  - [DeleteSessions](/reference/successes#deletesessions)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
