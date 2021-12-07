# Structures

The common structure of errors and data returned from the API.

## Data Structures

### User

```ts
interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  staff: string;
  domain: string;
  subdomain: string;
  bannedAt: string;
  createdAt: string;
  updatedAt: string;
}
```

### Session

```ts
interface Session {
  iat: number;
  exp: number;
  name: string;
}
```

### SessionList

```ts
interface SessionList {
  count: number;
  sessions: Session[];
}
```

### Success

```ts
interface Success {
  success: boolean;
  message?: string;
}
```

### DeleteBulk

```ts
interface DeleteBulk {
  count: number;
  type: 'user' | 'session' | 'file' | 'domain' | 'instruction';
}
```

### Domain

```ts
interface Domain {
  domain: string;
  allowsSubdomains: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### DomainList

```ts
interface DomainList {
  count: number;
  domains: Domain[];
}
```

### Error

```ts
interface Error {
  code: string;
  message: string;
}
```

### SuccessfulAuth

```ts
interface SuccessfulAuth {
  token: string;
  exp: number;
}
```

### File

```ts
interface File {
  filename: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  size: number;
}
```

### FileList

```ts
interface FileList {
  count: number;
  files: File[];
}
```

## Errors

The various errors you can receive from the API when an error is returned. The interface all of these implement is the [Error](#error) structure above.

### InvalidSession

Returned when your token is invalid or your session has expired for that token. Either way the solution is to generate a new token.

```ts
class InvalidSession implements Error {
  public readonly code: string = 'INVALID_SESSION_ERROR';
  public readonly message: string = 'Invalid Session';
}
```

### InvalidUser

Returned when you attempt to access, edit, or delete a user that doesn't exist, or when someone attempts to create a new session for an account that doesn't exist.

```ts
class InvalidUser implements Error {
  public readonly code: string = 'INVALID_USER_ERROR';
  public readonly message: string = 'Invalid User';
}
```

### InvalidPassword

Returned when the password that is provided doesn't match the password in the system.

```ts
class InvalidPassword implements Error {
  public readonly code: string = 'INVALID_PASSWORD_ERROR';
  public readonly message: string = 'Invalid Password';
}
```

### Permissions

Returned when the authenticated user's permission is insufficient for the action they are trying to perform.

```ts
class Permissions implements Error {
  public readonly code: string = 'INSUFFICIENT_PERMISSIONS_ERROR';
  public readonly message: string = 'Missing Permissions';
}
```

### UserExists

Returned when trying to create a new user that already exists with a provided email or username.

```ts
class UserExists implements Error {
  public readonly code: string = 'USER_EXISTS_ERROR';
  public readonly message: string = 'User Already Exists';
}
```

### MissingFields

Returned when you do not provide a required parameter in a request.

```ts
class MissingFields implements Error {
  public readonly code: string = 'MISSING_FIELDS_ERROR';
  public readonly message: string = 'Missing Fields';
  public fields: string[];
}
```

### InvalidDomain

Returned when you try to request a domain that doesn't exist.

```ts
class InvalidDomain implements Error {
  public readonly code: string = 'INVALID_DOMAIN_ERROR';
  public readonly message: string = 'Invalid Domain';
}
```

### InvalidSubdomain

Returned when you try to set a subdomain that is longer than 63 characters.

```ts
class InvalidSubdomain implements Error {
  public readonly code: string = 'INVALID_SUBDOMAIN_ERROR';
  public readonly message: string = 'Invalid Subdomain';
  public parsedDomain: string;
}
```

### SubdomainNotSupported

Returned when you try to use a subdomain on a domain that does not support a subdomain.

```ts
class SubdomainNotSupported implements Error {
  public readonly code: string = 'SUBDOMAIN_NOT_SUPPORTED_ERROR';
  public readonly message: string = 'Domain Does Not Support Using A Subdomain';
}
```

### FileMissing

Returned when trying to interact with a file that does not exist.

```ts
class FileMissing implements Error {
  public readonly code: string = 'FILE_NOT_FOUND_ERROR';
  public readonly message: string = 'File Not Found';
}
```

### SessionMissing

Returned when trying to interact with a session that does not exist.

```ts
class SessionMissing implements Error {
  public readonly code: string = 'SESSION_NOT_FOUND_ERROR';
  public readonly message: string = 'Session Not Found';
}
```

### Banned

Returned when a banned user is trying to interact with the API in any way.

```ts
class Banned implements Error {
  public readonly code: string = 'BANNED_ERROR';
  public readonly message: string = 'Account Banned';
}
```

### Internal

Returned when the server encounters an internal server error.

```ts
class Internal implements Error {
  public readonly code: string = 'INTERNAL_SERVER_ERROR';
  public readonly message: string = 'Internal Server Error';
}
```

### Generic

A generic error for when the specific error is not handled.

```ts
class Generic implements Error {
  public readonly code: string = 'GENERIC_ERROR';
  public message: string;
}
```
