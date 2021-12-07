# Account Management

These are endpoints that relate to viewing or modifying the account of the user that is associated with the token.

## GET /user

Returns the user object of the current authenticated user.

:::details Example Request

```sh
curl -X GET \
  -H "Authorization: Token" \
  https://alekeagle.me/api/user
```

:::

:::details Example Responses

- 200 OK

  - [User](/reference/structs.md#user)

- 401 Unauthorized

  - [InvalidSession](/reference/structs.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structs.md#banned)

- 500 Internal Server Error

  - [Internal](/reference/structs.md#internal)

:::

## PATCH /user

Update the current authenticated user.

At least one optional parameter is required in this request.

:::details Parameters

- Body

  - `username` _optional_

    - The new username for the account.

  - `email` _optional_

    - The new email for the account.

  - `newPassword` _optional_

    - The new password for the account.

  - `password`

    - The current password of the account for verification purposes.

:::

:::details Example Request

```sh
curl -X PATCH \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"bob\",\"newPassword\":\"bob\",\"password\":\"joe\"}" \
  https://alekeagle.me/api/user
```

:::

:::details Example Responses

- 200 OK

  - [User](/reference/structs.md#user)

- 400 Bad Request

  - [MissingFields](/reference/structs.md#missingfields)

- 401 Unauthorized

  - [InvalidSession](/reference/structs.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structs.md#banned)

- 500 Internal Server Error

  - [Internal](/reference/structs.md#internal)

:::

## DELETE /user

Delete the current authenticated user.

:::details Parameters

- Body

  - `username`

    - The username of the current authenticated user for verification purposes.

  - `password`

    - The password of the current authenticated user for verification purposes.

:::

:::details Example Request

```sh
curl -X DELETE \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"joe\",\"password\":\"joe\"}" \
  https://alekeagle.me/api/user
```

:::

:::details Example Responses

- 200 OK

  - [User](/reference/structs.md#user)

- 400 Bad Request

  - [MissingFields](/reference/structs.md#missingfields)

- 401 Unauthorized

  - [InvalidSession](/reference/structs.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structs.md#banned)

- 500 Internal Server Error

  - [Internal](/reference/structs.md#internal)

:::

## POST /user

Create a new user

:::details Parameters

- Body

  - `username`

    - The username for the new user.

  - `email`

    - The email for the new user.

  - `password`

    - The password for the new user.

  - `repeatPassword`

    - Repeat the password for memory sake. (Yes, we validate the password repeating server-side, cringe, I dare you.)

  - `rememberMe` _optional_

    - Wether or not your session should last for a month or ten years.

:::

:::details Example Request

```sh
curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"joe\",\"email\":\"joe@joe.joe\",\"password\":\"joe\",\"repeatPassword\":\"joe\",\"rememberMe\":true}" \
  https://alekeagle.me/api/user
```

:::

:::details Example Responses

- 201 Created

  - [SuccessfulAuth](/reference/structs.md#successfulauth)

- 400 Bad Request

  - [MissingFields](/reference/structs.md#missingfields)

- 409 Conflict

  - [UserExists](/reference/structs.md#userexists)

- 500 Internal Server Error

  - [Internal](/reference/structs.md#internal)

:::
