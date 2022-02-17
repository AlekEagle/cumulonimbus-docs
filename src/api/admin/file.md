# File Management

These endpoints are for interacting with files on the server.

## GET /files

Get the files on the server.

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
  https://alekeagle.me/api/files
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/files', {
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

  - [List](/reference/structures/data.md#list)<[File](/reference/structures/data.md#file)>

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## GET /user/:id/files

View a specific user's files.

:::details Parameters

- Path

  - `id`

    - The ID of the user.

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
  https://alekeagle.me/api/user/1234567890/files
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/1234567890/files', {
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

  - [List](/reference/structures/data.md#list)<[File](/reference/structures/data.md#file)>

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidUser](/reference/structures/errors.md#invaliduser)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## GET /file/:id

Get the details of a specific file.

:::details Parameters

- Path

  - `id`

    - The file you want the details of.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  -H "Authorization: token" \
  https://alekeagle.me/api/abcdefghij.txt
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/file/abcdefghij.txt', {
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

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidFile](/reference/structures/errors.md#invalidfile)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /file/:id

Delete a specific file.

:::details Parameters

- Path

  - `id`

    - The file you wish to delete.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  https://alekeagle.me/api/file/abcdefghij.txt
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/file/abcdefghij.txt', {
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

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidFile](/reference/structres/errors.md#invalidfile)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /user/:id/files

Delete all files owned by a user.

:::details Example Requests

<code-group>

  <code-block title="cURL">

    ```sh

    curl -X DELETE \
      -H "Authorization: token" \
      https://alekeagle.me/api/user/1234567890/files

    ```

  </code-block>

  <code-block title="JS Fetch">

    ```js

    fetch('https://alekeagle.me/api/user/1234567890/files', {
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

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidUser](/reference/structures/errors.md#invaliduser)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /files

Bulk delete a list of files.

:::details Parameters

- Body

  - `files`

    - An array of files you want to delete.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"files\": [\"abcdefghij.txt\",\"klmnopqrst.txt\"]}" \
  https://alekeagle.me/api/files
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/files', {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-type': 'application/json'
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

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::
