# Unprivileged Endpoints

The following endpoints are available to the public on the official instance of Cumulonimbus. To learn more about the difference between privileged and unprivileged endpoints, see the [Privileged vs Unprivileged](/api/#privileged-vs-unprivileged) section.

## ANY /

This endpoint is used for testing purposes.

<RequestExample path="/" no-auth />

Under all circumstances, this endpoint will a `200 OK` response with the following body:

```json
{
  "hello": "world",
  "version": "4.0.0"
}
```
