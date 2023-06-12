# Deprecation Notices

Here lies import information upcoming breaking changes, what to do to prepare for them, what to do when they happen, and when they'll happen. If you have any questions, feel free to ask in the [Discord server](https://alekeagle.com/d) or [send me an email](mailto:cumulonimbus@alekeagle.com).

## PATCH /user endpoint

- **What:** The `PATCH /user` endpoint will be removed.
- **Why:** It's unnecessarily complicated in the backend because it has to check if the user is changing their username, email, or password, and then do different things depending on what they're changing. On top of that, the frontend only allows the end user to change one of those things at a time, so it's not like it's saving them any time.
- **When:** The endpoint will be removed in the next major version, v4.0.0.
- **What to do:** Use the separated endpoints instead. For example, if you want to change your username, use `PATCH /user/username`. If you want to change your email, use `PATCH /user/email`. If you want to change your password, use `PATCH /user/password`. That way it mimics `PATCH /user/domain`.
