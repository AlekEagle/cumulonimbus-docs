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

## EndpointRequiresSecondFactor

```ts
interface EndpointRequiresSecondFactor {
  code: 'ENDPOINT_REQUIRES_SECOND_FACTOR_ERROR';
  message: 'Endpoint Requires Second Factor';
}
```

## InvalidUser

```ts
interface InvalidUser {
  code: 'INVALID_USER_ERROR';
  message: 'Invalid User';
}
```

## UserRequiresSecondFactor

```ts
interface UserRequiresSecondFactor {
  code: 'USER_REQUIRES_SECOND_FACTOR_ERROR';
  message: 'User Requires Second Factor';
}
```

## InvalidUsername

```ts
interface InvalidUsername {
  code: 'INVALID_USERNAME_ERROR';
  message: 'Invalid Username';
}
```

## InvalidSecondFactor

```ts
interface InvalidSecondFactor {
  code: 'INVALID_SECOND_FACTOR_ERROR';
  message: 'Invalid Second Factor';
}
```

## InvalidSecondFactorMethod

```ts
interface InvalidSecondFactorMethod {
  code: 'INVALID_SECOND_FACTOR_METHOD_ERROR';
  message: 'Invalid Second Factor Method';
}
```

## InvalidSecondFactorResponse

```ts
interface InvalidSecondFactorResponse {
  code: 'INVALID_SECOND_FACTOR_RESPONSE_ERROR';
  message: 'Invalid Second Factor Response';
}
```

## SecondFactorChallengeRequired

Documentation for the `challenge` field can be found [here](https://github.com/MasterKale/SimpleWebAuthn/blob/master/packages/types/src/index.ts#L72-L79).

```ts
interface SecondFactorChallengeRequired {
  code: 'SECOND_FACTOR_CHALLENGE_REQUIRED_ERROR';
  message: 'Second Factor Challenge Required';
  token: string;
  exp: number;
  types: ('totp' | 'webauthn' | 'backup')[];
  challenge: any; // Only present if one of the available types is 'webauthn'.
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
  code: 'INVALID_EMAIL_ERROR';
  message: 'Invalid Email';
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
  code: 'BODY_TOO_LARGE_ERROR';
  message: 'Body Too Large';
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

## ServiceUnavailable

```ts
interface ServiceUnavailable {
  code: 'SERVICE_UNAVAILABLE_ERROR';
  message: 'Service Unavailable';
  feature: number;
}
```

## NotImplemented

```ts
interface NotImplemented {
  code: 'NOT_IMPLEMENTED_ERROR';
  message: 'Not Implemented';
}
```
