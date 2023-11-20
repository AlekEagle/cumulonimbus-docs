---
outline: [2, 3]
---

# Cumulonimbus

## Interfaces, Types, and Subclasses

::: danger Breaking Change
The syntax of methods will be changing in the next major version. Each method will be using object destructuring instead of positional arguments. For example, instead of `editUsername(username, password, uid)`, it will be `editUsername({ username, password, uid })`. This will allow for optional arguments to be specified without having to specify the arguments before it. This will also allow for the arguments to be specified in any order. This change will be made in version 4.0.0.
:::

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

### RatelimitData <Badge text="^3.0.0" type="tip"/>

```ts
interface RatelimitData {
  limit: number;
  remaining: number;
  reset: number;
}
```

### ClientOptions <Badge text="^3.0.0" type="tip"/>

```ts
interface ClientOptions {
  baseURL?: string;
  baseThumbnailURL?: string;
}
```

### APIResponse <Badge text="^3.0.0" type="tip"/>

::: tip Note
The generic type `T` will contain one of the [Data Structures](/reference/structures) page.
:::

```ts
interface APIResponse<T> {
  result: T;
  ratelimit: RatelimitData;
}
```

### ResponseError <Badge text="^3.0.0" type="tip"/>

```ts
class ResponseError extends Error implements Data.Error {
  code: keyof ErrorCode;
  message: ErrorCode[keyof ErrorCode];
  ratelimit: RatelimitData | null;
  fields?: string[];
  constructor(response: Data.Error, ratelimit: RatelimitData | null = null);
}
```

### ThumbnailError <Badge text="^3.0.0" type="tip"/>

```ts
class ThumbnailError extends Error {
  code: number;
  message: string;
  constructor(response: Response);
}
```

## Static Methods

### login <Badge text="^3.0.0" type="tip"/>

