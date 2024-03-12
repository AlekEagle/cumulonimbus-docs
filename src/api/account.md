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

Fetches a user by their ID. Fetching other users requires the `staff` permission.

**Parameters**

| Name | Type   | Location | Required | Description                     |
| ---- | ------ | -------- | -------- | ------------------------------- |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) |

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
- 404 Not Found
  - [NotFound](/reference/errors#notfound)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/username

Updates a user's username. Updating other users' usernames requires the `staff` permission.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name       | Type   | Location | Required                      | Description                                                               |
| ---------- | ------ | -------- | ----------------------------- | ------------------------------------------------------------------------- |
| `id`       | string | path     | Yes                           | The [User's ID](/api/#user-ids)                                           |
| `password` | string | body     | If modifying the current user | The user's current password. Must be no more than 64 characters in length |
| `username` | string | body     | Yes                           | The user's new username. Must be between 1 and 64 characters in length    |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"username": "alekeagle", "password": "password"}' \
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
  body: JSON.stringify({ username: 'alekeagle', password: 'password' }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidUsername](/reference/errors#invalidusername)
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/email

Updates a user's email. Your email will need to ve reverified. Updating other users' emails requires the `staff` permission.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`
- `ACCOUNT_EMAIL_VERIFY(3)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name       | Type   | Location | Required                      | Description                                                               |
| ---------- | ------ | -------- | ----------------------------- | ------------------------------------------------------------------------- |
| `id`       | string | path     | Yes                           | The [User's ID](/api/#user-ids)                                           |
| `password` | string | body     | If modifying the current user | The user's current password. Must be no more than 64 characters in length |
| `email`    | string | body     | Yes                           | The user's new email. Must be a valid email address                       |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"email": "waycoolemail@waycooldomain.biz", "password": "password"}' \
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
    password: 'password',
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
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/verify

Verifies a user's email. Verifying other users' emails requires the `staff` permission.

**Parameters**

| Name    | Type   | Location | Required                              | Description                     |
| ------- | ------ | -------- | ------------------------------------- | ------------------------------- |
| `id`    | string | path     | Yes                                   | The [User's ID](/api/#user-ids) |
| `token` | string | body     | If verifying the current users' email | The verification token          |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"token": "1234567890123456789012345678901234567890123456789012345678901234"}' \
https://alekeagle.me/api/users/me/verify
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/user/me/verify', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
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
  - [User](/reference/structures#user)
- 400 Bad Request
  - [InvalidVerificationToken](/reference/errors#invalidverificationtoken)
  - [MissingFields](/reference/errors#missingfields)
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/:id/verify

Unverifies a user's email.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
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
https://alekeagle.me/api/users/1234567890123/verify
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/verify', {
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
  - [EmailNotVerified](/reference/errors#emailnotverified)
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /users/:id/verify

Resend a user's verification email. Resending other users' verification emails requires the `staff` permission.

::: warning Ratelimit
This endpoint uses a ratelimit that is separate from the rest of the API. This ratelimit is 1 request per 5 minutes per IP address.
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

- 201 OK
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/password

Updates a user's password. Updating other users' passwords requires the `staff` permission.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name                 | Type   | Location | Required                      | Description                                                                        |
| -------------------- | ------ | -------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `id`                 | string | path     | Yes                           | The [User's ID](/api/#user-ids)                                                    |
| `password`           | string | body     | If modifying the current user | The user's current password. Must be no more than 64 characters in length          |
| `newPassword`        | string | body     | Yes                           | The user's new password. Must be no more than 64 characters in length              |
| `confirmNewPassword` | string | body     | Yes                           | The user's new password confirmation. Must be no more than 64 characters in length |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{ "password": "password", "newPassword": "password1", "confirmNewPassword": "password1"}' \
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
    password: 'password',
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/staff

Grants a specified user staff permissions.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name | Type   | Location | Required | Description                                                              |
| ---- | ------ | -------- | -------- | ------------------------------------------------------------------------ |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) (`me` is not accepted for this endpoint) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/1234567890123/staff
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/staff', {
  method: 'PUT',
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
  - [MissingFields](/reference/errors#missingfields)
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/:id/staff

Revokes a specified user's staff permissions.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name | Type   | Location | Required | Description                                                              |
| ---- | ------ | -------- | -------- | ------------------------------------------------------------------------ |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) (`me` is not accepted for this endpoint) |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/1234567890123/staff
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/staff', {
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
  - [MissingFields](/reference/errors#missingfields)
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/ban

Bans a user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name | Type   | Location | Required | Description                                                              |
| ---- | ------ | -------- | -------- | ------------------------------------------------------------------------ |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) (`me` is not accepted for this endpoint) |
| `reason` | string | body     | Yes       | The reason for banning the user accounts. |

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
    Authorization:
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    reason: "Hurt my feel goods :("
  }),
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
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/:id/ban

Unbans a user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name | Type   | Location | Required | Description                                                              |
| ---- | ------ | -------- | -------- | ------------------------------------------------------------------------ |
| `id` | string | path     | Yes      | The [User's ID](/api/#user-ids) (`me` is not accepted for this endpoint) |

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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /users/:id/domain

Sets a user's domain and subdomain. Updating other users' domain and subdomain requires the `staff` permission.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
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
-d '{"domain": "alekeagle.me", "subdomain": "you-should-use"}' \
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
    domain: 'alekeagle.me',
    subdomain: 'you-should-use',
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
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/:id

Deletes a user. Deleting other users requires the `staff` permission.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_DELETE(2)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name       | Type   | Location | Required                               | Description                             |
| ---------- | ------ | -------- | -------------------------------------- | --------------------------------------- |
| `id`       | string | path     | Yes                                    | The [User's ID](/api/#user-ids)         |
| `username` | string | body     | If the user is deleting their own user | The user's username to confirm deletion |
| `password` | string | body     | If the user is deleting their own user | The user's password to confirm deletion |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"username": "alekeagle", "password": "password"}' \
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
  - [InvalidUsername](/reference/errors#invalidusername)
  - [InvalidPassword](/reference/errors#invalidpassword)
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users

Delete multiple users. Deleting users requires the `staff` permission.

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
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)
