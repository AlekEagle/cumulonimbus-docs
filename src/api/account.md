# Account Endpoints

## POST /register

Register a new user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_CREATE(0)`
- `ACCOUNT_EMAIL_VERIFY(3)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Ratelimit
This endpoint uses a ratelimit that is separate from the rest of the API. This ratelimit is 1 request per 30 minutes per IP address. If you try to register an account while providing a session, you will receive an [InvalidSession](/reference/errors#invalidsession) error.
:::

**Parameters**

| Name              | Type    | Location | Required | Description                                   |
| ----------------- | ------- | -------- | -------- | --------------------------------------------- |
| `username`        | string  | body     | Yes      | The new user's username                       |
| `email`           | string  | body     | Yes      | The new user's email                          |
| `password`        | string  | body     | Yes      | The new user's password                       |
| `confirmPassword` | string  | body     | Yes      | The new user's password confirmation          |
| `rememberMe`      | boolean | body     | No       | Whether or not to remember the user's session |

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST \
-H "Content-Type: application/json" \
-d '{"username": "alekeagle", "email": "waycoolemail@waycooldomain.biz", "password": "password", "confirmPassword": "password", "rememberMe": true}' \
https://alekeagle.me/api/register
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'alekeagle',
    email: 'waycoolemail@waycooldomain.biz',
    password: 'password',
    confirmPassword: 'password',
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
  - [InvalidUsername](/reference/errors#invalidusername)
  - [InvalidEmail](/reference/errors#invalidemail)
  - [PasswordsDoNotMatch](/reference/errors#passwordsdonotmatch)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 409 Conflict
  - [UserExists](/reference/errors#userexists)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /users

Fetches a list of users.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_READ_ACCOUNTS`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name     | Type   | Location | Required | Description                                                            |
| -------- | ------ | -------- | -------- | ---------------------------------------------------------------------- |
| `limit`  | number | query    | No       | The maximum number of users to return. The max and default is 50       |
| `offset` | number | query    | No       | The number of users to skip before returning results. The default is 0 |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users', {
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
  - [List](/reference/structures#list)<[User](/reference/structures#user)>
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## GET /users/me

Fetches the current user.

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`ACCOUNT_READ`](/reference/#session-scopes) scope.
:::

**Parameters**

There are no parameters for this endpoint.

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/me
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me', {
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
  - [User](/reference/structures#user)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /users/:id

Fetches a user by their ID.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_READ_ACCOUNTS`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name | Type   | Location | Required | Description                     |
| ---- | ------ | -------- | -------- | ------------------------------- |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/1234567890123
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123', {
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
  - [User](/reference/structures#user)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/me/username

Updates the current user's username.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`ACCOUNT_MODIFY`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide at least your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name       | Type   | Location | Required | Description                                                            |
| ---------- | ------ | -------- | -------- | ---------------------------------------------------------------------- |
| `username` | string | body     | Yes      | The user's new username. Must be between 1 and 64 characters in length |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"username": "alekeagle"}' \
https://alekeagle.me/api/users/me/username
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/username', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: 'alekeagle' }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidUsername](/reference/errors#invalidusername)
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 409 Conflict
  - [UserExists](/reference/errors#userexists)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/username

Updates another user's username.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide at least your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name       | Type   | Location | Required | Description                                                            |
| ---------- | ------ | -------- | -------- | ---------------------------------------------------------------------- |
| `id`       | string | path     | Yes      | The [User's ID](/api/#user-ids)                                        |
| `username` | string | body     | Yes      | The user's new username. Must be between 1 and 64 characters in length |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"username": "alekeagle"}' \
https://alekeagle.me/api/users/1234567890123/username
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/username', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: 'alekeagle' }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidUsername](/reference/errors#invalidusername)
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 409 Conflict
  - [UserExists](/reference/errors#userexists)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/me/email

Updates the current user's email. You will need to verify your new email address.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`
- `ACCOUNT_EMAIL_VERIFY(3)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`ACCOUNT_MODIFY`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide at least your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name    | Type   | Location | Required | Description                                         |
| ------- | ------ | -------- | -------- | --------------------------------------------------- |
| `email` | string | body     | Yes      | The user's new email. Must be a valid email address |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"email": "waycoolemail@waycooldomain.biz"}' \
https://alekeagle.me/api/users/me/email
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/email', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'waycoolemail@waycooldomain.biz',
  }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidEmail](/reference/errors#invalidemail)
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 409 Conflict
  - [UserExists](/reference/errors#userexists)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/email

Updates another user's email.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide at least your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name    | Type   | Location | Required | Description                                         |
| ------- | ------ | -------- | -------- | --------------------------------------------------- |
| `id`    | string | path     | Yes      | The [User's ID](/api/#user-ids)                     |
| `email` | string | body     | Yes      | The user's new email. Must be a valid email address |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"email": "waycoolemail@waycooldomain.biz"}' \
https://alekeagle.me/api/users/1234567890123/email
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/email', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'waycoolemail@waycooldomain.biz',
  }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidEmail](/reference/errors#invalidemail)
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 409 Conflict
  - [UserExists](/reference/errors#userexists)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/verify

Verifies a user's email using the token sent to their email.

::: info Authorization Not Required
This endpoint does not require an authorization header.
:::

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`
- `ACCOUNT_EMAIL_VERIFY(3)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name    | Type   | Location | Required | Description                               |
| ------- | ------ | -------- | -------- | ----------------------------------------- |
| `token` | string | body     | Yes      | The verification token received via email |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Content-Type: application/json" \
-d '{"token": "1234567890123456789012345678901234567890123456789012345678901234"}' \
https://alekeagle.me/api/users/verify
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/verify', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    token: '1234567890123456789012345678901234567890123456789012345678901234',
  }),
});
```

:::

**Responses**

- 200 OK
  - [VerifyEmail](/reference/successes#verifyemail)
- 400 Bad Request
  - [InvalidVerificationToken](/reference/errors#invalidverificationtoken)
  - [MissingFields](/reference/errors#missingfields)
  - [EmailAlreadyVerified](/reference/errors#emailalreadyverified)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/verify

Verifies another user's email.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide at least your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name | Type   | Location | Required | Description                     |
| ---- | ------ | -------- | -------- | ------------------------------- |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
https://alekeagle.me/api/users/1234567890123/verify
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/verify', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [EmailAlreadyVerified](/reference/errors#emailalreadyverified)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## DELETE /users/:id/verify

Removes the verified email flag from a user's account.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name | Type   | Location | Required | Description                     |
| ---- | ------ | -------- | -------- | ------------------------------- |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
https://alekeagle.me/api/users/1234567890123/verify
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/verify', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [EmailNotVerified](/reference/errors#emailnotverified)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## GET /users/me/verify

Resend the current user's verification email.

::: warning Ratelimit
This endpoint uses a ratelimit that is separate from the rest of the API. This ratelimit is 1 request per 5 minutes per IP address.
:::

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`
- `ACCOUNT_EMAIL_VERIFY(3)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`ACCOUNT_MODIFY`](/reference/#session-scopes) scope.
:::

**Parameters**

There are no parameters for this endpoint.

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/me/verify
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/verify', {
  method: 'GET',
  headers: {
    Authorization:
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
  },
});
```

:::

**Responses**

- 201 Created
  - [SendVerificationEmail](/reference/successes#sendverificationemail)
- 400 Bad Request
  - [EmailAlreadyVerified](/reference/errors#emailalreadyverified)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /users/:id/verify

Resend another user's verification email.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name | Type   | Location | Required | Description                     |
| ---- | ------ | -------- | -------- | ------------------------------- |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/1234567890123/verify
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/verify', {
  method: 'GET',
  headers: {
    Authorization:
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
  },
});
```

:::

**Responses**

- 201 Created
  - [SendVerificationEmail](/reference/successes#sendverificationemail)
- 400 Bad Request
  - [EmailAlreadyVerified](/reference/errors#emailalreadyverified)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/me/password

Updates the current user's password.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`ACCOUNT_MODIFY`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name                 | Type   | Location | Required | Description                                                                        |
| -------------------- | ------ | -------- | -------- | ---------------------------------------------------------------------------------- |
| `newPassword`        | string | body     | Yes      | The user's new password. Must be no more than 64 characters in length              |
| `confirmNewPassword` | string | body     | Yes      | The user's new password confirmation. Must be no more than 64 characters in length |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{ "newPassword": "password1", "confirmNewPassword": "password1"}' \
https://alekeagle.me/api/users/me/password
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/password', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    newPassword: 'password1',
    confirmNewPassword: 'password1',
  }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidPassword](/reference/errors#invalidpassword)
  - [MissingFields](/reference/errors#missingfields)
  - [PasswordsDoNotMatch](/reference/errors#passwordsdonotmatch)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/password

Updates another user's password.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name                 | Type   | Location | Required | Description                                                                        |
| -------------------- | ------ | -------- | -------- | ---------------------------------------------------------------------------------- |
| `id`                 | string | path     | Yes      | The [User's ID](/api/#user-ids)                                                    |
| `newPassword`        | string | body     | Yes      | The user's new password. Must be no more than 64 characters in length              |
| `confirmNewPassword` | string | body     | Yes      | The user's new password confirmation. Must be no more than 64 characters in length |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{ "newPassword": "password1", "confirmNewPassword": "password1"}' \
https://alekeagle.me/api/users/1234567890123/password
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/password', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    newPassword: 'password1',
    confirmNewPassword: 'password1',
  }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidPassword](/reference/errors#invalidpassword)
  - [MissingFields](/reference/errors#missingfields)
  - [PasswordsDoNotMatch](/reference/errors#passwordsdonotmatch)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/:id/staff

Promotes a specified user to staff.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name | Type   | Location | Required | Description                     |
| ---- | ------ | -------- | -------- | ------------------------------- |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
https://alekeagle.me/api/users/1234567890123/staff
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/staff', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [UserRequiresSecondFactor](/reference/errors#userrequiressecondfactor)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [InvalidPassword](/reference/errors#invalidpassword)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## DELETE /users/:id/staff

Demotes a specified user from staff.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name | Type   | Location | Required | Description                     |
| ---- | ------ | -------- | -------- | ------------------------------- |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
https://alekeagle.me/api/users/1234567890123/staff
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/staff', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
  - [InvalidPassword](/reference/errors#invalidpassword)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/:id/ban

Bans a user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name     | Type   | Location | Required | Description                                |
| -------- | ------ | -------- | -------- | ------------------------------------------ |
| `id`     | string | path     | Yes      | The [User's ID](/api/#user-ids)            |
| `reason` | string | body     | Yes      | The reason for banning the user's account. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"reason":"Hurt my feel goods :("}' \
https://alekeagle.me/api/users/1234567890123/ban
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/ban', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    reason: 'Hurt my feel goods :(',
  }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## DELETE /users/:id/ban

Unbans a user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name | Type   | Location | Required | Description                     |
| ---- | ------ | -------- | -------- | ------------------------------- |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/1234567890123/ban
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/ban', {
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
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/me/domain

Updates the current user's domain.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`ACCOUNT_MODIFY`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name        | Type   | Location | Required | Description              |
| ----------- | ------ | -------- | -------- | ------------------------ |
| `domain`    | string | body     | Yes      | The user's new domain    |
| `subdomain` | string | body     | No       | The user's new subdomain |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"domain": "example.com", "subdomain": "this-is-an"}' \
https://alekeagle.me/api/users/me/domain
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/domain', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    domain: 'example.com',
    subdomain: 'this-is-an',
  }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [SubdomainTooLong](/reference/errors#subdomaintoolong)
  - [SubdomainNotAllowed](/reference/errors#subdomainnotallowed)
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidDomain](/reference/errors#invaliddomain)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/domain

Updates another user's domain.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name        | Type   | Location | Required | Description                     |
| ----------- | ------ | -------- | -------- | ------------------------------- |
| `id`        | string | path     | Yes      | The [User's ID](/api/#user-ids) |
| `domain`    | string | body     | Yes      | The user's domain               |
| `subdomain` | string | body     | No       | The user's subdomain            |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"domain": "example.com", "subdomain": "this-is-an"}' \
https://alekeagle.me/api/users/1234567890123/domain
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/domain', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    domain: 'example.com',
    subdomain: 'this-is-an',
  }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [SubdomainTooLong](/reference/errors#subdomaintoolong)
  - [SubdomainNotAllowed](/reference/errors#subdomainnotallowed)
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidDomain](/reference/errors#invaliddomain)
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## DELETE /users/me

Deletes the current user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_DELETE(2)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
This endpoint is not accessible using a scoped session. This is to prevent user accounts from being deleted without explicit user consent.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

This endpoint does not require any parameters.

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
https://alekeagle.me/api/users/me
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
});
```

:::

**Responses**

- 200 OK
  - [DeleteUser](/reference/successes#deleteuser)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidPassword](/reference/errors#invalidpassword)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/:id

Deletes a specified user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name | Type   | Location | Required | Description                     |
| ---- | ------ | -------- | -------- | ------------------------------- |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"username": "alekeagle", "password": "password"}' \
https://alekeagle.me/api/users/1234567890123
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'alekeagle',
    password: 'password',
  }),
});
```

:::

**Responses**

- 200 OK
  - [DeleteUser](/reference/successes#deleteuser)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidPassword](/reference/errors#invalidpassword)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## DELETE /users

Delete multiple users.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_ACCOUNTS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name  | Type   | Location | Required | Description                            |
| ----- | ------ | -------- | -------- | -------------------------------------- |
| `ids` | string | body     | Yes      | An array of [User IDs](/api/#user-ids) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"ids": ["1647015028626", "1647015028626"]}' \
https://alekeagle.me/api/users
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ids: ['1647015028626', '1647015028626'],
  }),
});
```

:::

**Responses**

- 200 OK
  - [DeleteUsers](/reference/successes#deleteusers)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidUser](/reference/errors#invaliduser)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
  - [EndpointRequiresSecondFactor](/reference/errors#endpointrequiressecondfactor)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
