# Data Structures

The Cumulonimbus API uses consistent structures to streamline parsing data. Below are the structures that Cumulonimbus will respond with.

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
  verifiedAt?: string; // Omitted in List<T>
  bannedAt?: string; // Omitted in List<T>
  createdAt: string; // Omitted in List<T>
  updatedAt: string; // Omitted in List<T>
}
```

## Session

```ts
interface Session {
  id: number;
  name: string;
  exp: number; // Omitted in List<T>
  permissionFlags: number | null; // Omitted in List<T>
  usedAt: string; // Omitted in List<T>
  createdAt: string; // Omitted in List<T>
  updatedAt: string; // Omitted in List<T>
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

## Instruction

```ts
interface Instruction {
  id: string;
  name: string;
  description: string;
  steps: string[]; // Omitted in List<T>
  filename: string; // Omitted in List<T>
  fileContent: string; // Omitted in List<T>
  createdAt: string; // Omitted in List<T>
  updatedAt: string; // Omitted in List<T>
}
```

## Domain

```ts
interface Domain {
  id: string;
  subdomains: boolean;
  createdAt: string; // Omitted in List<T>
  updatedAt: string; // Omitted in List<T>
}
```

## SuccessfulAuth

```ts
interface SuccessfulAuth {
  token: string;
  exp: number;
}
```

## File

```ts
interface File {
  id: string;
  name: string;
  createdAt: string; // Omitted in List<T>
  updatedAt: string; // Omitted in List<T>
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
  createdAt: string; // Omitted in List<T>
  updatedAt: string; // Omitted in List<T>
}
```

## SecondFactorBaseRegistration

```ts
interface SecondFactorBaseRegistration {
  token: string;
  exp: number;
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

The specific structure for `PublicKeyCredentialCreationOptionsJSON` can be found [here](https://github.com/MasterKale/SimpleWebAuthn/blob/master/packages/types/src/index.ts#L56-L66)

```ts
interface SecondFactorWebAuthnRegistration
  extends SecondFactorBaseRegistration,
    PublicKeyCredentialCreationOptionsJSON {
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
