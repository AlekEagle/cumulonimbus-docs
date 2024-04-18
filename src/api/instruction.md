# Instruction Endpoints

## GET /instructions

Returns a list of all instructions.

**Parameters**

| Name     | Type    | Location | Required | Description                                                                 |
| -------- | ------- | -------- | -------- | --------------------------------------------------------------------------- |
| `limit`  | integer | query    | No       | The maximum number of instructions to return. The default and maximum is 50 |
| `offset` | integer | query    | No       | The offset to start from. The default is 0                                  |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/instructions
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/instructions', {
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
  - [List](/reference/structures#list)<[Instruction](/reference/structures#instruction)>
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /instructions/:id

Returns a single instruction.

**Parameters**

| Name | Type   | Location | Required | Description |
| ---- | ------ | -------- | -------- | ----------- |
| `id` | string | path     | Yes      | The ID      |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/instructions/generic-service
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/instructions/generic-service', {
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
  - [Instruction](/reference/structures#instruction)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidInstruction](/reference/errors#invalidinstruction)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## POST /instructions

Creates a new instruction.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name          | Type     | Location | Required | Description      |
| ------------- | -------- | -------- | -------- | ---------------- |
| `id`          | string   | body     | Yes      | The ID           |
| `name`        | string   | body     | Yes      | The display name |
| `description` | string   | body     | Yes      | The description  |
| `filename`    | string   | body     | No       | The filename     |
| `content`     | string   | body     | Yes      | The file content |
| `steps`       | string[] | body     | Yes      | The steps        |

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"id":"generic-service","name":"Generic Service","description":"A generic service","filename":"generic-service.sh","content":"#!/bin/bash\necho \"Hello, World!\"","steps":["Click me to download the configuration file!", "Run the file provided."]}' \
https://alekeagle.me/api/instructions
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/instructions', {
  method: 'POST',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 'generic-service',
    name: 'Generic Service',
    description: 'A generic service',
    filename: 'generic-service.sh',
    content: '#!/bin/bash\necho "Hello, World!"',
    steps: [
      'Click me to download the configuration file!',
      'Run the file provided.',
    ],
  }),
});
```

:::

**Responses**

- 201 Created
  - [Instruction](/reference/structures#instruction)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidInstruction](/reference/errors#invalidinstruction)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 409 Conflict
  - [InstructionExists](/reference/errors#instructionexists)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /instructions/:id/name

Updates the name of an instruction.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name   | Type   | Location | Required | Description |
| ------ | ------ | -------- | -------- | ----------- |
| `id`   | string | path     | Yes      | The ID      |
| `name` | string | body     | Yes      | The name    |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"name":"Generic Service"}' \
https://alekeagle.me/api/instructions/generic-service/name
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/instructions/generic-service/name', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Generic Service',
  }),
});
```

:::

**Responses**

- 200 OK
  - [Instruction](/reference/structures#instruction)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
  - [InvalidInstruction](/reference/errors#invalidinstruction)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidInstruction](/reference/errors#invalidinstruction)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /instructions/:id/description

Updates the description of an instruction.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name          | Type   | Location | Required | Description     |
| ------------- | ------ | -------- | -------- | --------------- |
| `id`          | string | path     | Yes      | The ID          |
| `description` | string | body     | Yes      | The description |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"description":"A generic service"}' \
https://alekeagle.me/api/instructions/generic-service/description
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/instructions/generic-service/description', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    description: 'A generic service',
  }),
});
```

:::

**Responses**

- 200 OK
  - [Instruction](/reference/structures#instruction)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidInstruction](/reference/errors#invalidinstruction)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /instructions/:id/file

Updates the file of an instruction.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name       | Type   | Location | Required | Description                                     |
| ---------- | ------ | -------- | -------- | ----------------------------------------------- |
| `id`       | string | path     | Yes      | The ID                                          |
| `filename` | string | body     | No       | The filename. Omit to specify clipboard content |
| `content`  | string | body     | Yes      | The content                                     |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"filename":"index.js","content":"console.log(\"Hello, world!\");"}' \
https://alekeagle.me/api/instructions/generic-service/file
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/instructions/generic-service/file', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    filename: 'index.js',
    content: 'console.log("Hello, world!");',
  }),
});
```

:::

**Responses**

- 200 OK
  - [Instruction](/reference/structures#instruction)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidInstruction](/reference/errors#invalidinstruction)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /instructions/:id/steps

Updates the steps of an instruction.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name    | Type     | Location | Required | Description |
| ------- | -------- | -------- | -------- | ----------- |
| `id`    | string   | path     | Yes      | The ID      |
| `steps` | string[] | body     | Yes      | The steps   |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"steps":["Step 1","Step 2","Step 3"]}' \
https://alekeagle.me/api/instructions/generic-service/steps
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/instructions/generic-service/steps', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    steps: ['Step 1', 'Step 2', 'Step 3'],
  }),
});
```

:::

**Responses**

- 200 OK
  - [Instruction](/reference/structures#instruction)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidInstruction](/reference/errors#invalidinstruction)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /api/instructions/:id

Deletes an instruction.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name | Type   | Location | Required | Description |
| ---- | ------ | -------- | -------- | ----------- |
| `id` | string | path     | Yes      | The ID      |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
https://alekeagle.me/api/instructions/generic-service
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/instructions/generic-service', {
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
  - [DeleteInstruction](/reference/successes#deleteinstruction)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidInstruction](/reference/errors#invalidinstruction)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /api/instructions

Deletes multiple instructions.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

**Parameters**

| Name  | Type   | Location | Required | Description |
| ----- | ------ | -------- | -------- | ----------- |
| `ids` | string | body     | Yes      | The IDs     |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"ids": ["generic-service", "generic-service-2"]}' \
https://alekeagle.me/api/instructions
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/instructions', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ ids: ['generic-service', 'generic-service-2'] }),
});
```

:::

**Responses**

- 200 OK
  - [DeleteInstructions](/reference/successes#deleteinstructions)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidInstruction](/reference/errors#invalidinstruction)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)
