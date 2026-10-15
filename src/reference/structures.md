# Data Structures

The Cumulonimbus API uses consistent structures to streamline parsing data. Below are the structures that Cumulonimbus will respond with.

`TimestampString` represents a date and time in ISO 8601 format.

## List

::: tip Note
Items in this structure will be stripped of extraneous properties. Properties that will not be present in this structure type are marked with a comment in the structure.
:::

```ts
interface List<T> {
  count: number;
  items: T[];
}
```

## User

```ts
interface User {
  id: string;
  username: string;
  email: string; // Omitted in List<T>
  staff: boolean; // Omitted in List<T>
  domain: string; // Omitted in List<T>
  subdomain?: string; // Omitted in List<T>
  verifiedAt?: TimestampString; // Omitted in List<T>
  bannedAt?: TimestampString; // Omitted in List<T>
  createdAt: TimestampString; // Omitted in List<T>
  updatedAt: TimestampString; // Omitted in List<T>
}
```

## Session

```ts
interface Session {
  id: string;
  name: string;
  exp: TimestampString; // Omitted in List<T>
  permissionFlags: number | null; // Omitted in List<T>
  usedAt: TimestampString; // Omitted in List<T>
  createdAt: TimestampString; // Omitted in List<T>
  updatedAt: TimestampString; // Omitted in List<T>
}
```

## Success

```ts
interface Success {
  code: string;
  message: string;
}
```

## Error

```ts
interface Error {
  code: string;
  message: string;
}
```

## InstructionFile

```ts
interface InstructionFile {
  name: string;
  content: string;
}
```

## InstructionStep

```ts
interface InstructionStep {
  action:
    | 'OPEN_URL'
    | 'COPY_TOKEN_TO_CLIPBOARD'
    | 'DOWNLOAD_CONFIG_FILE'
    | 'NOOP';
  content: string;
  file?: InstructionFile;
  url?: string;
}
```

## Instruction

```ts
interface Instruction {
  id: string;
  name: string;
  description: string;
  steps: InstructionStep[]; // Omitted in List<T>
  createdAt: TimestampString; // Omitted in List<T>
  updatedAt: TimestampString; // Omitted in List<T>
}
```

## Domain

```ts
interface Domain {
  id: string;
  subdomains: boolean;
  createdAt: TimestampString; // Omitted in List<T>
  updatedAt: TimestampString; // Omitted in List<T>
}
```

## SuccessfulAuth

```ts
interface SuccessfulAuth {
  token: string;
  exp: TimestampString;
}
```

## File

```ts
interface File {
  id: string;
  name: string;
  createdAt: TimestampString; // Omitted in List<T>
  updatedAt: TimestampString; // Omitted in List<T>
  userID: string; // Omitted in List<T>
  size: number; // Omitted in List<T>
}
```

## SuccessfulUpload

```ts
interface SuccessfulUpload {
  url: string;
  thumbnail: string;
  manage: string;
}
```

## KillSwitch

```ts
interface KillSwitch {
  id: number;
  name: string;
  state: boolean;
}
```

## SecondFactor

```ts
interface SecondFactor {
  id: string;
  name: string;
  type: 'totp' | 'webauthn'; // Omitted in List<T>
  createdAt: TimestampString; // Omitted in List<T>
  updatedAt: TimestampString; // Omitted in List<T>
}
```

## SecondFactorBaseRegistration

```ts
interface SecondFactorBaseRegistration {
  token: string;
  exp: TimestampString;
  type: 'totp' | 'webauthn';
}
```

## SecondFactorTOTPRegistration

```ts
interface SecondFactorTOTPRegistration extends SecondFactorBaseRegistration {
  type: 'totp';
  secret: string;
  algorithm: string;
  digits: number;
  period: number;
}
```

## SecondFactorWebAuthnRegistration

The specific structure for `PublicKeyCredentialCreationOptionsJSON` can be found [on the simplewebauthn typescript type file](https://github.com/MasterKale/SimpleWebAuthn/blob/master/packages/browser/src/types/index.ts#L71-L83)

```ts
interface SecondFactorWebAuthnRegistration
  extends SecondFactorBaseRegistration, PublicKeyCredentialCreationOptionsJSON {
  type: 'webauthn';
}
```

## SecondFactorRegisterSuccess

```ts
interface SecondFactorRegisterSuccess {
  id: string;
  name: string;
  type: 'totp' | 'webauthn';
  backupCodes?: string[];
}
```

## SecondFactorBackupRegisterSuccess

```ts
interface SecondFactorBackupRegisterSuccess {
  codes: string[];
}
```

## ScopedSessionCreate

```ts
interface ScopedSessionCreate extends Session {
  token: string;
}
```

## LogLevel

```ts
interface LogLevel {
  name: string;
}
```
