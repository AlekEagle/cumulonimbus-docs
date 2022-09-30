# Deprecation Notices

Here lies import information upcoming breaking changes, what to do to prepare for them, what to do when they happen, and when they'll happen. If you have any questions, feel free to ask in the [Discord server](https://alekeagle.com/d) or [send me an email](mailto:cumulonimbus@alekeagle.com).

## Emails for login

On September 30th, 2022, using an email in the `user` field of the `POST /user/session` is deprecated and will be removed in the future. To prepare, make sure you start using your username instead of your email. When this happens, emails will no longer resolve users and act as if the user doesn't exist, and will return the [InvalidUser](/reference/structures/errors.md#invaliduser) error.

## Special characters in usernames

On September 30th, 2022, the allowed characters in usernames will be changed to only allow alphanumeric characters, underscores, dashes and periods. To prepare, make sure you don't have any usernames with special characters in them. When this happens, usernames not already changed will be automatically changed to match the new rules. Creating an account with an invalid username or changing your username to an invalid username will act as if you did not fill out the username field and return the [MissingFields](/reference/structures/errors.md#missingfields) error.

## Emails as usernames

On September 30th, 2022, having an email as your username violate the upcoming username rules and will be changed, but not in the same way as other usernames. Refer to [Special characters in usernames](#special-characters-in-usernames) for preparation. When this happens, usernames that are emails will be changed to use the portion of the email before the `@` symbol. For example, `john.doe@example.com` will become `john.doe`. Additional changes that will happen are the same as [Special characters in usernames](#special-characters-in-usernames).

## POST /user/session fields

On September 30th, 2022, the `user` and `pass` fields of the `POST /user/session` endpoint will be renamed to `username` and `password`. To prepare, make sure you start using the new fields. When this happens, the old fields will no longer work and will respond with the [InvalidFields](/reference/structures/errors.md#invalidfields) error specifying the new fields.
