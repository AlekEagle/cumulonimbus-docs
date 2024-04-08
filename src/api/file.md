# File Endpoints

## GET /files

Fetch all files stored on Cumulonimbus.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_READ_FILES`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name     | Type   | Location | Required | Description                                                                |
| -------- | ------ | -------- | -------- | -------------------------------------------------------------------------- |
| `limit`  | number | query    | No       | The maximum number of files to return. The default and maximum value is 50 |
| `offset` | number | query    | No       | The offset to start from when returning files. The default value is 0      |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
"https://alekeagle.me/api/files?limit=5&offset=0"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files?limit=5&offset=0', {
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
- 429 Too Many Requests
  - [RateLimited](/reference/errors#ratelimited)
- 500 Internal Server Error
  - [Internal](/reference/errors#internal)
- 503 Service Unavailable
  - [ServiceUnavailable](/reference/errors#serviceunavailable)

## GET /files?uid=:id

Fetch files owned by the specified user.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`STAFF_READ_FILES`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name     | Type   | Location | Required | Description                                                                |
| -------- | ------ | -------- | -------- | -------------------------------------------------------------------------- |
| `limit`  | number | query    | No       | The maximum number of files to return. The default and maximum value is 50 |
| `offset` | number | query    | No       | The offset to start from when returning files. The default value is 0      |
| `uid`    | string | query    | Yes      | The [User's ID](/api/#user-ids).                                           |

**Example Requests**

::: code-group

```sh [cURL]
curl -X GET \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
"https://alekeagle.me/api/files?limit=5&offset=0&uid=1234567890123"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files?limit=5&offset=0&uid=1234567890123', {
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

## GET /files?uid=me

Fetch files owned by the authenticated user.

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`FILE_READ`](/reference/#session-scopes) scope.
:::

**Parameters**

| Name     | Type   | Location | Required | Description                                                                |
| -------- | ------ | -------- | -------- | -------------------------------------------------------------------------- |
| `limit`  | number | query    | No       | The maximum number of files to return. The default and maximum value is 50 |
| `offset` | number | query    | No       | The offset to start from when returning files. The default value is 0      |
| `uid`    | string | query    | Yes      | Must be the string `me`.                                                   |

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

Get a file by its ID. Attempting to fetch a file owned by another user without `staff` permissions or scoped sessions without the proper scopes will return a 404 error regardless of whether the file exists. This is to prevent scraping via the API.

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`FILE_READ` (`STAFF_READ_FILES` for staff)](/reference/#session-scopes) scope.
:::

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

Update a file's display name. Attempting to modify a file owned by another user without `staff` permissions or scoped sessions without the proper scopes will return a 404 error regardless of whether the file exists. This is to prevent scraping via the API.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_MODIFY(6)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`FILE_MODIFY` (`STAFF_MODIFY_FILES` for staff)](/reference/#session-scopes) scope.
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

Delete a file's display name. Attempting to modify a file owned by another user without `staff` permissions or scoped sessions without the proper scopes will return a 404 error regardless of whether the file exists. This is to prevent scraping via the API.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_MODIFY(6)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`FILE_MODIFY` (`STAFF_MODIFY_FILES` for staff)](/reference/#session-scopes) scope.
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

Update a file's extension. Attempting to modify a file owned by another user without `staff` permissions or scoped sessions without the proper scopes will return a 404 error regardless of whether the file exists. This is to prevent scraping via the API.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_MODIFY(6)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`FILE_MODIFY` (`STAFF_MODIFY_FILES` for staff)](/reference/#session-scopes) scope.
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

Delete a file. Attempting to delete a file owned by another user without `staff` permissions or scoped sessions without the proper scopes will return a 404 error regardless of whether the file exists. This is to prevent scraping via the API.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_DELETE(7)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`FILE_MODIFY` (`STAFF_MODIFY_FILES` for staff)](/reference/#session-scopes) scope.
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

Delete multiple files. Attempting to delete files owned by another user without `staff` permissions will have them removed from the list of files to be deleted. Scoped sessions missing the required scope will receive 403 forbidden.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_DELETE(7)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`FILE_MODIFY` (`STAFF_MODIFY_FILES` for staff)](/reference/#session-scopes) scope.
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

Deletes all files owned by the authenticated user.

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_DELETE(7)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`FILE_MODIFY` (`STAFF_MODIFY_FILES` for staff)](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

There are no parameters for this endpoint.

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
"https://alekeagle.me/api/files/all"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files/all', {
  method: 'DELETE',
  headers: {
    'Authorization':
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}),
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

## DELETE /files/all?uid=me

Equivalent to [`DELETE /files/all`](#delete-files-all)

## DELETE /files/all?uid=:id

Deletes all files owned by the user specified.

::: warning Non-Public Endpoint
This endpoint is not public and requires authentication of a user with `staff` permissions.
:::

::: warning Kill Switch Behavior
This endpoint is affected by the following [kill switches](/reference/#kill-switches):

- `FILE_DELETE(7)`

and will fail with the error [ServiceUnavailable](/reference/errors#serviceunavailable) if any of these kill switches are enabled.
:::

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`FILE_MODIFY` (`STAFF_MODIFY_FILES` for staff)](/reference/#session-scopes) scope.
:::

::: warning Identity Reverification
This endpoint will require you to provide your password to confirm it's you. More information can found in the [Identity Reverification](/reference/#identity-reverification) section.
:::

**Parameters**

| Name  | Type   | Location | Required | Description                      |
| ----- | ------ | -------- | -------- | -------------------------------- |
| `uid` | string | query    | Yes      | The [User's ID](/api/#user-ids). |

**Example Requests**

::: code-group

```sh [cURL]
curl -X DELETE \
-H "Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q" \
-H "Content-Type: application/json" \
-d '{"password":"password"}' \
"https://alekeagle.me/api/files/all?uid=me"
```

```js [JS Fetch]
fetch('https://alekeagle.me/api/files/all?uid=me', {
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

::: warning Scoped Session
Requests to this endpoint using a scoped session require the session to have the [`UPLOAD_FILE`](/reference/#session-scopes) scope.
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
