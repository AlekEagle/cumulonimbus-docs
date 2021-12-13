# Domain Management

These endpoints pertains to the various actions that can be performed on domains.

## GET /domains

Get all domains usable domains.

:::details Parameters

- Query

  - `limit` _optional_

    - The number of domain entries you want in this page. The default and max is 50.

  - `offset` _optional_

    - The offset from 0 of domains you wish to see.

:::

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  -H "Authorization: token" \
  https://alekeagle.me/api/domains
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/domains', {
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

  - [List](/reference/structures/data.md#list)<[Domain](/reference/structures/data.md#domain)>

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## GET /domain/:id

Get details about specific domain.

:::details Parameters

- Path

  - `id`

    - The ID of the domain.

:::

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  -H "Authorization: token" \
  https://alekeagle.me/api/domains
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/domains', {
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

  - [List](/reference/structures/data.md#list)<[Domain](/reference/structures/data.md#domain)>

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::