This method is used to login to Cumulonimbus using the [/api/login](/api/session#post-login) endpoint, and will return a promise with an instance of the Cumulonimbus class upon succeeding.

```ts
static login(
  email: string,
  password: string,
  rememberMe?: boolean,
  options?: Cumulonimbus.ClientOptions,
  tokenName?: string
): Promise<Cumulonimbus>;
```

### register <Badge text="^3.0.0" type="tip"/>

This method is used to register a new account on Cumulonimbus using the [/api/register](/api/account#post-register) endpoint, and will return a promise with an instance of the Cumulonimbus class upon succeeding.

```ts
static register(
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
  rememberMe?: boolean,
  options?: Cumulonimbus.ClientOptions
): Promise<Cumulonimbus>;
```

### getAPIStatus <Badge text="^3.0.0" type="tip"/>

This method fetches the example endpoint [/](/api/#your-first-request) and returns a promise with the response.

```ts
static getAPIStatus(options?: Cumulonimbus.ClientOptions): Promise<Response>;
```

### getThumbnailAPIStatus <Badge text="^3.0.0" type="tip"/>

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
  options?: Cumulonimbus.ClientOptions
);
```

## Instance Methods

The following methods are on the Cumulonimbus class and are used to make requests to the Cumulonimbus API. Not all of these methods are pubic on the class and are only used internally. They'll be documented here anyway for completeness and will be marked as internal. For example, both the `token` and `options` parameters are internal and are not meant to be used by the end user of the library.

### call <Badge text="Internal" type="danger"/>

This method is used by the library to make requests to the API and does basic things like setting the user agent, extracting ratelimit data if it is present, etc. It returns a promise with the response.

```ts
call<T>(
  endpoint: string,
  init?: Cumulonimbus.APICallRequestInit
): Promise<Cumulonimbus.APIResponse<T>>;
```

### authenticatedCall <Badge text="Internal" type="danger"/>

This method is used by the library to make requests to the API that require authentication. It does the same things as [call](#call) but also adds the `Authorization` header to the request.

```ts
authenticatedCall<T>(
  endpoint: string,
  init?: Cumulonimbus.APICallRequestInit
): Promise<Cumulonimbus.APIResponse<T>>;
```

### manufactureMethod <Badge text="Internal" type="danger"/>

Because the developer of the library is lazy, this method is used to manufacture methods (wow! who would've guessed?) that call the API. It's a bit complicated, but it essentially takes an endpoint template, headers, and a body template and returns a function that uses the [authenticatedCall](#authenticatedcall) method to make a request to the API. This method is used to create all of the methods on the Cumulonimbus class.

```ts
manufactureMethod<T extends any[], M>(
  endpointTemplate: string | ((...args: T) => string),
  method: string,
  headers: { [key: string]: string } = {},
  bodyTemplate?: string | null | ((...args: T) => string) = null
): (...args: T) => Promise<Cumulonimbus.APIResponse<M>>;
```

### manufactureMethodGet <Badge text="Internal" type="danger"/>

This method is similar to [manufactureMethod](#manufacturemethod) but is used to create methods that use the `GET` method and don't have a body.

```ts
manufactureMethodGet<T extends any[], M>(
  endpointTemplate: string | ((...args: T) => string),
  headers: { [key: string]: string } = {}
): (...args: T) => Promise<Cumulonimbus.APIResponse<M>>;
```

### toQueryString <Badge text="Internal" type="danger"/>

This method is used to convert an object to a query string. It's used by the template functions in [manufactureMethod](#manufacturemethod) and [manufactureMethodGet](#manufacturemethodget) to convert the arguments to the method to a query string.

```ts
toQueryString(obj: { [key: string]: string | number | boolean }): string;
```

### getThumbnail <Badge text="^3.0.0" type="tip"/>

Fetches a thumbnail from the thumbnail server. This method uses the configured `baseThumbnailURL` to fetch the thumbnail.

```ts
getThumbnail(
  id: string | Cumulonimbus.Data.File
);
```

### getSession <Badge text="^3.0.0" type="tip"/>

Fetches the current session or the specified session of yourself or another user. If no session ID is specified, the current session will be fetched.

See the [underlying endpoint](/api/session#get-users-uid-sessions-sid) for more information.

```ts
getSession(
  sid?: string,
  uid?: string
);
```

### getSessions <Badge text="^3.0.0" type="tip"/>

Fetches a list of sessions for yourself or another user. If no user ID is specified, the sessions for the current user will be fetched.

See the [underlying endpoint](/api/session#get-users-uid-sessions) for more information.

```ts
getSessions(
  uid?: string,
  limit?: number,
  offset?: number
);
```

### deleteSession <Badge text="^3.0.0" type="tip"/>

Deletes the specified session of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/session#delete-users-uid-sessions-sid) for more information.

```ts
deleteSession(
  sid: string,
  uid?: string
);
```

### deleteSessions <Badge text="^3.0.0" type="tip"/>

Deletes the specified sessions of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/session#delete-users-uid-sessions) for more information.

```ts
deleteSessions(
  sids: string[],
  uid?: string
);
```

### deleteAllSessions <Badge text="^3.0.0" type="tip"/>

Deletes all sessions of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/session#delete-users-uid-sessions-all) for more information.

```ts
deleteAllSessions(
  uid?: string,
  includeSelf?: boolean
);
```

### getUsers <Badge text="^3.0.0" type="tip"/>

Fetches a list of users.

See the [underlying endpoint](/api/account#get-users) for more information.

```ts
getUsers(
  limit?: number,
  offset?: number
);
```

### getUser <Badge text="^3.0.0" type="tip"/>

Fetches a user. If no user ID is specified, it will fetch the current user.

See the [underlying endpoint](/api/account#get-users-id) for more information.

```ts
getUser(
  uid?: string
);
```

### editUsername <Badge text="^3.0.0" type="tip"/>

Edits the username of yourself or another user. If no user ID is specified, it will assume the current user. If you're editing the current user's username, you must provide the current password.

See the [underlying endpoint](/api/account#put-users-id-username) for more information.

```ts
editUsername(
  username: string,
  password?: string,
  uid?: string
);
```

### editEmail <Badge text="^3.0.0" type="tip"/>

Edits the email of yourself or another user. If no user ID is specified, it will assume the current user. If you're editing the current user's email, you must provide the current password.

See the [underlying endpoint](/api/account#put-users-id-email) for more information.

```ts
editEmail(
  email: string,
  password?: string,
  uid?: string
);
```

### verifyEmail <Badge text="^3.1.0" type="tip"/>

Verifies the email of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/account#put-users-id-verify) for more information.

```ts
verifyEmail(
  uid: string,
  token?: string
);
```

### resendVerificationEmail <Badge text="^3.1.0" type="tip"/>

Resends the verification email of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/account#put-users-id-verify-resend) for more information.

```ts
resendVerificationEmail(
  uid?: string
);
```

### unverifyEmail <Badge text="^3.1.0" type="tip"/>

Unverifies the email of another user.

```ts
unverifyEmail(
  uid: string
);
```

### editPassword <Badge text="^3.0.0" type="tip"/>

Edits the password of yourself or another user. If no user ID is specified, it will assume the current user. If you're editing the current user's password, you must provide the current password.

See the [underlying endpoint](/api/account#put-users-id-password) for more information.

```ts
editPassword(
  newPassword: string,
  confirmNewPassword: string,
  oldPassword?: string,
  uid?: string
);
```

### grantStaff <Badge text="^3.0.0" type="tip"/>

Grants staff to the specified user.

See the [underlying endpoint](/api/account#put-users-id-staff) for more information.

```ts
grantStaff(
  uid: string
);
```

### revokeStaff <Badge text="^3.0.0" type="tip"/>

Revokes staff from the specified user.

See the [underlying endpoint](/api/account#delete-users-id-staff) for more information.

```ts
revokeStaff(
  uid: string
);
```

### banUser <Badge text="^3.0.0" type="tip"/>

Bans the specified user.

See the [underlying endpoint](/api/account#put-users-id-ban) for more information.

```ts
banUser(
  uid: string
);
```

### unbanUser <Badge text="^3.0.0" type="tip"/>

Unbans the specified user.

See the [underlying endpoint](/api/account#delete-users-id-ban) for more information.

```ts
unbanUser(
  uid: string
);
```

### editDomainSelection <Badge text="^3.0.0" type="tip"/>

Edits the domain selection of yourself or another user. If no user ID is specified, it will assume the current user.

See the [underlying endpoint](/api/account#put-users-id-domain) for more information.

```ts
editDomainSelection(
  domain: string,
  subdomain?: string,
  uid?: string
);
```

### deleteUser <Badge text="^3.0.0" type="tip"/>

Deletes the current user or the specified user. If no user ID is specified, it will assume the current user. If you're deleting the current user, you must provide the current username and password to confirm the deletion.

See the [underlying endpoint](/api/account#delete-users-id) for more information.

```ts
deleteUser(
  uid?: string,
  username?: string,
  password?: string
);
```

### deleteUsers <Badge text="^3.0.0" type="tip"/>

Deletes the specified users.

See the [underlying endpoint](/api/account#delete-users) for more information.

```ts
deleteUsers(
  uids: string[]
);
```

### getDomains <Badge text="^3.0.0" type="tip"/>

Fetches a list of domains.

See the [underlying endpoint](/api/domain#get-domains) for more information.

```ts
getDomains(
  limit?: 'all' | number,
  offset?: number
);
```

### getDomain <Badge text="^3.0.0" type="tip"/>

Fetches the specified domain.

See the [underlying endpoint](/api/domain#get-domains-id) for more information.

```ts
getDomain(
  id: string
);
```

### createDomain <Badge text="^3.0.0" type="tip"/>

Creates a domain.

See the [underlying endpoint](/api/domain#post-domains) for more information.

```ts
createDomain(
  id: string,
  subdomains?: boolean
);
```

### allowSubdomains <Badge text="^3.0.0" type="tip"/>

Allows subdomains for the specified domain.

See the [underlying endpoint](/api/domain#put-domains-id-subdomains) for more information.

```ts
allowSubdomains(
  id: string
);
```

### disallowSubdomains <Badge text="^3.0.0" type="tip"/>

Disallows subdomains for the specified domain.

See the [underlying endpoint](/api/domain#delete-domains-id-subdomains) for more information.

```ts
disallowSubdomains(
  id: string
);
```

### deleteDomain <Badge text="^3.0.0" type="tip"/>

Deletes the specified domain.

See the [underlying endpoint](/api/domain#delete-domains-id) for more information.

```ts
deleteDomain(
  id: string
);
```

### deleteDomains <Badge text="^3.0.0" type="tip"/>

Deletes the specified domains.

See the [underlying endpoint](/api/domain#delete-domains) for more information.

```ts
deleteDomains(
  ids: string[]
);
```

### getFiles <Badge text="^3.0.0" type="tip"/>

Fetches a list of files. If no user ID is specified, it will fetch all files from all users.

See the [underlying endpoint](/api/file#get-files) for more information.

```ts
getFiles(
  uid?: string,
  limit?: number,
  offset?: number
);
```

### getFile <Badge text="^3.0.0" type="tip"/>

Fetches the specified file.

See the [underlying endpoint](/api/file#get-files-id) for more information.

```ts
getFile(
  id: string
);
```

### editFilename <Badge text="^3.0.0" type="tip"/>

Edits the display name of the specified file.

See the [underlying endpoint](/api/file#put-files-id-name) for more information.

```ts
editFilename(
  id: string,
  name?: string
);
```

### editFileExtension <Badge text="^3.0.0" type="tip"/>

Edits the extension of the specified file.

See the [underlying endpoint](/api/file#put-files-id-extension) for more information.

```ts
editFileExtension(
  id: string,
  extension: string
);
```

### deleteFile <Badge text="^3.0.0" type="tip"/>

Deletes the specified file.

See the [underlying endpoint](/api/file#delete-files-id) for more information.

```ts
deleteFile(
  id: string
);
```

### deleteFiles <Badge text="^3.0.0" type="tip"/>

Deletes the specified files.

See the [underlying endpoint](/api/file#delete-files) for more information.

```ts
deleteFiles(
  ids: string[]
);
```

### deleteAllFiles <Badge text="^3.0.0" type="tip"/>

Deletes all files from the specified user. If no user ID is specified, it will assume the current user. If you're deleting the files of the current user, you must provide the current password to confirm the deletion.

See the [underlying endpoint](/api/file#delete-files-all) for more information.

```ts
deleteAllFiles(
  uid?: string,
  password?: string
);
```

### getInstructions <Badge text="^3.0.0" type="tip"/>

Fetches a list of instructions.

See the [underlying endpoint](/api/instruction#get-instructions) for more information.

```ts
getInstructions(
  limit?: number,
  offset?: number
);
```

### getInstruction <Badge text="^3.0.0" type="tip"/>

Fetches the specified instruction.

See the [underlying endpoint](/api/instruction#get-instructions-id) for more information.

```ts
getInstruction(
  id: string
);
```

### createInstruction <Badge text="^3.0.0" type="tip"/>

Creates an instruction.

See the [underlying endpoint](/api/instruction#post-instructions) for more information.

```ts
createInstruction(
  id: string,
  name: string,
  description: string,
  steps: string[],
  content: string,
  filename?: string
);
```

### editInstructionName <Badge text="^3.0.0" type="tip"/>

Edits the name of the specified instruction.

See the [underlying endpoint](/api/instruction#put-instructions-id-name) for more information.

```ts
editInstructionName(
  id: string,
  name: string
);
```

### editInstructionDescription <Badge text="^3.0.0" type="tip"/>

Edits the description of the specified instruction.

See the [underlying endpoint](/api/instruction#put-instructions-id-description) for more information.

```ts
editInstructionDescription(
  id: string,
  description: string
);
```

### editInstructionFile <Badge text="^3.0.0" type="tip"/>

Edits the file of the specified instruction.

See the [underlying endpoint](/api/instruction#put-instructions-id-file) for more information.

```ts
editInstructionFile(
  id: string,
  content: string,
  filename?: string
);
```

### editInstructionSteps <Badge text="^3.0.0" type="tip"/>

Edits the steps of the specified instruction.

See the [underlying endpoint](/api/instruction#put-instructions-id-steps) for more information.

```ts
editInstructionSteps(
  id: string,
  steps: string[]
);
```

### deleteInstruction <Badge text="^3.0.0" type="tip"/>

Deletes the specified instruction.

See the [underlying endpoint](/api/instruction#delete-instructions-id) for more information.

```ts
deleteInstruction(
  id: string
);
```

### deleteInstructions <Badge text="^3.0.0" type="tip"/>

Deletes the specified instructions.

See the [underlying endpoint](/api/instruction#delete-instructions) for more information.

```ts
deleteInstructions(
  ids: string[]
);
```

### upload <Badge text="^3.0.0" type="tip"/>

Uploads the provided data to Cumulonimbus.

```ts
upload(
  data: string | Buffer | File | Blob | ArrayBuffer,
  type?: string,
);
```
