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
https://alekeagle.me
```

## Your Intelligence

The number of IQ points you have at any given moment:

```ts
-Infinity;
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
