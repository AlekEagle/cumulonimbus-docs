# Let's Get Acquainted

To make the documentation easier to follow, the base URL will be omitted from endpoint paths. Base URLs can be found in the [Base URLs](/reference/#base-urls) section.

## Authentication

All endpoints require authentication unless otherwise specified. To authenticate, you must send an `Authorization` header with your request. The value of the header should be your API key.

:::tip
The following key is for demonstration purposes only, it does not work, but will be used throughout the documentation for examples.
:::

```txt
Authorization: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhlIGV4YW1wbGUgdG9rZW4gZm9yIGRvY3MuYWxla2VhZ2xlLm1lIiwic3ViIjoiMTY0NzAxNTAyODYyNiIsImlhdCI6MTY4NzA2NzYxNCwiZXhwIjoyMDAyNjQzNjE0fQ.qAwhjhtGT56iAI52EsdVYcaTjmLPeR51TALkJ1CwRlfyDHwrsOTzAe8Y3za_tJqkvSaohwQq4cD7lZbTzMSw8Q
```

## Rate Limiting

Cumulonimbus API endpoints have ratelimits to prevent abuse. The default ratelimit is `100` request(s) per `1` minute(s), but this can vary depending on the endpoint. If you exceed the ratelimit, you will receive a [`RateLimited`](/reference/errors#ratelimited) error.

In addition to the default ratelimit, there is also a burst ratelimit. The burst ratelimit is `3` request(s) per `1` second(s). If you exceed the burst ratelimit, you will also receive a [`RateLimited`](/reference/errors#ratelimited) error.

Staff endpoints generally do not have a ratelimit.

### Rate Limit Headers

Cumulonimbus will send the following headers with every response:

| Header                | Description                                                                          |
| --------------------- | ------------------------------------------------------------------------------------ |
| `RateLimit-Limit`     | The maximum number of requests you can make per allotted time.                       |
| `RateLimit-Remaining` | The number of requests you have left for this allotted time.                         |
| `RateLimit-Reset`     | The time in seconds until the rate limit resets.                                     |
| `RateLimit-Skipped`   | Wether the request counted towards the ratelimit.                                    |
| `RateLimit-Reason`    | The reason for your request being ratelimited. Can either be `standard`, or `burst`. |

## User IDs

User IDs are 13-digit numbers that uniquely identify a user (Fun fact: they're actually just the UNIX timestamp of when the user was created). When an endpoint mentions something about a user ID, it's referring to the 13-digit number.

You used to be able to provide your ID interchangeably with the keyword `me`, but this is no longer the case. Requesting data with a user ID, regardless of whether it's your own or someone else's, will result in an [InsufficientPermissions](/reference/errors#insufficientpermissions) error.

## Kill Switches

Kill switches prevent the use of certain features of the API. For more information on kill switches, see [Kill Switches](/reference/#kill-switches) for a list of kill switches and their effects. Specific endpoints will also have information on how kill switches affect them. All endpoints are affected by the `GLOBAL(8)` kill switch and is omitted from specific endpoint documentation to avoid redundancy.

## Non-Public Endpoints

All non-public endpoints will return the [`EndpointRequiresSecondFactor`](/reference/errors#endpointrequiressecondfactor) error. This is to prevent users who are already staff without at least one second factor registered from accessing sensitive endpoints until they register a second factor.

## Your First Request

Making a request of any type to the API's base URL (`https://alekeagle.me/api/`) will return a JSON object with the following structure:

```json
{
  "hello": "world",
  "version": "5.0.0"
}
```

This is a simple way to check if the API is online and responding to requests and also works for the thumbnail API (`https://previews.alekeagle.me/`).
