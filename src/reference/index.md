# Reference

Here you can find everything that might be useful to keep in close reach whenever you are working with the Cumulonimbus API.

## Base URLs

The base URL for API endpoints:

```txt
https://alekeagle.me/api
```

The base URL for fetching thumbnails:

```txt
https://previews.alekeagle.me
```

The base URL for fetching user-generated content:

```txt
https://cdn.alekeagle.me
```

## Kill Switches

The Cumulonimbus API has a number of kill switches that can be toggled on and off by users with staff permissions. These switches can be used to disable certain features of the API in the event of an emergency or to prevent abuse. Kill switches do not affect users with staff permissions. These kill switches are not intended to be used as a solution to long-term problems, but rather as a temporary measure to prevent abuse or to mitigate the impact of an emergency.

- `ACCOUNT_CREATE(0)` - Disables the creation of new accounts.
- `ACCOUNT_MODIFY(1)` - Disables the ability to modify existing accounts.
- `ACCOUNT_DELETE(2)` - Disables the ability to delete accounts.
- `ACCOUNT_EMAIL_VERIFY(3)` - Disables the ability to request email verification emails. (This does not affect system emails that are not related to email verification, e.g. account ban notifications.)
- `ACCOUNT_LOGIN(4)` - Disables the ability to log in.
- `FILE_CREATE(5)` - Disables the ability to upload files.
- `FILE_MODIFY(6)` - Disables the ability to modify files.
- `FILE_DELETE(7)` - Disables the ability to delete files.
- `GLOBAL(8)` - Disables **ALL** API endpoints. This is the most severe kill switch and prevents all API requests from being processed. This switch should only be used in the most severe of emergencies.

For more information on kill switches, see the [Kill Switch Endpoints](/api/killswitches) documentation. Specific endpoints will also have information on how kill switches affect them.

## Second Factor Authentication

The Cumulonimbus API supports two-factor authentication (2FA) using the following methods:

- Time-based One-Time Password (TOTP)
- WebAuthn (FIDO2)
- Backup Codes

## Identity Reverification

::: info Scoped Sessions
This authentication flow does NOT apply to scoped sessions. They do not need to provide a password in the body, and will not receive multi-factor authentication challenges.
:::

Some endpoints require the user to reverify their identity, depending on your account's security settings, it may be a multi-step process. The following steps are taken to reverify the user's identity:

1. The user makes a request to an endpoint that requires reverification (e.g. `PUT /users/me/username`) with the required parameters, as well as their password in the body.
2. If you:
   1. Do not have a second factor enabled, your request will complete successfully, and you will not need to take any further action.
   2. Do have a second factor enabled, you will receive a [`SecondFactorChallengeRequired`](/reference/errors#secondfactorchallengerequired) with all of the required data to complete the challenge.
3. The user makes a second request to the same endpoint, with the required parameters, as well as a `2fa` object in the body containing the required data to complete the challenge, your password is not required in this request. Using `PUT /users/me/username` as an example, the body would look like this:

```json
{
  "2fa": {
    "token": "the token",
    "type": "totp",
    "code": "123456", // Present for types 'totp' or 'backup'
    "response": {
      // WebAuthn response data. (Only present for 'webauthn' type)
    }
  },
  "username": "new-username"
}
```

4. Assuming the response to the second factor challenge is valid and the response token has not expired, your request will complete successfully.

## Session Scopes

The Cumulonimbus API allows for the creation of sessions with specific scopes. These sessions are special in that they do not require the user to reverify their credentials or second factor(s) when making requests to the API. Instead, the session is used to determine the user's permissions and access level. Sessions with scopes are useful for creating long-lived sessions that have specific permissions, such as for automated tasks or administrative purposes. Making a request an endpoint that requires a scope that the session does not have will result in a [InsufficientPermissions](/reference/errors#insufficientpermissions) error.

| Scope Name                    | Bitmask   | Description                                                                                                                                                                                                                          |
| ----------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ALL`                         | `1`       | Grants access to all endpoints. This scope should be used with caution, as it effectively grants full access to the API without the need to reverify the user's credentials or second factor(s).                                     |
| `UPLOAD_FILE`                 | `2`       | Grants access to the [file upload endpoint](/api/file#post-upload).                                                                                                                                                                  |
| `ACCOUNT_READ`                | `4`       | Grants access to read account information. This does not include the ability to view other sessions or view second factor information.                                                                                               |
| `ACCOUNT_MODIFY`              | `8`       | Grants access to modify account information. This does not include the ability to modify other sessions or second factor information.                                                                                                |
| `SECOND_FACTOR_READ`          | `16`      | Grants access to read second factor information. There is no scope for modifying second factors with a scoped session.                                                                                                               |
| `SESSION_READ`                | `32`      | Grants access to read session information.                                                                                                                                                                                           |
| `SESSION_MODIFY`              | `64`      | Grants access to modify session information. Includes the ability to revoke sessions.                                                                                                                                                |
| `SESSION_CREATE`              | `128`     | Grants access to create new sessions. Restrictions for created sessions are explained in detail in the [Session Endpoints](/api/session#post-users-me-sessions) documentation.                                                       |
| `FILE_READ`                   | `256`     | Grants access to read information about files uploaded by the user.                                                                                                                                                                  |
| `FILE_MODIFY`                 | `512`     | Grants access to modify files uploaded by the user. Includes the ability to delete files.                                                                                                                                            |
| `STAFF_READ_ACCOUNTS`         | `1024`    | Grants access to read account information for all users. This does not include the ability to view other sessions or view second factor information. This scope and all following scopes require the user to have staff permissions. |
| `STAFF_MODIFY_ACCOUNTS`       | `2048`    | Grants access to modify account information for all users. This does not include the ability to modify other sessions or second factor information.                                                                                  |
| `STAFF_READ_SECOND_FACTORS`   | `4096`    | Grants access to read second factor information for all users.                                                                                                                                                                       |
| `STAFF_MODIFY_SECOND_FACTORS` | `8192`    | Grants access to modify second factor information for all users.                                                                                                                                                                     |
| `STAFF_READ_SESSIONS`         | `16384`   | Grants access to read session information for all users.                                                                                                                                                                             |
| `STAFF_MODIFY_SESSIONS`       | `32768`   | Grants access to modify session information for all users.                                                                                                                                                                           |
| `STAFF_READ_FILES`            | `65536`   | Grants access to read information about files uploaded by all users.                                                                                                                                                                 |
| `STAFF_MODIFY_FILES`          | `131072`  | Grants access to modify files uploaded by all users. Includes the ability to delete files.                                                                                                                                           |
| `STAFF_MODIFY_DOMAINS`        | `262144`  | Grants access to modify domain information.                                                                                                                                                                                          |
| `STAFF_MODIFY_INSTRUCTIONS`   | `524288`  | Grants access to modify instruction information.                                                                                                                                                                                     |
| `STAFF_MODIFY_KILLSWITCHES`   | `1048576` | Grants access to modify kill switch information.                                                                                                                                                                                     |

## Your Intelligence

The number of IQ points you have at any given moment:

```ts
-Infinity;
```
