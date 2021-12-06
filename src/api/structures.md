# Response Structures

## Table of Contents

[[toc]]

## Normal User Structure

```json
{
  "id": "1603135823114",
  "username": "joe",
  "displayName": "joe",
  "staff": "",
  "createdAt": "2020-10-19T19:30:23.114Z",
  "updatedAt": "2020-10-19T22:37:50.626Z",
  "bannedAt": null,
  "domain": "alekeagle.me",
  "subdomain": ""
}
```

## Private/Self User Structure

```json
{
  "id": "1603135823114",
  "username": "joe",
  "displayName": "joe",
  "email": "joe@example.com",
  "staff": "",
  "apiToken": "MTYwMzEzNTgyMzExNA.NjI1.dUJxTGZndVZGU0UzNHJOVEpkdUFaeUdV",
  "domain": "alekeagle.me",
  "subdomain": "",
  "bannedAt": null,
  "createdAt": "2020-10-19T19:30:23.114Z",
  "updatedAt": "2020-10-19T22:37:50.626Z"
}
```

## Average 401 Unauthorized Response

```json
{
  "error": "No Token Provided"
}
```

## Average 403 Forbidden Response

```json
{
  "error": "Missing Permissions"
}
```

## Average 400 Bad Request Response

```json
{
  "error": "Bad Request",
  "missing": ["missing", "parameters"]
}
```

## Domain Structure

```json
{
  "domain": "alekeagle.me",
  "allowsSubdomains": true,
  "createdAt": "2019-10-22T23:54:41.974Z",
  "updatedAt": "2019-10-22T23:54:41.974Z"
}
```
