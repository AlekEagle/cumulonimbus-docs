# Data Structures

Data structures returned from the API.

## List

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
  type: 'user' | 'session' | 'file' | 'domain' | 'instruction';
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
  userId: string;
  size: number;
}
```
