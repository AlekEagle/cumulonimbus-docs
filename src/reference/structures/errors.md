# Errors

The various errors you can receive from the API when an error is returned. The interface all of these implement is the [Error](/reference/structures/data.md#error) structure.

## Permissions

Returned when the authenticated user's permission is insufficient for the action they are trying to perform.

```ts
class Permissions implements Error {
  public readonly code: string = 'INSUFFICIENT_PERMISSIONS_ERROR';
  public readonly message: string = 'Missing Permissions';
}
```

## InvalidUser

Returned when you attempt to access, edit, or delete a user that doesn't exist, or when someone attempts to create a new session for an account that doesn't exist.

```ts
class InvalidUser implements Error {
  public readonly code: string = 'INVALID_USER_ERROR';
  public readonly message: string = 'Invalid User';
}
```

## InvalidPassword

Returned when the password that is provided doesn't match the password in the system.

```ts
class InvalidPassword implements Error {
  public readonly code: string = 'INVALID_PASSWORD_ERROR';
  public readonly message: string = 'Invalid Password';
}
```

## InvalidSession

Returned when your token is invalid or your session has expired for that token. Either way the solution is to generate a new token.

```ts
class InvalidSession implements Error {
  public readonly code: string = 'INVALID_SESSION_ERROR';
  public readonly message: string = 'Invalid Session';
}
```

## InvalidDomain

Returned when you try to request a domain that doesn't exist.

```ts
class InvalidDomain implements Error {
  public readonly code: string = 'INVALID_DOMAIN_ERROR';
  public readonly message: string = 'Invalid Domain';
}
```

## InvalidSubdomain

Returned when you try to set a subdomain that is longer than 63 characters.

```ts
class InvalidSubdomain implements Error {
  public readonly code: string = 'INVALID_SUBDOMAIN_ERROR';
  public readonly message: string = 'Invalid Subdomain';
  public parsedDomain: string;
}
```

## InvalidFile

Returned when trying to interact with a file that does not exist.

```ts
class InvalidFile implements Error {
  public readonly code: string = 'INVALID_FILE_ERROR';
  public readonly message: string = 'Invalid File';
}
```

## InvalidInstruction

Returned when trying to interact with a instruction that does not exist.

```ts
class InvalidInstruction implements Error {
  public readonly code: string = 'INVALID_INSTRUCTION_ERROR';
  public readonly message: string = 'Invalid Instruction';
}
```

## InvalidEndpoint

Returned when you are stupid and somehow fuck up the API endpoint.

```ts
class InvalidEndpoint implements Error {
  public readonly code: string = 'ENDPOINT_NOT_FOUND_ERROR';
  public readonly message: string = 'Endpoint Not Found';
}
```

## SubdomainNotSupported

Returned when you try to use a subdomain on a domain that does not support a subdomain.

```ts
class SubdomainNotSupported implements Error {
  public readonly code: string = 'SUBDOMAIN_NOT_SUPPORTED_ERROR';
  public readonly message: string = 'Domain Does Not Support Using A Subdomain';
}
```

## DomainExists

Returned when trying to create a new domain that already exists with the provided domain.

```ts
class DomainExists implements Error {
  public readonly code: string = 'DOMAIN_EXISTS_ERROR';
  public readonly message: string = 'Domain Already Exists';
}
```

## UserExists

Returned when trying to create a new user that already exists with a provided email or username.

```ts
class UserExists implements Error {
  public readonly code: string = 'USER_EXISTS_ERROR';
  public readonly message: string = 'User Already Exists';
}
```

## MissingFields

Returned when you do not provide a required parameter in a request.

```ts
class MissingFields implements Error {
  public readonly code: string = 'MISSING_FIELDS_ERROR';
  public readonly message: string = 'Missing Fields';
  public fields: string[];
}
```

## SessionMissing

Returned when trying to interact with a session that does not exist.

```ts
class SessionMissing implements Error {
  public readonly code: string = 'SESSION_NOT_FOUND_ERROR';
  public readonly message: string = 'Session Not Found';
}
```

## Banned

Returned when a banned user is trying to interact with the API in any way.

```ts
class Banned implements Error {
  public readonly code: string = 'BANNED_ERROR';
  public readonly message: string = 'Account Banned';
}
```

## Internal

Returned when the server encounters an internal server error.

```ts
class Internal implements Error {
  public readonly code: string = 'INTERNAL_SERVER_ERROR';
  public readonly message: string = 'Internal Server Error';
}
```

## Generic

A generic error for when the specific error is not handled.

```ts
class Generic implements Error {
  public readonly code: string = 'GENERIC_ERROR';
  public message?: string;
}
```
