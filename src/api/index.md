# Getting Started

## Making API Calls

If you don't know already, Cumulonimbus is a RESTful API. API calls are made by making HTTP requests to the server and the server responds inline with your request. Upon receiving an error from the server, it will provide a status code for the type of error as well as any details that my be needed to correct the error.

## Requests

All requests, unless otherwise specified, require authorization. To authorize a request, you need a token, you can learn how to get an API token [here](/reference/faq.md#getting-an-api-token).

:::danger The Accept Header
The server does **NOT** respect the Accept header. It will only respond with `application/json`. If you cannot work with `application/json` wait for a future update when respecting the Accept header is implemented.
:::

Any request that has a body can use any of the following:

:::details Compatible Content Types

- `multipart/form-data`

- `application/x-www-form-urlencoded`

- `application/json`

:::

## Your First API Call

Now that we know the basics, we can go ahead and get started with making our first API call! All examples will use curl. More examples of making API calls will come when I care :^)

## ANY /api

Any method calling this endpoint will work, it's more of a sanity check than a useful endpoint.

No authorization is required.

:::details Example Request

```sh
curl -X GET \
  https://alekeagle.me/api
```

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
