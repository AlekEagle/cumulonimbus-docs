# Instruction Management

These are endpoints that relate to interacting with setup instructions for various services.

## POST /instruction

Create a new instruction set for a service.

:::details Parameters

- Body

  - `steps`

    - An array of step by step instructions on how to get the service set up. The setup file download link will be accessable by clicking on the first step.

  - `filename`

    - The filename of the setup file for the service.

  - `fileContent`

    - The content inside of the setup file.

  - `description`

    - A short description of the service.

  - `displayName`

    - A name that will be shown to end users.

  - `name`

    - Should be thought of as the ID, more often than not it is the slug of the service (all lowercase and uses dashes instead of spaces).

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X POST \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"sharex\",\"displayName\":\"ShareX\",\"description\":\"The Windows solution for screen capture, file uploading and productivity tools.\",\"filename\":\"Cumulonimbus-ShareX-Config.sxcu\",\"fileContent\":\"I can't be bothered to oneline a ShareX custom uploader config here so you'll just have to do with this.\",\"steps\":[\"Download the configuration file by clicking me!\",\"Once it finishes downloading, open the file, when ShareX prompts you if you want to set this service as your default uploader, select \\\"yes\\\".\",\"Done!\"]}" \
  https://alekeagle.me/api/instruction
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/instruction', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'sharex',
    displayName: 'ShareX',
    description:
      'The Windows solution for screen capture, file uploading and productivity tools.',
    filename: 'Cumulonimbus-ShareX-Config.sxcu',
    fileContent:
      "I can't be bothered to oneline a ShareX custom uploader config here so you'll just have to do with this.",
    steps: [
      'Download the configuration file by clicking me!',
      'Once it finishes downloading, open the file, when ShareX prompts you if you want to set this service as your default uploader, select "yes".',
      'Done!'
    ]
  })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 201 Created

  - [Instruction](/reference/structures/data.md#instruction)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 409 Conflict

  - [InstructionExists](/reference/structures/errors.md#instructionexists)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## PATCH /instruction/:id

Update a instruction set for a specified service.

:::warning Optional Parameters
At least 1 field is required in the body.
:::

:::details Parameters

- Path

  - `id`

    - The ID of the instruction set.

- Body

  - `steps` _optional_

    - An array of step by step instructions on how to get the service set up. The setup file download link will be accessable by clicking on the first step.

  - `filename` _optional_

    - The filename of the setup file for the service.

  - `fileContent` _optional_

    - The content inside of the setup file.

  - `description` _optional_

    - A short description of the service.

  - `displayName` _optional_

    - A name that will be shown to end users.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X PATCH \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"displayName\":\"ShareX (Windows Only)\"}" \
  https://alekeagle.me/api/instruction/sharex
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/instruction/sharex', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ displayName: 'ShareX (Windows Only)' })
});
```

</code-block>

</code-group>

:::

:::details Responses

- 200 OK

  - [Instruction](/refrerence/structures/data.md#instruction)

- 400 Bad Request

  - [MissingFields](/reference/structures/errors.md#missingfields)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidInstruction](/reference/structures/errors.md#invalidinstruction)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /instruction/:id

Delete an instruction set for a specific upload service.

:::details Parameters

- Path

  - `id`

    - The ID of the instruction set you wish to remove.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  https://alekeagle.me/api/instruction/sharex
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/instruction/sharex', {
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

  - [Instruction](/reference/structures/data.md#instruction)

- 401 Unauthorized

  - [InvalidSession](/reference/structures/errors.md#invalidsession)

- 403 Forbidden

  - [Banned](/reference/structures/errors.md#banned)

  - [Permissions](/reference/structures/errors.md#permissions)

- 404 Not Found

  - [InvalidInstruction](/reference/structures/errors.md#invalidinstructions)

- 429 Too Many Requests

  - [RateLimited](/reference/structures/errors.md#ratelimited)

- 500 Internal Server Error

  - [Internal](/reference/structures/errors.md#internal)

:::

## DELETE /instructions

Bulk delete all instruction sets provided.

:::details Parameters

- Body

  - `instruction`

    - A list of instruction sets you wish to delete.

:::

:::details Example Requests

<code-group>

<code-block title="cURL">

```sh
curl -X DELETE \
  -H "Authorization: token" \
  -H "Content-Type: application/json" \
  -d "{\"instructions\": [\"sharex\", \"other-sharex\"]}" \
  https://alekeagle.me/api/instructions
```

</code-block>

<code-block title="JS Fetch">

```js
fetch('https://alekeagle.me/api/instructions', {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ instructions: ['sharex', 'other-sharex'] })
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
