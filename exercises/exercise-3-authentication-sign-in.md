# Exercise 3: Authentication - Sign In

This exercise implements user authentication using access tokens. Here we will
implement the sign-in portion of the authentication workflow. The next exercise
will implement the sign-up workflow.

This exercise also introduces GraphQL to make server calls. We will use
[Apollo GraphQL Client](https://www.apollographql.com/docs/react/) for this.

In addition, we will use the [Mock Service Worker](https://mswjs.io/) library to
mock the GraphQL calls to the server.

# Authentication Workflow

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
unique access token as shown below:

```json
{
  "user": {
    "name": "John Smith",
    "email": "jsmith@example.com"
  },
  "accessToken": "2c2977af-401e-47f2-a867-840ce9760572"
}
```

The client should save the access token in localStorage and send it in the
request header for all future requests. This tells the server which user is
sending the request. Here's what the `Authorization` header should look like:

```text
authorization: Bearer 2c2977af-401e-47f2-a867-840ce9760572
```

Finally, when the user signs out, the server discards the access token. The
client can no longer make requests using the same access token.

The Bullsfirst client will save the access token in localStorage. When the
client starts up, and it finds the access token in localStorage, there is no
need to sign in to the sever. The SignIn page should automatically redirect to
the Accounts page. The saved access token can be used in server calls to get
account data or perform any actions.

## Adding Authentication to the SignIn Page

- Start with adding an `ApolloProvider` in index.tsx. See below. Note that
  `authlink` is configured to send an `authorization` header in any request if
  localStorage has a previously saved access token. You can find further details
  [here](https://www.apollographql.com/docs/react/networking/authentication/#header).

```ts
// Create Apollo client
const env = new WindowEnv();
const httpLink = createHttpLink({
  uri: env.get(EnvVar.API_URL),
});
const authLink = setContext((_, { headers }) => {
  const token = AuthService.getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      // Executes queries against both the cache and the GraphQL server.
      // The query automatically updates if the result of the server-side
      // query modifies the cached fields.
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <EnvProvider>
          <ApolloProvider client={client}>
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

- Currently, the `handleSubmit()` method of the SignIn page redirects directly
  to the Accounts page without doing any authentication. Let's change that.
  `handleSubmit()` should now make a server call to sign in and get an access
  token. See below:

```ts
const handleSubmit = async (credentials: Credentials) => {
  await signIn({ variables: { credentials } });
};
```

- `signIn()` makes a GraphQL call to the server. To get started with this call,
  add the following mutation just above your `SignIn` component in `SignIn.tsx`:

```ts
const SIGN_IN = gql`
  mutation SignIn($credentials: Credentials) {
    signIn(credentials: $credentials) {
      user {
        name
        email
      }
      accessToken
    }
  }
`;
```

For more information on GraphQL queries and mutations, you can refer to the
following docs:

1. [Queries](https://www.apollographql.com/docs/react/data/queries/)
2. [Mutations](https://www.apollographql.com/docs/react/data/mutations/)
3. [The Query and Mutation types](https://graphql.org/learn/schema/#the-query-and-mutation-types)

- Now within the `SignIn` component, call the `useMutation` hook to get the
  `signIn` method that calls the GraphQL API, as well as the data and error
  returned by that API. Note that the `signIn` method is what you will be
  calling in the `handleSubmit()` method.

```ts
const [signIn, { data, error }] = useMutation(SIGN_IN);
const signInError = error ? error.message : undefined;
```

- If the `signIn` call to the server is successful (i.e. email and password
  match), the server should return the corresponding `user` object and a unique
  `accessToken`. Capture these values using a `useEffect`. Save the
  `accessToken` in localStorage for future use (hide the details in
  `AuthService`). Save the `user` object in AuthState (yes, create a
  `AuthContext` for this under src/contexts/AuthContext.tsx). See the code
  fragment below to get started with this:

```ts
// set authState if user has signed in successfully
useEffect(() => {
  if (data?.signIn) {
    const { user, accessToken } = data.signIn;
    AuthService.setAccessToken(accessToken);
    setAuthState({ ...authState, user });
  }
}, [data?.signIn, authState, setAuthState]);
```

- Finally, add one more `useEffect` to the SignIn component to monitor
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
        user: {
          name: 'John Smith',
          email: 'jsmith@example.com',
        },
        accessToken: uuidv4(),
      },
    })
  );
});
```

- Verify that you can now signin through the front-end using the hard-coded
  credentials. The returned access token should be stored in localStorage, and
  the app should redirect to the Accounts page.

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

Finally,

- Make sure you have good unit test coverage.
- Update the authentication integration test to verify that the signin workflow
  is working correctly.

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
