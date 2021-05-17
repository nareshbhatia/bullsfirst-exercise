# Exercise 3: Authentication

This exercise implements user authentication using access tokens. It also
introduces GraphQL to make server calls. Finally, it introduces the Mock Service
Worker library to mock the server calls.

# Concepts

The Bullsfirst server identifies its users by their email address. It also knows
every user's full name. Here's the data structure for a Bullsfirst user:

```ts
export interface User {
  email: string;
  name: string;
}
```

Users can sign up with the Bullsfirst server by providing three pieces of
information: their email address, full name and a password. Here's the data
structure that defines the sign-up information:

```ts
export interface UserInfo extends User {
  password: string;
}
```

Once a user is signed up, they can signin to Bullsfirst using their credentials:

```ts
export interface Credentials {
  email: string;
  password: string;
}
```

If the email and password match, the server returns the user object along with a
unique access token. For example:

```json
{
  "user": {
    "name": "John Smith",
    "email": "jsmith@example.com"
  },
  "accessToken": "2c2977af-401e-47f2-a867-840ce9760572"
}
```

From then on, the client needs to send the access token in the request header
for the server to know which user is sending the request.

Finally, when the user signs out, the server discards the access token. The
client can no longer make requests using the same access token.

The Bullsfirst client will save the access token in localStorage. When the
client starts up, and it finds the access token in localStorage, there is no
need to sign in to the sever. The saved access token can be directly used in
server calls to get data or perform actions.

## General Guidelines

- Implement the sign-up page as shown in the
  [visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
  The design is very similar to the _Sign In_ page, with two additional fields.
  The responsive requirements are also the same.
- When the sign-up form is submitted, the client should send the `UserInfo` to
  the server. The server should create a new user and return a user object along
  with an access token. Client should save the access token in localStorage and
  use it in subsequent requests. It should then redirect to the accounts page.
- Note that server calls in this exercise should be mocked using the Mock
  Service Worker.
- The Accounts page should show the name of the signed-in user and provide a
  sign-out button.
- When the user clicks on the sign-out button, the client should send a sign-out
  request to the server and wipe out its access token from localStorage.
- The user should be able to sign back in again from the sign-in page. On a
  successful sign in, the server should return a user object along with a
  freshly created access token.
- If the user tries to access a secure page such as '/accounts' directly, and
  they are not signed in to Bullsfirst, they should be redirected to the signin
  page. After a successful sign in, they should be directed back to the accounts
  page.
- If the user tries to access a secure page such as '/accounts' directly, and
  they are signed in to Bullsfirst, they should be shown the accounts page
  without being redirected to the signin page.
- Make sure you have good unit test coverage.
- Update the authentication integration test to verify the entire authentication
  process, from sign-up to sign-out and sign-in.
- Attach screenshots of the sign-up page to your pull request to show responsive
  behavior.
  - mobile (460 x 800)
  - desktop (1024 x 800)

## Dependencies

Version numbers noted are at the time of this writing.

1. @apollo/client (3.3.18)
2. graphql (15.5.0)
3. react-icons (^4.2.0)
4. uuid (8.3.2)
5. @types/uuid (8.3.0) - dev dependency

# References

The same authentication flow described in this exercise has been implemented in
[accelerated-news](https://github.com/PublicisSapient/accelerated-news). The
only difference is that accelerated-news uses REST instead of GraphQL, but the
basic concepts still apply.
