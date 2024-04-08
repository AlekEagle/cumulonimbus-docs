# Second Factor Endpoints

## GET /users/me/2fa

Get a list of second factor methods enabled for the current user.

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`SECOND_FACTOR_READ`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name     | Type   | Location | Required | Description                                                                     |
| -------- | ------ | -------- | -------- | ------------------------------------------------------------------------------- |
| `limit`  | number | query    | No       | The maximum number of second factors to return. The max and default is 50       |
| `offset` | number | query    | No       | The number of second factors to skip before returning results. The default is 0 |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/me/2fa
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/2fa', {
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
  - [List](/reference/structures#list)<[SecondFactor](/reference/structures#secondfactor)>
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [InternalServerError](/reference/errors#internalservererror)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /users/:id/2fa

Get a list of second factor methods enabled for the specified user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_READ_SECOND_FACTORS`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name     | Type   | Location | Required | Description                                                                     |
| -------- | ------ | -------- | -------- | ------------------------------------------------------------------------------- |
| `id`     | string | path     | Yes      | The [User's ID](/api/#user-ids)                                                 |
| `limit`  | number | query    | No       | The maximum number of second factors to return. The max and default is 50       |
| `offset` | number | query    | No       | The number of second factors to skip before returning results. The default is 0 |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/users/1234567890123/2fa
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/2fa', {
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
  - [List](/reference/structures#list)<[SecondFactor](/reference/structures#secondfactor)>
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

## POST /users/me/2fa/totp

Begins the process of registering a new TOTP second factor for the current user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session are not allowed in order to prevent second factors being registered without explicit user consent.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can be found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

This endpoint does not require any parameters.

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"password": "password"}' \
https://alekeagle.me/api/users/me/2fa/totp
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/2fa/totp', {
  method: 'POST',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password: 'password' }),
});
```

:::

**Responses**

- 200 OK
  - [SecondFactorTOTPRegistration](/reference/structures#secondfactortotpregistration)
- 400 Bad Request
  - [InvalidPassword](/reference/errors#invalidpassword)
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

## POST /users/me/2fa/totp/confirm

Completes the process of registering a new TOTP second factor for the current user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session are not allowed in order to prevent second factors being registered without explicit user consent.
:::

**Parameters**

| Name    | Type   | Location | Required | Description                                                                                                  |
| ------- | ------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `token` | string | body     | Yes      | The token returned from [`SecondFactorTOTPRegistration`](/reference/structures#secondfactortotpregistration) |
| `name`  | string | body     | Yes      | The name of the second factor.                                                                               |
| `code`  | string | body     | Yes      | The TOTP code to verify the second factor.                                                                   |

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"token": "token", "name": "name", "code": "123456"}' \
https://alekeagle.me/api/users/me/2fa/totp/confirm
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/2fa/totp/confirm', {
  method: 'POST',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token: 'token', name: 'name', code: '123456' }),
});
```

:::

**Responses**

- 201 Created
  - [SecondFactorRegisterSuccess](/reference/structures#secondfactorregistersuccess)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
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

## POST /users/me/2fa/webauthn

Begins the process of registering a new WebAuthn second factor for the current user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session are not allowed in order to prevent second factors being registered without explicit user consent.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can be found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

This endpoint does not require any parameters.

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"password": "password"}' \
https://alekeagle.me/api/users/me/2fa/webauthn
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/2fa/webauthn', {
  method: 'POST',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password: 'password' }),
});
```

:::

**Responses**

- 200 OK
  - [SecondFactorWebAuthnRegistration](/reference/structures#secondfactorwebauthnregistration)
- 400 Bad Request
  - [InvalidPassword](/reference/errors#invalidpassword)
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

## POST /users/me/2fa/webauthn/confirm

Completes the process of registering a new WebAuthn second factor for the current user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.

:::

::: warning Scoped Session
Requests to this endpoint using a scoped session are not allowed in order to prevent second factors being registered without explicit user consent.
:::

**Parameters**

| Name       | Type   | Location | Required | Description                                                                                                          |
| ---------- | ------ | -------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `token`    | string | body     | Yes      | The token returned from [`SecondFactorWebAuthnRegistration`](/reference/structures#secondfactorwebauthnregistration) |
| `name`     | string | body     | Yes      | The name of the second factor.                                                                                       |
| `response` | object | body     | Yes      | The response from the WebAuthn registration.                                                                         |

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"token": "token", "name": "name", "response": {}}' \
https://alekeagle.me/api/users/me/2fa/webauthn/confirm
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/2fa/webauthn/confirm', {
  method: 'POST',
  headers: {
    'Authorization': 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    token: 'token
    name: 'name',
    response: {}
  }),
});
```

:::

**Responses**

- 201 Created
  - [SecondFactorRegisterSuccess](/reference/structures#secondfactorregistersuccess)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
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

## POST /users/me/2fa/backup

Regenerate backup codes for the current user. You must have at least one second factor enabled to use this endpoint.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session are not allowed in order to prevent second factors being registered without explicit user consent.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can be found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

This endpoint does not require any parameters.

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"password": "password"}' \
https://alekeagle.me/api/users/me/2fa/backup
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/2fa/backup', {
  method: 'POST',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password: 'password' }),
});
```

:::

**Responses**

- 200 OK
  - [SecondFactorBackupRegisterSuccess](/reference/structures#secondfactorbackupregistersuccess)
- 400 Bad Request
  - [InvalidPassword](/reference/errors#invalidpassword)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
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
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/me/2fa/:id

Deletes the specified second factor for the current user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `ACCOUNT_MODIFY(1)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session are not allowed in order to prevent second factors being registered without explicit user consent.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can be found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name | Type   | Location | Required | Description                            |
| ---- | ------ | -------- | -------- | -------------------------------------- |
| `id` | string | path     | Yes      | The ID of the second factor to delete. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"password": "password"}' \
https://alekeagle.me/api/users/me/2fa/1234567890
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/me/2fa/1234567890', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password: 'password' }),
});
```

:::

**Responses**

- 200 OK
  - [SecondFactorDeleteSuccess](/reference/structures#secondfactordeletesuccess)
- 400 Bad Request
  - [InvalidPassword](/reference/errors#invalidpassword)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
  - [SecondFactorChallengeRequired](/reference/errors#secondfactorchallengerequired)
- 403 Forbidden
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidSecondFactor](/reference/errors#invalidsecondfactor)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /users/:uid/2fa/:id

Deletes the specified second factor for the specified user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_SECOND_FACTORS`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can be found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name  | Type   | Location | Required | Description                            |
| ----- | ------ | -------- | -------- | -------------------------------------- |
| `uid` | string | path     | Yes      | The [User's ID](/api/#user-ids)        |
| `id`  | string | path     | Yes      | The ID of the second factor to delete. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"password": "password"}' \
https://alekeagle.me/api/users/1234567890123/2fa/1234567890
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/users/1234567890123/2fa/1234567890', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password: 'password' }),
});
```

:::

**Responses**

- 200 OK
  - [SecondFactorDeleteSuccess](/reference/structures#secondfactordeletesuccess)
- 400 Bad Request
  - [InvalidPassword](/reference/errors#invalidpassword)
  - [InvalidSecondFactorResponse](/reference/errors#invalidsecondfactorresponse)
