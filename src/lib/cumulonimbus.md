---
outline: [2, 3]
---

# Cumulonimbus

::: danger Warning
This page is for v4 of the library. If you're using v3, it will no longer be maintained. Please refer to type definitions for v3.
:::

## Interfaces, Types, and Subclasses

::: tip Note
Some of these interfaces, types, and subclasses are not documented here. This is to reduce repetition since they're already documented in the [Reference](/reference/) page.

:::: details Omitted Fields

- `BASE_URL`
- `BASE_THUMBNAIL_URL`
- `APICallRequestInit` (This is just `RequestInit` with [ClientOptions](#clientoptions) added)
- `Data` and its children (These are documented in the [Data Structures](/reference/structures) page)
- `ErrorCode` (This is documented in the [Error Codes](/reference/errors) page)
- `SuccessCode` (This is documented in the [Success Codes](/reference/successes) page)

::::

### RatelimitData <Badge text="^4.0.0" type="tip"/>

```ts
interface RatelimitData {
  limit: number;
  remaining: number;
  reset: number;
}
```

### ClientOptions <Badge text="^4.0.0" type="tip"/>

```ts
interface ClientOptions {
  baseURL?: string;
  baseThumbnailURL?: string;
}
```

### APIResponse <Badge text="^4.0.0" type="tip"/>

::: tip Note
The generic type `T` will contain one of the [Data Structures](/reference/structures) page.
:::

```ts
interface APIResponse<T> {
  result: T;
  ratelimit: RatelimitData;
}
```

### ResponseError <Badge text="^4.0.0" type="tip"/>

```ts
class ResponseError extends Error implements Data.Error {
  code: keyof ErrorCode;
  message: ErrorCode[keyof ErrorCode];
  ratelimit: RatelimitData | null;
  fields?: string[];
  constructor(response: Data.Error, ratelimit: RatelimitData | null = null);
}
```

### ThumbnailError <Badge text="^4.0.0" type="tip"/>

```ts
class ThumbnailError extends Error {
  code: number;
  message: string;
  constructor(response: Response);
}
```

## Static Methods

### login <Badge text="^4.0.0" type="tip"/>

This method is used to login to Cumulonimbus using the [/api/login](/api/session#post-login) endpoint, and will return a promise with an instance of the Cumulonimbus class upon succeeding.

```ts
static login(
  options: {
    username: string;
    password: string;
    rememberMe?: boolean;
    tokenName?: string;
  },
  clientOptions?: Cumulonimbus.ClientOptions
): Promise<Cumulonimbus>;
```

### register <Badge text="^4.0.0" type="tip"/>

This method is used to register a new account on Cumulonimbus using the [/api/register](/api/account#post-register) endpoint, and will return a promise with an instance of the Cumulonimbus class upon succeeding.

```ts
static register(
  options: {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    rememberMe?: boolean;
  },
  clientOptions?: Cumulonimbus.ClientOptions
): Promise<Cumulonimbus>;
```

### getAPIStatus <Badge text="^4.0.0" type="tip"/>

This method fetches the example endpoint [/](/api/#your-first-request) and returns a promise with the response.

```ts
static getAPIStatus(options?: Cumulonimbus.ClientOptions): Promise<Response>;
```

### getThumbnailAPIStatus <Badge text="^4.0.0" type="tip"/>

Similar to [getAPIStatus](#getapistatus), this method fetches the thumbnail server's example endpoint.

```ts
static getThumbnailAPIStatus(
  options?: Cumulonimbus.ClientOptions
): Promise<Response>;
```

## Constructor

The constructor is used to create an instance of the Cumulonimbus class.

```ts
constructor(
  token: string,
  clientOptions?: Cumulonimbus.ClientOptions
);
```

## Instance Methods

The following methods are on the Cumulonimbus class and are used to make requests to the Cumulonimbus API. Not all of these methods are public on the class and are only used internally. They have been omitted for brevity.

### getAPIStatus (Instance) <Badge text="^4.0.0" type="tip"/>

Functionally the same as the static method [getAPIStatus](#getapistatus), but uses the instance's options.

```ts
getAPIStatus();
```

### getThumbnailAPIStatus (Instance) <Badge text="^4.0.0" type="tip"/>

Functionally the same as the static method [getThumbnailAPIStatus](#getthumbnailapistatus), but uses the instance's options.

```ts
getThumbnailAPIStatus();
```

### getThumbnail <Badge text="^4.0.0" type="tip"/>

Fetches a thumbnail from the thumbnail server. This method uses the configured `baseThumbnailURL` to fetch the thumbnail.

```ts
getThumbnail(
  id: string | Cumulonimbus.Data.File
);
```

### getSession <Badge text="^4.0.0" type="tip"/>

Fetches the current session or the specified session of yourself or another user. If no session ID is specified, the current session will be fetched.

See the [underlying endpoint](/api/session#get-users-uid-sessions-sid) for more information.

```ts
getSession(
  options?:
  | string
  | {
    session?: string; // Session is optional when user is not specified
    user?: undefined;
  }
  | {
    session: string; // Session is required when user is specified
    user: string;
  }
);
```

### getSessions <Badge text="^4.0.0" type="tip"/>

Fetches a list of sessions for yourself or another user. If no user ID is specified, the sessions for the current user will be fetched.

See the [underlying endpoint](/api/session#get-users-uid-sessions) for more information.

```ts
getSessions(
  options?:
  | string
  | {
    user?: string;
    limit?: number;
    offset?: number;
  }
);
```

### deleteSession <Badge text="^4.0.0" type="tip"/>

Deletes the specified session of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/session#delete-users-uid-sessions-sid) for more information.

```ts
deleteSession(
  options?:
  | string
  | {
    session?: string; // Session is optional when user is not specified
    user?: undefined;
  }
  | {
    session: string; // Session is required when user is specified
    user: string;
  }
);
```

### deleteSessions <Badge text="^4.0.0" type="tip"/>

Deletes the specified sessions of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/session#delete-users-uid-sessions) for more information.

```ts
deleteSessions(
  sessionIDs: string[],
  user?: string
);
```

### deleteAllSessions <Badge text="^4.0.0" type="tip"/>

Deletes all sessions of yourself or another user. If no user ID is specified, it will assume the current user.

If provided a string, it will assume the user ID. If provided a boolean, it will assume the user ID is the current user and use it as a flag to include the current session or not.

See the [underlying endpoint](/api/session#delete-users-uid-sessions-all) for more information.

```ts
deleteAllSessions(
  userOrIncludeSelf?: string | boolean
);
```

### getUsers <Badge text="^4.0.0" type="tip"/>

Fetches a list of users.

See the [underlying endpoint](/api/account#get-users) for more information.

```ts
getUsers(
  options?: {
    limit?: number;
    offset?: number;
  }
);
```

### getUser <Badge text="^4.0.0" type="tip"/>

Fetches a user. If no user ID is specified, it will fetch the current user.

See the [underlying endpoint](/api/account#get-users-id) for more information.

```ts
getUser(
  user?: string
);
```

### editUsername <Badge text="^4.0.0" type="tip"/>

Edits the username of yourself or another user.

See the [underlying endpoint](/api/account#put-users-id-username) for more information.

```ts
editUsername(
  options:
  | {
    username: string;
    password: string;
    user?: undefined; // Cannot specify user when editing current user (it's implied when password is provided)
  }
  | {
    username: string;
    password?: undefined; // Cannot specify password when editing another user (it's implied when user is provided)
    user: string;
  }
);
```

### editEmail <Badge text="^4.0.0" type="tip"/>

Edits the email of yourself or another user. This will also unverify the email and automatically send a verification email.

See the [underlying endpoint](/api/account#put-users-id-email) for more information.

```ts
editEmail(
  options:
  | {
    email: string;
    password: string;
    user?: undefined; // Cannot specify user when editing current user (it's implied when password is provided)
  }
  | {
    email: string;
    password?: undefined; // Cannot specify password when editing another user (it's implied when user is provided)
    user: string;
  }
);
```

### verifyEmail <Badge text="^4.0.0" type="tip"/>

Verifies the email of yourself or another user.

See the [underlying endpoint](/api/account#put-users-id-verify) for more information.

```ts
verifyEmail(
  options:
  | {
    token: string;
    user?: undefined; // Cannot specify user when verifying current user (it's implied when token is provided)
  }
  | {
    token?: undefined; // Cannot specify token when verifying another user (it's implied when user is provided)
    user: string;
  }
);
```

### resendVerificationEmail <Badge text="^4.0.0" type="tip"/>

Resend the verification email of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/account#get-users-id-verify) for more information.

```ts
resendVerificationEmail(
  user?: string
);
```

### unverifyEmail <Badge text="^4.0.0" type="tip"/>

Unverify the email of another user.

See the [underlying endpoint](/api/account#delete-users-id-verify) for more information.

```ts
unverifyEmail(
  user: string
);
```

### editPassword <Badge text="^4.0.0" type="tip"/>

Edits the password of yourself or another user. If no user ID is specified, it will assume the current user. If you're editing the current user's password, you must provide the current password.

See the [underlying endpoint](/api/account#put-users-id-password) for more information.

```ts
editPassword(
  options:
  | {
    newPassword: string;
    confirmNewPassword: string;
    password: string;
    user?: undefined; // Cannot specify user when editing current user (it's implied when password is provided)
  }
  | {
    newPassword: string;
    confirmNewPassword: string;
    password?: undefined; // Cannot specify password when editing another user (it's implied when user is provided)
    user: string;
  }
);
```

### grantStaff <Badge text="^4.0.0" type="tip"/>

Grants staff to the specified user.

See the [underlying endpoint](/api/account#put-users-id-staff) for more information.

```ts
grantStaff(
  user: string
);
```

### revokeStaff <Badge text="^4.0.0" type="tip"/>

Revokes staff from the specified user.

See the [underlying endpoint](/api/account#delete-users-id-staff) for more information.

```ts
revokeStaff(
  user: string
);
```

### banUser <Badge text="^4.0.0" type="tip"/>

Bans the specified user. This will automatically send an email to the user notifying them of the ban with the provided reason.

See the [underlying endpoint](/api/account#put-users-id-ban) for more information.

```ts
banUser(
  user: string,
  reason: string
);
```

### unbanUser <Badge text="^4.0.0" type="tip"/>

Unbans the specified user.

See the [underlying endpoint](/api/account#delete-users-id-ban) for more information.

```ts
unbanUser(
  user: string
);
```

### editDomainSelection <Badge text="^4.0.0" type="tip"/>

Edits the domain selection of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/account#put-users-id-domain) for more information.

```ts
editDomainSelection(
  options: {
    domain: string;
    subdomain?: string;
  },
  user?: string
);
```

### deleteUser <Badge text="^4.0.0" type="tip"/>

Deletes the current user or the specified user.

See the [underlying endpoint](/api/account#delete-users-id) for more information.

```ts
deleteUser(
  options:
  | {
    username: string;
    password: string;
    user?: undefined; // Cannot specify user when deleting current user (it's implied when username and password are provided)
  }
  | {
    username?: undefined; // Cannot specify username when deleting another user (it's implied when user is provided)
    password?: undefined; // Cannot specify password when deleting another user (it's implied when user is provided)
    user: string;
  }
);
```

### deleteUsers <Badge text="^4.0.0" type="tip"/>

Deletes the specified users.

See the [underlying endpoint](/api/account#delete-users) for more information.

```ts
deleteUsers(
  userIDs: string[]
);
```

### getDomains <Badge text="^4.0.0" type="tip"/>

Fetches a list of domains.

See the [underlying endpoint](/api/domain#get-domains) for more information.

```ts
getDomains(
  limit?: 'all' | number,
  offset?: number
);
```

### getDomain <Badge text="^4.0.0" type="tip"/>

Fetches the specified domain.

See the [underlying endpoint](/api/domain#get-domains-id) for more information.

```ts
getDomain(
  id: string
);
```

### createDomain <Badge text="^4.0.0" type="tip"/>

Creates a domain.

See the [underlying endpoint](/api/domain#post-domains) for more information.

```ts
createDomain(
  id: string,
  subdomains?: boolean
);
```

### allowSubdomains <Badge text="^4.0.0" type="tip"/>

Allows subdomains for the specified domain.

See the [underlying endpoint](/api/domain#put-domains-id-subdomains) for more information.

```ts
allowSubdomains(
  id: string
);
```

### disallowSubdomains <Badge text="^4.0.0" type="tip"/>

Disallows subdomains for the specified domain.

See the [underlying endpoint](/api/domain#delete-domains-id-subdomains) for more information.

```ts
disallowSubdomains(
  id: string
);
```

### deleteDomain <Badge text="^4.0.0" type="tip"/>

Deletes the specified domain.

See the [underlying endpoint](/api/domain#delete-domains-id) for more information.

```ts
deleteDomain(
  id: string
);
```

### deleteDomains <Badge text="^4.0.0" type="tip"/>

Deletes the specified domains.

See the [underlying endpoint](/api/domain#delete-domains) for more information.

```ts
deleteDomains(
  ids: string[]
);
```

### getFiles <Badge text="^4.0.0" type="tip"/>

Fetches a list of files. If no user ID is specified, it will fetch all files from all users.

See the [underlying endpoint](/api/file#get-files) for more information.

```ts
getFiles(
  options?: {
    user?: string;
    limit?: number;
    offset?: number;
  }
);
```

### getFile <Badge text="^4.0.0" type="tip"/>

Fetches the specified file.

See the [underlying endpoint](/api/file#get-files-id) for more information.

```ts
getFile(
  id: string
);
```

### editFilename <Badge text="^4.0.0" type="tip"/>

Edits the display name of the specified file.

See the [underlying endpoint](/api/file#put-files-id-name) for more information.

```ts
editFilename(
  id: string,
  name: string
);
```

### deleteFilename <Badge text="^4.0.0" type="tip"/>

Deletes the display name of the specified file.

See the [underlying endpoint](/api/file#delete-files-id-name) for more information.

```ts
deleteFilename(
  id: string
);
```

### editFileExtension <Badge text="^4.0.0" type="tip"/>

Edits the extension of the specified file.

See the [underlying endpoint](/api/file#put-files-id-extension) for more information.

```ts
editFileExtension(
  id: string,
  extension: string
);
```

### deleteFile <Badge text="^4.0.0" type="tip"/>

Deletes the specified file.

See the [underlying endpoint](/api/file#delete-files-id) for more information.

```ts
deleteFile(
  id: string
);
```

### deleteFiles <Badge text="^4.0.0" type="tip"/>

Deletes the specified files.

See the [underlying endpoint](/api/file#delete-files) for more information.

```ts
deleteFiles(
  ids: string[]
);
```

### deleteAllFiles <Badge text="^4.0.0" type="tip"/>

Deletes all files from the specified user. If no user ID is specified, it will assume the current user. If you're deleting the files of the current user, you must provide the current password to confirm the deletion.

See the [underlying endpoint](/api/file#delete-files-all) for more information.

```ts
deleteAllFiles(
  options:
  | {
    password: string;
    user?: undefined; // Cannot specify user when deleting current user (it's implied when password is provided)
  }
  | {
    password?: undefined; // Cannot specify password when deleting another user (it's implied when user is provided)
    user: string;
  }
);
```

### getInstructions <Badge text="^4.0.0" type="tip"/>

Fetches a list of instructions.

See the [underlying endpoint](/api/instruction#get-instructions) for more information.

```ts
getInstructions(
  limit?: number,
  offset?: number
);
```

### getInstruction <Badge text="^4.0.0" type="tip"/>

Fetches the specified instruction.

See the [underlying endpoint](/api/instruction#get-instructions-id) for more information.

```ts
getInstruction(
  id: string
);
```

### createInstruction <Badge text="^4.0.0" type="tip"/>

Creates an instruction.

See the [underlying endpoint](/api/instruction#post-instructions) for more information.

```ts
createInstruction(
  options: {
    id: string;
    name: string;
    description: string;
    steps: string[];
    content: string;
    filename?: string;
  }
);
```

### editInstructionName <Badge text="^4.0.0" type="tip"/>

Edits the name of the specified instruction.

See the [underlying endpoint](/api/instruction#put-instructions-id-name) for more information.

```ts
editInstructionName(
  id: string,
  name: string
);
```

### editInstructionDescription <Badge text="^4.0.0" type="tip"/>

Edits the description of the specified instruction.

See the [underlying endpoint](/api/instruction#put-instructions-id-description) for more information.

```ts
editInstructionDescription(
  id: string,
  description: string
);
```

### editInstructionFile <Badge text="^4.0.0" type="tip"/>

Edits the file of the specified instruction.

See the [underlying endpoint](/api/instruction#put-instructions-id-file) for more information.

```ts
editInstructionFile(
  id: string,
  content: string,
  filename?: string
);
```

### editInstructionSteps <Badge text="^4.0.0" type="tip"/>

Edits the steps of the specified instruction.

See the [underlying endpoint](/api/instruction#put-instructions-id-steps) for more information.

```ts
editInstructionSteps(
  id: string,
  steps: string[]
);
```

### deleteInstruction <Badge text="^4.0.0" type="tip"/>

Deletes the specified instruction.

See the [underlying endpoint](/api/instruction#delete-instructions-id) for more information.

```ts
deleteInstruction(
  id: string
);
```

### deleteInstructions <Badge text="^4.0.0" type="tip"/>

Deletes the specified instructions.

See the [underlying endpoint](/api/instruction#delete-instructions) for more information.

```ts
deleteInstructions(
  ids: string[]
);
```

### upload <Badge text="^4.0.0" type="tip"/>

Uploads the provided data to Cumulonimbus.

```ts
upload(
  data: string | Buffer | File | Blob | ArrayBuffer,
  type?: string,
);
```
