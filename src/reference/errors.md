# Errors

All of the possible error messages that can be returned from the API.

## InvalidEndpoint

```ts
interface InvalidEndpoint {
  code: 'INVALID_ENDPOINT_ERROR';
  message: 'Invalid Endpoint';
}
```

## InsufficientPermissions

```ts
interface InsufficientPermissions {
  code: 'INSUFFICIENT_PERMISSIONS_ERROR';
  message: 'Insufficient Permissions';
}
```

## InvalidUser

```ts
interface InvalidUser {
  code: 'INVALID_USER_ERROR';
  message: 'Invalid User';
}
```

## InvalidUsername

```ts
interface InvalidUsername {
  code: 'INVALID_USERNAME_ERROR';
  message: 'Invalid Username';
}
```

## InvalidPassword

```ts
interface InvalidPassword {
  code: 'INVALID_PASSWORD_ERROR';
  message: 'Invalid Password';
}
```

## PasswordsDoNotMatch

```ts
interface PasswordsDoNotMatch {
  code: 'PASSWORDS_DO_NOT_MATCH_ERROR';
  message: 'Passwords Do Not Match';
}
```

## InvalidEmail

```ts
interface InvalidEmail {
  code: "INVALID_EMAIL_ERROR";
  message: "Invalid Email";
}
```

## InvalidSession

```ts
interface InvalidSession {
  code: 'INVALID_SESSION_ERROR';
  message: 'Invalid Session';
}
```

## InvalidDomain

```ts
interface InvalidDomain {
  code: 'INVALID_DOMAIN_ERROR';
  message: 'Invalid Domain';
}
```

## SubdomainTooLong

```ts
interface SubdomainTooLong {
  code: 'SUBDOMAIN_TOO_LONG_ERROR';
  message: 'Subdomain Too Long';
}
```

## InvalidFile

```ts
interface InvalidFile {
  code: 'INVALID_FILE_ERROR';
  message: 'Invalid File';
}
```

## InvalidInstruction

```ts
interface InvalidInstruction {
  code: 'INVALID_INSTRUCTION_ERROR';
  message: 'Invalid Instruction';
}
```

## SubdomainNotAllowed

```ts
interface SubdomainNotAllowed {
  code: 'SUBDOMAIN_NOT_ALLOWED_ERROR';
  message: 'Subdomain Not Allowed';
}
```

## DomainExists

```ts
interface DomainExists {
  code: 'DOMAIN_EXISTS_ERROR';
  message: 'Domain Exists';
}
```

## UserExists

```ts
interface UserExists {
  code: 'USER_EXISTS_ERROR';
  message: 'User Exists';
}
```

## InstructionExists

```ts
interface InstructionExists {
  code: 'INSTRUCTION_EXISTS_ERROR';
  message: 'Instruction Exists';
}
```

## MissingFields

```ts
interface MissingFields {
  code: 'MISSING_FIELDS_ERROR';
  message: 'Missing Fields';
  fields: string[];
}
```

## Banned

```ts
interface Banned {
  code: 'BANNED_ERROR';
  message: 'Banned';
}
```

## BodyTooLarge

```ts
interface BodyTooLarge {
  code: "BODY_TOO_LARGE_ERROR";
  message: "Body Too Large";
}
```

## RateLimited

```ts
interface RateLimited {
  code: 'RATELIMITED_ERROR';
  message: 'You Have Been Ratelimited. Please Try Again Later.';
}
```

## Internal

```ts
interface Internal {
  code: 'INTERNAL_SERVER_ERROR';
  message: 'Internal Server Error';
}
```
