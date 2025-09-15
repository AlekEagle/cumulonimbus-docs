# Utility Endpoints

## GET /loglevel

Get the current log level of the server.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

There are no parameters for this endpoint.

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
"https://alekeagle.me/api/loglevel"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/loglevel', {
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
  - [LogLevel](/reference/structures.md#loglevel)
- 401 Unauthorized
  - [InvalidSession](/reference/errors.md#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors.md#banned)
  - [InsufficientPermissions](/reference/errors.md#insufficientpermissions)
- 429 Too Many Requests
  - [RateLimited](/reference/errors.md#ratelimited)
- 500 Internal Server Error
  - [InternalServerError](/reference/errors.md#internalservererror)

## PATCH /loglevel

Change the log level of the server.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_MODIFY_LOGLEVEL`](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name   | Type   | Location | Required | Description                                                      |
| ------ | ------ | -------- | -------- | ---------------------------------------------------------------- |
| `name` | string | body     | Yes      | The name of the [LogLevel](/reference/#log-levels) to change to. |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PATCH \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"name":"DEBUG"}' \
"https://alekeagle.me/api/loglevel"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/loglevel', {
  method: 'PATCH',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'DEBUG' }),
});
```

:::

**Responses**

- 200 OK
  - [Success](/reference/structures.md#loglevel)
- 400 Bad Request
  - [InvalidLogLevel](/reference/errors.md#invalidloglevel)
  - [MissingFields](/reference/errors.md#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors.md#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors.md#banned)
  - [InsufficientPermissions](/reference/errors.md#insufficientpermissions)
- 429 Too Many Requests
  - [RateLimited](/reference/errors.md#ratelimited)
- 500 Internal Server Error
  - [InternalServerError](/reference/errors.md#internalservererror)
