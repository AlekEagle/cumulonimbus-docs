# Unprivileged Account Endpoints

## GET /users/me

Fetch the authenticated user's information.

**Parameters**

This endpoint has no parameters.

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
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/me/username

Update the username of the authenticated user.

**Parameters**

| Name     | Type   | Location | Required | Description                 |
| -------- | ------ | -------- | -------- | --------------------------- |
| username | string | body     | Yes      | The new username            |
| password | string | body     | Yes      | The user's current password |

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
  body: JSON.stringify({
    username: "alekeagle",
    password: "password",
  }),
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
  - [InvalidPassword](/reference/errors#invalidpassword)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 409 Conflict
  - [UserExists](/reference/errors#userexists)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/me/email

Update the email of the authenticated user.

**Parameters**

| Name     | Type   | Location | Required | Description                 |
| -------- | ------ | -------- | -------- | --------------------------- |
| email    | string | body     | Yes      | The new email               |
| password | string | body     | Yes      | The user's current password |

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
  - [InvalidPassword](/reference/errors#invalidpassword)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 409 Conflict
  - [UserExists](/reference/errors#userexists)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/me/password

Update the password of the authenticated user.

**Parameters**

| Name               | Type   | Location | Required | Description                          |
| ------------------ | ------ | -------- | -------- | ------------------------------------ |
| password           | string | body     | Yes      | The user's current password          |
| newPassword        | string | body     | Yes      | The user's new password              |
| confirmNewPassword | string | body     | Yes      | The user's new password confirmation |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"password": "password", "newPassword": "newpassword", "confirmNewPassword": "newpassword"}' \
https://alekeagle.me/api/users/me/password
```

```js [JS Fetch]
fetch("https://alekeagle.me/api/users/me/password", {
  method: "PUT",
  headers: {
    Authorization:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    password: "password",
    newPassword: "newpassword",
    confirmNewPassword: "newpassword",
  }),
});
```

:::

**Responses**

- 200 OK
  - [User](/reference/structures#user)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [PasswordsDoNotMatch](/reference/errors#passwordsdonotmatch)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [InvalidPassword](/reference/errors#invalidpassword)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## PUT /users/me/domain

Update the domain and/or subdomain of the authenticated user.

**Parameters**

| Name      | Type   | Location | Required | Description              |
| --------- | ------ | -------- | -------- | ------------------------ |
| domain    | string | body     | Yes      | The user's new domain    |
| subdomain | string | body     | No       | The user's new subdomain |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"domain": "alekeagle.me", "subdomain": "you-should-use"}' \
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
  - [MissingFields](/reference/errors#missingfields)
  - [SubdomainNotAllowed](/reference/errors#subdomainnotallowed)
  - [SubdomainTooLong](/reference/errors#subdomaintoolong)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidDomain](/reference/errors#invaliddomain)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## DELETE /users/me

Delete the authenticated user.

::: danger This action is irreversible!
This action is irreversible and is not reversible by any means. All data associated with the user will be immediately deleted and cannot be recovered.
:::

**Parameters**

| Name     | Type   | Location | Required | Description         |
| -------- | ------ | -------- | -------- | ------------------- |
| username | string | body     | Yes      | The user's username |
| password | string | body     | Yes      | The user's password |

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
  - [UserDeleted](/reference/successes#userdeleted)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [InvalidUsername](/reference/errors#invalidusername)
  - [InvalidPassword](/reference/errors#invalidpassword)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)

## POST /register

Register a new user.

::: warning Ratelimit
This endpoint uses a ratelimit that is separate from the rest of the API. This ratelimit is 1 request per 30 minutes per IP address. If you try to register an account while providing a session, you will receive an [InvalidSession](/reference/errors#invalidsession) error.
:::

**Parameters**

| Name            | Type    | Location | Required | Description                                   |
| --------------- | ------- | -------- | -------- | --------------------------------------------- |
| username        | string  | body     | Yes      | The new user's username                       |
| email           | string  | body     | Yes      | The new user's email                          |
| password        | string  | body     | Yes      | The new user's password                       |
| confirmPassword | string  | body     | Yes      | The new user's password confirmation          |
| rememberMe      | boolean | body     | No       | Whether or not to remember the user's session |

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
