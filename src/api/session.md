# Session Endpoints

## POST /login

Login to Cumulonimbus.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_LOGIN(4)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Ratelimit
This endpoint uses a ratelimit that is separate from the rest of the API. This ratelimit is 3 requests per 3 minutes per IP address. If you try to register an account while providing a session, you will receive an [InvalidSession](/reference/errors#invalidsession) error.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.

**Username and password do NOT need to be resupplied when responding to a second factor challenge, only `rememberMe`.**
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
curl -X POST \
-H "Content-Type: application/json" \
-d '{"username": "alekeagle", "password": "password", "rememberMe": true}' \
https://alekeagle.me/api/login
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
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
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [InvalidPassword](/reference/errors#invalidpassword)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## POST /users/me/sessions

Create a scoped session with specific scopes.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`
- `ACCOUNT_LOGIN(4)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session are not allowed in order to prevent additional sessions to be created without explicit user consent.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name              | Type    | Location | Required | Description                                                                                  |
| ----------------- | ------- | -------- | -------- | -------------------------------------------------------------------------------------------- |
| `name`            | string  | body     | Yes      | A friendly name to give the scoped session.                                                  |
| `permissionFlags` | number  | body     | Yes      | The [session scopes](/reference/#session-scopes) you'd like to grant to this scoped session. |
| `longLived`       | boolean | body     | No       | Whether you would like this session to last 24 hours or 10 years.                            |

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"name":"Upload Only Token", "permissionFlags": 2, "longLived": true}' \
https://alekeagle.me/api/users/me/sessions
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/sessions', {
  method: 'POST',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Upload Only Token',
    permissionFlags: 2
    longLived: true
  }),
});
```

:::

**Responses**

- 201 Created
  - [ScopedSessionCreate](/reference/structures#scopedsessioncreate)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /users/me/sessions/:sid

Get a session of the current user.

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`SESSION_READ`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name  | Type   | Location | Required | Description                                             |
| ----- | ------ | -------- | -------- | ------------------------------------------------------- |
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
  - [InvalidSession](/reference/errors#invalidsession)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /users/:uid/sessions/:sid

Get a session of a specified user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_READ_SESSIONS`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name  | Type   | Location | Required | Description                     |
| ----- | ------ | -------- | -------- | ------------------------------- |
| `uid` | string | path     | yes      | The [User's ID](/api/#user-ids) |
| `sid` | string | path     | yes      | The session ID.                 |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/1234567890123/sessions/1234567890
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/1234567890123/sessions/1234567890', {
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
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
  - [InvalidSession](/reference/errors#invalidsession)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /users/me/sessions

Fetch a list of sessions for the current user.

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`SESSION_READ`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name     | Type   | Location | Required | Description                                                     |
| -------- | ------ | -------- | -------- | --------------------------------------------------------------- |
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
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /users/:uid/sessions

Fetch a list of sessions for the specified user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_READ_SESSIONS`](/reference/#session-scopes) scope.
:::

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
https://alekeagle.me/api/users/1234567890123/sessions
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/sessions', {
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/me/sessions/:sid

Delete a specified session for the current account.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(2)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`SESSION_MODIFY`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name  | Type   | Location | Required | Description                                                |
| ----- | ------ | -------- | -------- | ---------------------------------------------------------- |
| `sid` | string | path     | yes      | The session ID. Can be `me` to delete the current session. |

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
  - [InvalidSession](/reference/errors#invalidsession)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/:uid/sessions/:sid

Delete a session.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_SESSIONS`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name  | Type   | Location | Required | Description                     |
| ----- | ------ | -------- | -------- | ------------------------------- |
| `uid` | string | path     | yes      | The [User's ID](/api/#user-ids) |
| `sid` | string | path     | yes      | The session ID.                 |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/1234567890123/sessions/1234567890
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/sessions/1234567890', {
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
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/me/sessions

Delete multiple sessions for the current user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(2)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`SESSION_MODIFY`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name  | Type     | Location | Required | Description                                                      |
| ----- | -------- | -------- | -------- | ---------------------------------------------------------------- |
| `ids` | string[] | body     | yes      | The session IDs. Can include `me` to delete the current session. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"ids":["me", "1234567890"]}' \
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
  body: JSON.stringify({ ids: ['me', '1234567890'] }),
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/:uid/sessions

Delete multiple sessions for the specified user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_SESSIONS`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name  | Type     | Location | Required | Description                     |
| ----- | -------- | -------- | -------- | ------------------------------- |
| `uid` | string   | path     | yes      | The [User's ID](/api/#user-ids) |
| `ids` | string[] | body     | yes      | The session IDs.                |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"ids":["1234567890"]}' \
https://alekeagle.me/api/users/1234567890123/sessions
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/sessions', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ ids: ['1234567890'] }),
});
```

:::

**Responses**

- 200 OK
  - [DeleteSessions](/reference/successes#deletesessions)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
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

## DELETE /users/me/sessions/all

Delete all sessions for the current user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(2)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`SESSION_MODIFY`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name           | Type    | Location | Required | Description                                                  |
| -------------- | ------- | -------- | -------- | ------------------------------------------------------------ |
| `include-self` | boolean | query    | no       | Whether to include the current session. Defaults to `false`. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/me/sessions/all?include-self=true
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/sessions/all?include-self=true', {
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
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/:uid/sessions/all

Delete all sessions for the specified user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_SESSIONS`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name  | Type   | Location | Required | Description                     |
| ----- | ------ | -------- | -------- | ------------------------------- |
| `uid` | string | path     | yes      | The [User's ID](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/1234567890123/sessions/all
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/sessions/all', {
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
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [Ratelimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)
