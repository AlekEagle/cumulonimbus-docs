# Domain Management

These are endpoints that relate to interacting with the domain specified in the request.

## POST /domain

Create a new domain.

:::details Parameters

- Body

  - `domain`

    - The domain you want to add.

  - `allowsSubdomains`

    - Wether or not the domain supports subdomains.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X POST \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"domain\":\"alekeagle.biz\",\"allowsSubdomains\":true}" \
  https://alekeagle.me/api/domain
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/domain', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ domain: 'alekeagle.biz', allowsSubdomains: true })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 201 Created

  - [Domain](/reference/structures/data.md#domain)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 409 Conflict

  - [DomainExists](/reference/structures/errors.md#domainexists)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## PATCH /domain/:id

Update a specific domain.

:::details Parameters

- Path

  - `id`

    - The ID of the domain.

- Body

  - `allowsSubdomains`

    - Wether or not this domain supports subdomains.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X PATCH \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"allowsSubdomains\":true}" \
  https://alekeagle.me/api/domain/alekeagle.biz
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/domain/alekeagle.biz', {
  method: 'PATCH',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ allowsSubdomains: true })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [Domain](/reference/structures/data.md#domain)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidDomain](/reference/structures/errors.md#invaliddomain)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /domain/:id

Delete a specific domain.

:::details Parameters

- Path

  - `id`

    - The ID of the domain.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  https://alekeagle.me/api/domain/alekeagle.biz
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/domain/alekeagle.biz', {
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

  - [Domain](/reference/structures/data.md#domain)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsessions)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidDomain](/reference/structures/errors.md#invaliddomain)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /domains

Bulk delete multiple domains.

:::details Parameters

- Body

  - `domains`

    - A list of domains you would like to delete.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DOMAINS \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"domains\":[\"alekeagle.biz\",\"ifunny.lol\"]}" \
  https://alekeagle.me/api/domains
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/domains', {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    Authorization: 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ domains: ['alekeagle.biz', 'ifunny.lol'] })
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

  - [Permissions](/reference/structures/errors.md#permissions)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::
