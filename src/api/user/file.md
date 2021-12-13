# File Management

These are endpoints that relate to interacting with the files of the user that is associated with the token.

## GET /user/files

Get all files for the authenticated user.

:::details Parameters

- Query

  - `limit` _optional_

    - The number of files returned in the request, the default and max is 50.

  - `offset` _optional_

    - Used to paginate requests, default is no offset.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/files
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/files', {
  credentials: 'include',
  headers: {
    Authorization: 'token'
  }
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [List](/reference/structures/data.md#list)<[File](/reference/structures/data.md#file)>

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## GET /user/file/:id

Get the specified file owned by the authenticated user.

:::details Parameters

- Path

  - `id`

    - The ID of the file.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/file/abcdefghij.txt
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/file/abcdefghij.txt', {
  method: 'GET',
  credentials: 'include',
  headers: {
    Authorization: 'token'
  }
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [File](/reference/structures/data.md#file)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 404 Not Found

  - [InvalidFile](/reference/structures/errors.md#invalidfile)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /user/file/:id

Delete the specified file owned by the authenticated user.

:::details Parameters

- Path

  - `id`

    - The ID of the file.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/file/abcdefghij.txt
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/file/abcdefghij.txt', {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    Authorization: 'token'
  }
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [File](/reference/structures/data.md#file)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 404 Not Found

  - [InvalidFile](/reference/structures/errors.md#invalidfile)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /user/files

Bulk-delete the list of files that are owned by the authenticated user provided.

:::details Parameters

- Body

  - `files`

    - An array of the desired files you want to delete.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"files\":[\"abcdefghij.txt\",\"klmnopqrst.txt\"]}" \
  https://alekeagle.me/api/user/files
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/files', {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ files: ['abcdefghij.txt', 'klmnopqrst.txt'] })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [DeleteBulk](/reference/structures/data.md#deletebulk)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /user/files/all

Bulk-delete all files owned by the authenticated user.

:::danger Dangerous Endpoint
Calling this endpoint can result in a mass loss of data, and there is no conformation. Be careful!
:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/files/all
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/files/all', {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    Authorization: 'token'
  }
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [DeleteBulk](/reference/structures/data.md#deletebulk)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::
