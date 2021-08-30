# Exercise 4: Authentication - Sign Up

This exercise implements user signup workflow. It also introduces persistence of
users and access tokens on the mock server. Please see exercise 3 for the basics
of the authentication workflow.

> Note: [accelerated-news](https://github.com/PublicisSapient/accelerated-news)
> implements the same authentication flow as described in Exercise 3, including
> the persistence of mock users and access tokens. The only difference is that
> accelerated-news uses REST instead of GraphQL. When in doubt, look at the
> accelerated-news implementation and replicate it.

## Implementing the sign-up functionality

- Implement the sign-up page as shown in the
  [visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
  The design is very similar to the _Sign In_ page, with two additional fields.
  The responsive requirements are also the same.

- Copy the SignUp mutation from
  `/code/src/pages/SignUpPage/SignUpPage.query.graphql` to your repo. Note that
  this mutation accepts `SignUpInput` and returns `UserInfoFields` which are
  described in `/src/graphql/fragments.graphql`.

- Generate the code for the mutation by running `graphql:codegen`.

- When the sign-up form is submitted, the client should send the `SignUpInput`
  to the server. The mock server should intercept the request and create a new
  user with a unique `id` and save it in localStorage. Use the `uuid` library to
  generate the unique id. Make sure that the mock server can save multiple
  users. Also make sure that all keys saved in localStorage by the mock server
  are prefixed with `mock`. This allows us to distinguish client keys from
  server keys.

- After creating the new user, the mock server should return a `UserInfo` object
  containing the `User` object and a unique access token. Use the `uuid` library
  to generate the token. Also save the token in localStorage and associate it
  with the user. You will need to use this association in future requests from
  the client which will only have the access token in the `Authorization`
  header.

- Modify the `SignIn` method of the mock server to retrieve the user from local
  storage instead of the hard-coded user, John Smith.

- Make sure you have good unit test coverage.

- Update the authentication integration test to verify that the entire
  authentication workflow, from sign-up to sign-out to sign-in, is working
  correctly.

- Attach screenshots of the sign-up page to your pull request to show responsive
  behavior.
  - mobile (460 x 800)
  - desktop (1024 x 800)
