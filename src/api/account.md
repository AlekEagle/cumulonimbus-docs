# Account Endpoints

## POST /register

Register a new user.

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
fetch("https://alekeagle.me/api/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "alekeagle",
    email: "waycoolemail@waycooldomain.biz",
    password: "password",
    confirmPassword: "password",
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
fetch("https://alekeagle.me/api/users", {
  method: "GET",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
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
fetch("https://alekeagle.me/api/users/me", {
  method: "GET",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
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

## PUT /users/:id/username

Updates a user's username. Updating other users' usernames requires the `staff` permission.

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
fetch("https://alekeagle.me/api/users/me/username", {
  method: "PUT",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username: "alekeagle", password: "password" }),
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

## PUT /users/:id/email

Updates a user's email. Updating other users' emails requires the `staff` permission.

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
fetch("https://alekeagle.me/api/users/me/email", {
  method: "PUT",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "waycoolemail@waycooldomain.biz",
    password: "password",
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

## PUT /users/:id/password

Updates a user's password. Updating other users' passwords requires the `staff` permission.

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
fetch("https://alekeagle.me/api/users/me/email", {
  method: "PUT",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    password: "password",
    newPassword: "password1",
    confirmNewPassword: "password1",
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
fetch("https://alekeagle.me/api/users/1234567890123/staff", {
  method: "PUT",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
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
fetch("https://alekeagle.me/api/users/1234567890123/staff", {
  method: "DELETE",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
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

## PUT /users/:id/ban

Bans a user.

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
https://alekeagle.me/api/users/1234567890123/ban
```

```js [JS Fetch]
fetch("https://alekeagle.me/api/users/1234567890123", {
  method: "PUT",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
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
fetch("https://alekeagle.me/api/users/1234567890123", {
  method: "DELETE",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
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

## PUT /users/:id/domain

Sets a user's domain and subdomain. Updating the current user's domain and subdomain can be done either by using the current user's 13-digit ID or `me`. Updating other users' domain and subdomain requires the `staff` permission.

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
fetch("https://alekeagle.me/api/users/me/domain", {
  method: "PUT",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    domain: "alekeagle.me",
    subdomain: "you-should-use",
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

## DELETE /users/:id

Deletes a user. Deleting the current user can be done either by using the current user's 13-digit ID or `me`. Deleting other users requires the `staff` permission.

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
fetch("https://alekeagle.me/api/users/me", {
  method: "DELETE",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "alekeagle",
    password: "password",
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
fetch("https://alekeagle.me/api/users", {
  method: "DELETE",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ids: ["1647015028626", "1647015028626"],
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
