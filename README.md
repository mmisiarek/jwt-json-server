Protected resources are listed in `db.json` and they are accessible under `/api` path.

To get token make `POST` to `/auth/login` with body:

```json
{
  "user": "jon",
  "pass": "snow"
}
```

With given token you can access each resource by setting header:

```json
{
  "authorization": "Bearer <TOKEN>"
}
```
