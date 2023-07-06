---
outline: [2, 3]
---

# Cumulonimbus

## Interfaces, Types, and Subclasses

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
)
```

### getSession <Badge text="^3.0.0" type="tip"/>

Fetches the current session or the specified session of yourself or another user.

```ts
getSession(
  sid?: string,
  uid?: string
)
```
