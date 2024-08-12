# Next.js SPA + Neon Postgres + Drizzle

## Demo

https://next-spa-drizzle.vercel.app/

## Endpoints

### `/users`

| Method | Description   | Request Body                              | cURL Example                                                                                                                                         |
| ------ | ------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | Get all users | -                                         | `curl https://next-spa-drizzle.vercel.app/api/users`                                                                                                 |
| POST   | Create a user | `{ "name": "string", "email": "string" }` | `curl -X POST https://next-spa-drizzle.vercel.app/api/users -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}'` |
| PATCH  | Update a user | `{ "id": number, ...updateData }`         | `curl -X PATCH https://next-spa-drizzle.vercel.app/api/users -H "Content-Type: application/json" -d '{"id":1,"name":"John Updated"}'`                |
| DELETE | Delete a user | `{ "id": number }`                        | `curl -X DELETE https://next-spa-drizzle.vercel.app/api/users -H "Content-Type: application/json" -d '{"id":1}'`                                     |

### `/users/[id]`

| Method | Description            | URL Params | Request Body                              | cURL Example                                                                                                                     |
| ------ | ---------------------- | ---------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| GET    | Get a specific user    | id=number  | -                                         | `curl https://next-spa-drizzle.vercel.app/api/users/1`                                                                           |
| PATCH  | Update a specific user | id=number  | `{ "name": "string", "email": "string" }` | `curl -X PATCH https://next-spa-drizzle.vercel.app/api/users/1 -H "Content-Type: application/json" -d '{"name":"John Updated"}'` |
| DELETE | Delete a specific user | id=number  | -                                         | `curl -X DELETE https://next-spa-drizzle.vercel.app/api/users/1`                                                                 |
