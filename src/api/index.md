# Let's Get Acquainted

To make the documentation easier to follow, the base URL will be omitted from endpoint paths. The base URL is:

```txt
https://alekeagle.me/api
```

## Authentication

All endpoints require authentication unless otherwise specified. To authenticate, you must send an `Authorization` header with your request. The value of the header should be your API key.

:::tip
The following key is for demonstration purposes only, it does not work, but will be used throughout the documentation for examples.
:::

```txt
Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q
```

## Rate Limiting

Cumulonimbus has a rate limit of `100` requests per `1 minute` unless otherwise specified. If you exceed this limit, you will receive a `429 Too Many Requests` response.

### Rate Limit Headers

Cumulonimbus will send the following headers with every response:

| Header                | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| `RateLimit-Limit`     | The maximum number of requests you can make per allotted time. |
| `RateLimit-Reamining` | The number of requests you have left for this allotted time.   |
| `RateLimit-Reset`     | The time in seconds until the rate limit resets.               |

## Privileged vs Unprivileged

For the sake of complete documentation coverage, transparency, and for those who wish to self-host Cumulonimbus, both privileged and unprivileged endpoints will be documented. However, only unprivileged endpoints are available to the public on the official instance of Cumulonimbus.

### Privileged Endpoints

Privileged endpoints are accessible to users that have `staff` set to `true` in their user object. These endpoints are used for administrative purposes and are not available to the public. Privileged endpoints are documented in the [Privileged Endpoints](/api/privileged/) section.

### Unprivileged Endpoints

Unprivileged endpoints are accessible by standard users, and are the only endpoints available to the public on the official instance of Cumulonimbus. Unprivileged endpoints are documented in the [Unprivileged Endpoints](/api/unprivileged/) section.
