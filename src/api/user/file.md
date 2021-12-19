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

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

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

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

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

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

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

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

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

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## POST /upload

Upload data or a file.

:::warning Uploading Files
Uploading Files with proper extensions is only fully supported using `multipart/form-data`, that way, if the server fails to detect what the file type is, it can fall back to the files original extension.
:::

:::danger Max File Size
Unfortunately, the max file size is capped at `100MB`, and in order to raise the limit I need to pay for a paid tier of CloudFlare, if you want to help cover the cost, please support me on [Patreon](https://patreon.com/alekeagle).
:::

:::details Parameters

- Body

  - `file`

    - The file, or any other data, you wish to upload.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X POST \
  -H "Authorization: token" \
  -F file=@Cumulonimbus.svg \
  https://alekeagle.me/api/upload
```

</code-block>

<code-block title="JS Fetch">

```js
const formDataWithFile = new FormData();

fetch('https://alekeagle.me/images/assets/Cumulonimbus.svg').then(res => {
  res.blob().then(tastyBlob => {
    formDataWithFile.append('file', new File([tastyBlob], 'Cumulonimbus.svg'));

    fetch('https://alekeagle.me/api/user/1234567890/session/1234567890', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: 'token'
      },
      body: formDataWithFile
    });
  });
});
```

</code-block>

</code-group>

:::

:::details Responses

- 201 Created

  - [SuccessfulUpload](/reference/structures/data.md#successfulupload)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingifields)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::
