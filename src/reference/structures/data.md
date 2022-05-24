# Data Structures

Data structures returned from the API.

## List

```ts
interface List<T> {
  count: number; // Count will be the total of items that you can view, not the length of the items object.
  items: T[];
}
```

## User

```ts
interface User {
  id: string;
  username: string;
  email: string;
  staff: boolean;
  domain: string;
  subdomain: string;
  bannedAt: string;
  createdAt: string;
  updatedAt: string;
}
```

## Session

```ts
interface Session {
  iat: number; // Used as session ID
  exp: number;
  sub: string;
  name: string;
}
```

## Success

```ts
interface Success {
  code: string;
  message?: string;
}
```

## DeleteBulk

```ts
interface DeleteBulk {
  count: number;
  type: "user" | "session" | "file" | "domain" | "instruction";
}
```

## Domain

```ts
interface Domain {
  domain: string; // Used as domain ID
  allowsSubdomains: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## DomainSlim

Similar to Domain, but without the `createdAt` and `updatedAt` fields.

```ts
interface DomainSlim {
  domain: string; // Used as domain ID
  allowsSubdomains: boolean;
}
```

## Error

```ts
interface Error {
  code: string;
  message: string;
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
  filename: string; // Used as file ID
  createdAt: string;
  updatedAt: string;
  userID: string;
  size: number;
}
```

## Instruction

```ts
interface Instruction {
  name: string; // Used as instruction ID
  steps: string[];
  filename: string;
  fileContent: string;
  description: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
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
