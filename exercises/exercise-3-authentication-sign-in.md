# Exercise 3: Authentication - Sign In

This exercise implements user authentication using access tokens. For now, we
will implement the sign-in portion of the authentication workflow. The next
exercise will implement the sign-up workflow.

We will use GraphQL to make server calls. To accomplish this, we will introduce
a number of GraphQL tools and libraries:

1. The React app will use
   [Apollo GraphQL Client](https://www.apollographql.com/docs/react/) to make
   server calls.
2. We will use the [Mock Service Worker](https://mswjs.io/) library to mock the
   GraphQL server.
3. We will shift from manually coding model objects to auto-generating them from
   the GraphQL schema. For this we will use the
   [GraphQL Code Generator](https://www.graphql-code-generator.com/).

Before diving into the implementation, let's understand the authentication
workflow using access tokens.

## Authentication Workflow

The Bullsfirst server identifies its users by their email address. In addition,
it creates a unique identifier for every new user when they sign up. This gives
users the ability to change their email address without losing their account
data. Lastly, Bullsfirst knows every user's full name. Here's the data structure
for a Bullsfirst user:

```ts
export interface User {
  id: string;
  email: string;
  name: string;
}
```

Users can sign up with the Bullsfirst server by providing three pieces of
information: their email address, full name and a password. Here's the data
structure that defines the sign-up input:

```ts
export type SignUpInput = {
  email: string;
  name: string;
  password: string;
};
```

Once a user is signed up, they can signin to Bullsfirst using their credentials:

```ts
export interface Credentials {
  email: string;
  password: string;
}
```

If the email and password match, the server returns a `UserInfo` object
consisting of the user object along with a unique access token:

```ts
export type UserInfo = {
  user: User;
  accessToken: string;
};
```

Here's an example of the UserInfo object:

```json
{
  "user": {
    "id": "8c8726cb-7f8a-4ebd-b5ec-3ea5a2c144ab",
    "name": "John Smith",
    "email": "jsmith@example.com"
  },
  "accessToken": "2c2977af-401e-47f2-a867-840ce9760572"
}
```

The client should save the access token in localStorage and send it back in the
request header for all future requests. This tells the server which user is
sending the request. Here's what the `Authorization` header should look like:

```text
authorization: Bearer 2c2977af-401e-47f2-a867-840ce9760572
```

Finally, when the user signs out, the server discards the access token. The
client can no longer make requests using the same access token.

As mentioned above, the Bullsfirst client saves the access token in
localStorage. When the client starts up, and it finds the access token in
localStorage, there is no need to sign in to the sever. The SignIn page should
automatically redirect to the Accounts page. The saved access token can be used
in server calls to get account data and perform actions.

## Implementing authentication

- Start by adding the following modules to Bullsfirst client:

```sh
npm install graphql @apollo/client apollo-link-scalars graphql-scalars uuid react-icons
npm install --save-dev @types/uuid @graphql-codegen/cli @graphql-codegen/typed-document-node @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/introspection

# or

yarn add graphql @apollo/client apollo-link-scalars graphql-scalars uuid react-icons
yarn add -D @types/uuid @graphql-codegen/cli @graphql-codegen/typed-document-node @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/introspection
```

- Add the following script to the `scripts` section in package.json:

```json
"graphql:codegen": "graphql-codegen --config codegen.yml",
```

- Create a new file at `/src/models/User.ts` and add the user model to it:

```ts
export interface User {
  id: string;
  email: string;
  name: string;
}
```

- Rest of the models will be generated from the GraphQL schema and operations.
  To accomplish this, copy the following files from this repo to your Bullsfirst
  repo. Note that the `/code` folder in this repo is structured to mimic the
  root folder of your Bullsfirst repo.

  - Copy `/code/schema.graphql` to the root folder in your repo. This is the
    GraphQL schema for the Bullsfirst app which will normally be provided by the
    GraphQL server.
  - Copy `/code/src/pages/SignInPage/SignInPage.query.graphql` to your repo.
    This is the GraphQL mutation for signing in. Note that this mutation uses a
    GraphQL _fragment_ called `UserInfoFields` as the return value from the
    mutation. We will copy the definition of this fragment in the next step.
  - Copy all files under `/code/src/graphql` to your repo. The important file
    here is `fragments.graphql` which defines the `UserInfoFields` fragment and
    several other fragments that will be used in subsequent exercises.
  - Copy `/code/src/utils/GraphQlUtils.ts` to your repo. This file contains the
    initialization for the Apollo Client.
  - Copy `/code/src/test/test-utils.tsx` to your repo. This file initializes the
    Apollo Client for tests.
  - Copy `/code/codegen.yml` to the root folder in your repo. This file
    specifies the code-generation configuration.
  - Add `src/graphql/schema.json` to `.prettierignore`.

- Now generate TypeScript code based on the files added above.

```sh
npm run graphql:codegen

# or

yarn graphql:codegen
```

- The above step generates the following file in your repo:
  `/src/graphql/generated.ts`. Review the code in this file. It contains
  TypeScript types and other structures that we will use to execute GraphQL
  queries and mutations.

- One of the types generated in the above file is `Credentials` (because it was
  defined in the GraphQL schema). So we no longer need the manually defined type
  with the same name at `/src/models/Credentials.ts`. Go ahead and delete that
  file.

- Now let's set up the Apollo Client library to make server calls. Start by
  adding an `ApolloProvider` in index.tsx. See below.

```tsx
import { ApolloProvider } from '@apollo/client';
import { AuthContextProvider, EnvProvider } from './contexts';
import { GraphQlUtils } from './utils';

// Create Apollo Client
const apolloClient = GraphQlUtils.createApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <EnvProvider>
          <ApolloProvider client={apolloClient}>
            <AuthContextProvider>
              <Router>
                <App />
              </Router>
            </AuthContextProvider>
          </ApolloProvider>
        </EnvProvider>
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
```

- Review `/src/utils/GraphQlUtils.ts`. Note that `authlink` is configured to
  send an `authorization` header in any request if localStorage has a previously
  saved access token. You can find further details
  [here](https://www.apollographql.com/docs/react/networking/authentication/#header).

- Currently, the `handleSubmit()` method of the SignIn page redirects directly
  to the Accounts page without doing any authentication. Let's change that.
  `handleSubmit()` should now make a server call to sign in and get an access
  token. This server call is a GraphQL mutation that was defined in
  `SignInPage.query.graphql` and generated in `/src/graphql/generated.ts`. The
  code below imports the generated mutation and calls it in `handleSubmit`:

```tsx
import { useMutation } from '@apollo/client';
import { Credentials, SignInDocument } from '../../graphql';

export const SignInPage = () => {
  ...
  const [signIn, { error }] = useMutation(SignInDocument);

  const handleSubmit = async (credentials: Credentials) => {
    try {
      const result = await signIn({ variables: { credentials } });
      if (result.data) {
        const { user, accessToken } = result.data.signIn;
        AuthService.setAccessToken(accessToken);
        setAuthState({ ...authState, user });
      }
    } catch (e) {
      // eat error because it is already captured in useMutation result
    }
  };
  ...
};
```

- Finally, add a `useEffect` to the SignIn component to monitor
  `authState` and if a user is present, redirect to `/accounts`. See below:

```ts
// redirect if user is already logged in
useEffect(() => {
  if (authState.user) {
    navigate('/accounts');
  }
}, [authState.user, navigate]);
```

- What's remaining now is to mock the server so that the credentials can be
  verified, and an access token can be returned. To do this, first setup MSW
  handlers to intercept GraphQL requests. See
  [MSW docs](https://mswjs.io/docs/getting-started/mocks/graphql-api).
- Add a `SignIn` handler to verify some hard-coded credentials. For example:

```ts
/** sign in */
graphql.mutation('SignIn', (req, res, ctx) => {
  const { credentials } = req.variables;
  const { email, password } = credentials;

  const isAuthenticated = email === 'jsmith@example.com' && password === 'cool';
  if (!isAuthenticated) {
    return res(
      ctx.errors([
        {
          message: 'Email or password did not match',
          errorType: 'Unauthorized',
        },
      ])
    );
  }

  return res(
    ctx.data({
      signIn: {
        __typename: 'UserInfo',
        user: {
          __typename: 'User',
          id: '8c8726cb-7f8a-4ebd-b5ec-3ea5a2c144ab',
          name: 'John Smith',
          email: 'jsmith@example.com',
        },
        accessToken: uuidv4(),
      },
    })
  );
});
```

- Note that we are returning `__typename` fields in the response to indicate the
  types of objects that are returned. These type names are used in by the Apollo
  Client to properly cache the objects. The Apollo server injects type names
  automatically, however, in the mock server we will have to do this manually.

- Verify that you can now signin through the front-end using the hard-coded
  credentials. The returned access token should be stored in localStorage, and
  the app should redirect to the Accounts page.
- Install the
  [Apollo Client Devtools extension](https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm)
  in your Chrome browser. Inspect your Apollo Client cached data to see how the
  UserInfo object is cached.

Now that you have the basic signin flow working, implement the following
requirements:

- The Accounts page should show the name of the signed-in user, and a sign-out
  button.
- When the user clicks on the sign-out button, the client should send a sign-out
  request to the server and wipe out its access token from localStorage. Let the
  server return the user's access token in response to the sign out request.
- If the user tries to access a secure page such as '/accounts' directly, and
  they are not signed in to Bullsfirst, they should be redirected to the signin
  page. After a successful sign in, they should be directed back to the accounts
  page.
- If the user tries to access a secure page such as '/accounts' directly, and
  they are signed in to Bullsfirst, they should be shown the accounts page
  without being redirected to the signin page.
- If the user is on the home page, and the localStorage already has a saved
  access token, then the user should not have to sign in. Clicking on the signin
  button should take them straight to the accounts page.
- For both the above features to work, the application should fetch the
  `UserInfo` from the server on startup - provided that the access token is
  saved in localStorage. For this, you will have to run the GetUser query on
  application startup. Copy `/code/src/App.query.graphql` to your repo and run
  the query from `App.tsx`. You will need to use the `skip` option in `useQuery`
  to prevent the query from running if the access token is not present in
  localStorage.

Finally,

- Make sure you have good unit test coverage.
- Update the authentication integration test to verify that the signin workflow
  is working correctly.

## References

The same authentication flow described in this exercise has been implemented in
[accelerated-news](https://github.com/PublicisSapient/accelerated-news). The
only difference is that accelerated-news uses REST instead of GraphQL, but the
basic concepts still apply.

For more information on GraphQL queries and mutations, you can refer to the
following docs:

1. [Queries](https://www.apollographql.com/docs/react/data/queries/)
2. [Mutations](https://www.apollographql.com/docs/react/data/mutations/)
3. [The Query and Mutation types](https://graphql.org/learn/schema/#the-query-and-mutation-types)
