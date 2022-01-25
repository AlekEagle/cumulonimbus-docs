# General Endpoints

The thumbnail server base URL is:

```
https://previews.alekeagle.me
```

:::tip No Authorization Required
The thumbnail server does not require authorization for any endpoint.
:::

## ANY /

The sanity check endpoint for the thumbnail server.

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  https://previews.alekeagle.me/
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://previews.alekeagle.me/', {
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

## GET /:file

Retrieve the thumbnail for the requested file.

:::details Parameters

- Path

  - `file`

    - The filename of the file.

:::

:::details Example Request

<code-group>

<code-block title="cURL">

```sh
curl -X GET \
  https://previews.alekeagle.me/abcdefghij.png
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://previews.alekeagle.me/abcdefghij.png', {
  method: 'GET',
  credentials: 'include'
});
```

</code-block>

</code-group>

:::

:::details Example Responses

- 200 OK

  - The thumbnail of the file, or an image with the text "No Preview Available" if the filetype is not supported.

- 404 Not Found

  - No body, only the status code.

:::
