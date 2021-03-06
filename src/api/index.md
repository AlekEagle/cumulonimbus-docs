# Getting Started

## Making API Calls

If you don't know already, Cumulonimbus is a RESTful API. API calls are made by making HTTP requests to the server and the server responds inline with your request. Upon receiving an error from the server, it will provide a status code for the type of error as well as any details that my be needed to correct the error. The base URL is [here](/reference/#base-url).

## Requests

All requests, unless otherwise specified, require authorization. To authorize a request, you need a token, you can learn how to get an API token [here](/reference/faq.md#getting-an-api-token).

:::danger The Accept Header
The server does **NOT** respect the Accept header. It will only respond with `application/json`. If you cannot work with `application/json` wait for a future update when respecting the Accept header is implemented.
:::

Any request that has a body can use any of the following:

:::tip Recommended Body Content Type
Even though the REST API supports the formats below, we can only guarantee 100% support with `application/json`. If you experience any issues with any other format types, please let me know.
:::

:::details Compatible Content Types

- `multipart/form-data`

- `application/x-www-form-urlencoded`

- `application/json`

:::

## Ratelimits

This API implements a ratelimit system. All endpoints are managed by this ratelimiting system, the default limit is 100 requests in 5 minutes unless otherwise specified. If you do get ratelimited, your request will return with error [RateLimited](/reference/structures/errors.md#ratelimited) (`429 Too Many Requests`), with the headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, and `Retry-After`.

## Your First API Call

Now that we know the basics, we can go ahead and get started with making our first API call! More examples of making API calls for different languages will come in the future when I care :^)

## ANY /api

Any method calling this endpoint will work, it's more of a sanity check than a useful endpoint.

:::tip No Authorization Required
This endpoint does not require authorization.
:::

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  https://alekeagle.me/api
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api', {
  method: 'GET',
  credentials: 'include'
});
```

</code-block>

</code-group>

:::

:::details Example Response

- 200 OK

  - ```json
    {
      "hello": "world",
      "version": "3.0.0"
    }
    ```

:::
