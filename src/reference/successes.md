# Successes

All of the possible success messages that can be returned from the API.

## DeleteUser

```ts
interface DeleteUser {
  code: 'DELETE_USER_SUCCESS';
  message: 'User Successfully Deleted';
}
```

## DeleteUsers

```ts
interface DeleteUsers {
  code: 'DELETE_USERS_SUCCESS';
  message: 'Users Successfully Deleted';
  count: number;
}
```

## DeleteSession

```ts
interface DeleteSession {
  code: 'DELETE_SESSION_SUCCESS';
  message: 'Session Successfully Deleted';
}
```

## DeleteSessions

```ts
interface DeleteSessions {
  code: 'DELETE_SESSIONS_SUCCESS';
  message: 'Sessions Successfully Deleted';
  count: number;
}
```

## DeleteDomain

```ts
interface DeleteDomain {
  code: 'DELETE_DOMAIN_SUCCESS';
  message: 'Domain Successfully Deleted';
}
```

## DeleteDomains

```ts
interface DeleteDomains {
  code: 'DELETE_DOMAINS_SUCCESS';
  message: 'Domains Successfully Deleted';
  count: number;
}
```

## DeleteInstruction

```ts
interface DeleteInstruction {
  code: 'DELETE_INSTRUCTION_SUCCESS';
  message: 'Instruction Successfully Deleted';
}
```

## DeleteInstructions

```ts
interface DeleteInstructions {
  code: 'DELETE_INSTRUCTIONS_SUCCESS';
  message: 'Instructions Successfully Deleted';
  count: number;
}
```

## DeleteFile

```ts
interface DeleteFile {
  code: 'DELETE_FILE_SUCCESS';
  message: 'File Successfully Deleted';
}
```

## DeleteFiles

```ts
interface DeleteFiles {
  code: 'DELETE_FILES_SUCCESS';
  message: 'Files Successfully Deleted';
  count: number;
}
```

## SendVerificationEmail

```ts
interface SendVerificationEmail {
  code: 'SEND_VERIFICATION_EMAIL_SUCCESS';
  message: 'Verification Email Successfully Sent';
}
```
