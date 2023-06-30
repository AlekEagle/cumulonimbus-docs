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
  bannedAt?: string; // Omitted in List<T>
  createdAt: string; // Omitted in List<T>
  updatedAt: string; // Omitted in List<T>
}
```

## Session

```ts
interface Session {
  id: number;
  exp: number; // Omitted in List<T>
  sub: string; // Omitted in List<T>
  name: string;
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
