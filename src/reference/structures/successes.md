# Successes

The various success payloads you can receive from the API when the it successfully completes an action but does not return a payload. The interface all of these implement is the [Success](/reference/structures/data.md#success) structure.

## Generic

```ts
class Generic implements Success {
  public readonly code: string = 'GENERIC_SUCCESS';
  public message?: string;
}
```
