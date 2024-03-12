# File Endpoints

## GET /files

Get a list of files. Fetching all files or files owned by another user requires `staff` permissions.

**Parameters**

| Name     | Type   | Location | Required | Description                                                                |
| -------- | ------ | -------- | -------- | -------------------------------------------------------------------------- |
| `limit`  | number | query    | No       | The maximum number of files to return. The default and maximum value is 50 |
| `offset` | number | query    | No       | The offset to start from when returning files. The default value is 0      |
| `uid`    | string | query    | No       | The [User's ID](/api/#user-ids) or blank for all files.                    |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
"https://alekeagle.me/api/files?limit=5&offset=0&uid=me"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files?limit=5&offset=0&uid=me', {
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
  - [List](/reference/structures#list)<[File](/reference/structures#file)>
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

## GET /files/:id

Get a file by its ID. Attempting to fetch a file owned by another user without `staff` permissions will return a 404 error regardless of whether the file exists. This is to prevent users from being able to determine whether a file exists or not.

**Parameters**

| Name | Type   | Location | Required | Description |
| ---- | ------ | -------- | -------- | ----------- |
| `id` | string | path     | Yes      | The file ID |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
"https://alekeagle.me/api/files/abcdefghij.png"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files/abcdefghij.png', {
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
  - [File](/reference/structures#file)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidFile](/reference/errors#invalidfile)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /files/:id/name

Update a file's display name. Attempting to modify a file owned by another user without `staff` permissions will return a 404 error regardless of whether the file exists. This is to prevent users from being able to determine whether a file exists or not.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_MODIFY(6)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name   | Type   | Location | Required | Description          |
| ------ | ------ | -------- | -------- | -------------------- |
| `id`   | string | path     | Yes      | The file ID          |
| `name` | string | body     | Yes      | The new display name |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"name": "My File"}' \
"https://alekeagle.me/api/files/abcdefghij.png/name"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files/abcdefghij.png/name', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'My File',
  }),
});
```

:::

**Responses**

- 200 OK
  - [File](/reference/structures#file)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidFile](/reference/errors#invalidfile)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /files/:id/name

Delete a file's display name. Attempting to modify a file owned by another user without `staff` permissions will return a 404 error regardless of whether the file exists. This is to prevent users from being able to determine whether a file exists or not.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_MODIFY(6)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name | Type   | Location | Required | Description |
| ---- | ------ | -------- | -------- | ----------- |
| `id` | string | path     | Yes      | The file ID |

**Example Requests**

::: code-group

````sh [cURL]
```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
"https://alekeagle.me/api/files/abcdefghij.png/name"
````

```js [JS Fetch]
fetch('https://alekeagle.me/api/files/abcdefghij.png/name', {
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
  - [File](/reference/structures#file)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidFile](/reference/errors#invalidfile)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## PUT /files/:id/extension

Update a file's extension. Attempting to modify a file owned by another user without `staff` permissions will return a 404 error regardless of whether the file exists. This is to prevent users from being able to determine whether a file exists or not.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_MODIFY(6)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Warning
Since the file extension is part of the file's ID, changing the extension will change the file's ID. This means that any links to the file will no longer work.
:::

::: tip Note
When a file's extension is changed, it is logged to the server's logs, that way staff can use this information to help improve the file type detection.
:::

**Parameters**

| Name        | Type   | Location | Required | Description            |
| ----------- | ------ | -------- | -------- | ---------------------- |
| `id`        | string | path     | Yes      | The file ID            |
| `extension` | string | body     | Yes      | The new file extension |

**Example Requests**

::: code-group

```sh [cURL]
curl -X PUT \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"extension": "png"}' \
"https://alekeagle.me/api/files/abcdefghij.png/extension"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files/abcdefghij.png/extension', {
  method: 'PUT',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    extension: 'png',
  }),
});
```

:::

**Responses**

- 200 OK
  - [File](/reference/structures#file)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidFile](/reference/errors#invalidfile)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /files/:id

Delete a file. Attempting to delete a file owned by another user without `staff` permissions will return a 404 error regardless of whether the file exists. This is to prevent users from being able to determine whether a file exists or not.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_DELETE(7)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name | Type   | Location | Required | Description |
| ---- | ------ | -------- | -------- | ----------- |
| `id` | string | path     | Yes      | The file ID |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
"https://alekeagle.me/api/files/abcdefghij.png"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files/abcdefghij.png', {
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
  - [DeleteFile](/reference/successes#deletefile)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidFile](/reference/errors#invalidfile)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /files

Delete multiple files. Attempting to delete a file owned by another user without `staff` permissions will return a 404 error regardless of whether the file exists. This is to prevent users from being able to determine whether a file exists or not.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_DELETE(7)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name  | Type   | Location | Required | Description  |
| ----- | ------ | -------- | -------- | ------------ |
| `ids` | string | body     | Yes      | The file IDs |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"ids":["abcdefghij.png","klmnopqrst.png"]}' \
"https://alekeagle.me/api/files"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ids: ['abcdefghij.png', 'klmnopqrst.png'],
  }),
});
```

:::

**Responses**

- 200 OK
  - [DeleteFiles](/reference/successes#deletefiles)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
- 404 Not Found
  - [InvalidFile](/reference/errors#invalidfile)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## DELETE /files/all

Deletes all files owned by the user specified.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_DELETE(7)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

**Parameters**

| Name       | Type   | Location | Required                                                   | Description         |
| ---------- | ------ | -------- | ---------------------------------------------------------- | ------------------- |
| `user`     | string | query    | Yes                                                        | The user ID         |
| `password` | string | body     | If the user is deleting their own files, this is required. | The user's password |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"password":"password"}' \
"https://alekeagle.me/api/files/all?user=me"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files/all', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    password: 'password',
  }),
});
```

:::

**Responses**

- 200 OK
  - [DeleteFiles](/reference/successes#deletefiles)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
  - [InvalidPassword](/reference/errors#invalidpassword)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [InsufficientPermissions](/reference/errors#insufficientpermissions)
- 404 Not Found
  - [InvalidUser](/reference/errors#invaliduser)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## POST /upload

Uploads a file to the server.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_CREATE(5)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: danger Email Verification Requirement
A verified email is required to upload files.
:::

**Parameters**

| Name   | Type | Location | Required | Description |
| ------ | ---- | -------- | -------- | ----------- |
| `file` | file | body     | Yes      | The file    |

::: warning Request Content-Type
To upload a file, you must use the `multipart/form-data` content type.
:::

**Example Requests**

::: code-group

```sh [cURL]
curl -X POST \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-F "file=@/path/to/file.png" \
"https://alekeagle.me/api/upload"
```

```js [JS Fetch]
const formData = new FormData();
formData.append('file', file);

fetch('https://alekeagle.me/api/upload', {
  method: 'POST',
  headers: {
    Authorization:
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
  },
  body: formData,
});
```

:::

**Responses**

- 201 Created
  - [SuccessfulUpload](/reference/structures#successfulupload)
- 400 Bad Request
  - [MissingFields](/reference/errors#missingfields)
- 401 Unauthorized
  - [InvalidSession](/reference/errors#invalidsession)
- 403 Forbidden
  - [Banned](/reference/errors#banned)
  - [EmailNotVerified](/reference/errors#emailnotverified)
- 413 Payload Too Large
  - [BodyTooLarge](/reference/errors#bodytoolarge)
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)
