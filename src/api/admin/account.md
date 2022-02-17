# Account Management

These are endpoints that relate to interacting with the user specified in the request.

## GET /users

Get all users on the server.

:::details Parameters

- Query

  - `limit` _optional_

    - The number of users returned in the request, the default and max is 50.

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

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## GET /user/:id

Get info of a specific user.

:::details Parameters

- Path

  - `id`

    - The ID of the user you want the information of.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/1234567890
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/1234567890', {
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

  - [User](/reference/structures/data.md#user)

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

## PATCH /user/:id

Update a specific user.

:::warning Optional Parameters
At least 1 field is required in the body.
:::

:::details Parameters

- Path

  - `id`

    - The ID of the user you want to modify.

- Body

  - `username` _optional_

    - The new username for the user.

  - `email` _optional_

    - The new email for the user.

  - `password` _optional_

    - The new password for the user.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X PATCH \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"joe\"}" \
  https://alekeagle.me/api/user/1234567890
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/users', {
  method: 'PATCH',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username: 'joe' })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [User](/reference/structures/data.md#user)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidUser](/reference/structures/errors.md#invaliduser)

- 409 Conflict

  - [UserExists](/reference/structures/errors.md#userexists)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## PATCH /user/:id/domain

Update a specific users domain and subdomain selection.

:::details Parameters

- Path

  - `id`

    - The ID of the user's you wish to modify.

- Body

  - `domain`

    - The domain you want the user use.

  - `subdomain` _optional_

    - The subdomain that you want the user to use, all invalid characters will be removed from the subdomain and cannot be longer than 63 characters.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X PATCH \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"domain\":\"alekeagle.me\",\"subdomain\":\"use\"}" \
  https://alekeagle.me/api/user/1234567890/domain
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/1234567890/domain', {
  method: 'PATCH',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ domain: 'alekeagle.me', subdomain: 'use' })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [User](/reference/structures/data.md#user)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

  - [InvalidSubdomain](/reference/structures/errors.md#invalidsubdomain)

  - [SubdomainNotSupported](/reference/structures/errors.md#subdomainnotsupported)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidUser](/reference/structures/errors.md#invaliduser)

  - [InvalidDomain](/reference/structures/errors.md#invaliddomain)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## PATCH /user/:id/ban

Toggle the ban status of a user.

:::details Parameters

- Path

  - `id`

    - The ID of the user.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X PATCH \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/1234567890/ban
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/1234567890/ban', {
  method: 'PATCH',
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

  - [User](/reference/structures/data.md#user)

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

## DELETE /user/:id

Delete a specified user and all of their files.

:::details Parameters

- Path

  - `id`

    - The ID of the user you want to delete.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  https://alekeagle.me/api/user/1234567890
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/user/1234567890', {
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

  - [User](/reference/structures/data.md#user)

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

## DELETE /users

Bulk delete the users provided in the request.

:::details Parameters

- Body

  - `users`

    - An array of users you want to delete, invalid user IDs are ignored.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  -H "Content-type: application/json" \
  -d "{\"users\":[\"1234567890\", \"098654321\"]}" \
  https://alekeagle.me/api/users
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/users', {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-type': 'application/json'
  },
  body: JSON.stringify({ users: ['1234567890', '0987654321'] })
});
```

</code-block>

</code-group>

:::

:::details Response

- 200 OK

  - [DeleteBulk](/reference/structures/data.md#deletebulk)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

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
