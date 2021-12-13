# Account Management

These are endpoints that relate to viewing or modifying the user specified in the request.

## GET /users

Get all users on the server.

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
  https://alekeagle.me/api/users
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/users', {
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

  - [List](/refrerence/structures/data.md#list)<[User](/reference/structures/data.md#user)>

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Permissions](/reference/structures/errors.md#permissions)

  - [Banned](/reference/structures/errors.md#banned)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::
