# Exercise 6: Accounts Page

In this exercise, we will

1. Create a skeleton of the Accounts page as show in the
   [visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
2. We will include the `SideBar` that was implemented in exercise 5.
3. We will add an `AccountHeader` consisting of 4 links (Overview, Holdings
   Orders & Activity) and 3 buttons (Transfer, Trade and Refresh).
4. We will add dummy content for Overview, Holdings, Orders & Activity tabs.
5. We will add routing that allows the user to navigate from Sign-in page to the
   Accounts page on successful sign-in.
6. The Accounts page will query the server to get all the accounts owned by the
   user.
7. Once the Accounts page receives a list of accounts from the server, it will
   select the first account and show it in the Overview tab.
8. Make sure you have good unit test coverage.
9. Write an integration test using Cypress that starts from the Sign-in page and
   navigates to the Accounts page. For this test, do not repeat the
   authentication workflow in code. Create a Cypress command named
   `signupJohnSmith` to signup and authenticate the `John Smith` user. See
   accelerated-news example. The command is defined in
   `/cypress/support/commands`. This command should be used in all tests that
   need to test an authenticated page.
10. Attach a screenshot of your implementation to your pull request.

## Tips

### React Router

Use React Router's
[nested routes](https://reactrouter.com/docs/en/v6/getting-started/overview#nested-routes)
feature to navigate to the 4 tabs on the Account page:

```typescript jsx
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/accounts"
        element={
          <PrivateRoute redirectPath="/signin" element={<AccountsPage />} />
        }
      >
        <Route path=":accountId" element={<AccountView />}>
          <Route path="overview" element={<Overview />} />
        </Route>
      </Route>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
```

For example, if the user has an account with id = 'brokerage-account', the route
for the overview tab will be `/accounts/brokerage-account/overview`.

Also use React Router's
[NavLink](https://reactrouter.com/docs/en/v6/api#navlink) component to create
the 4 links on the Account page.

### Apollo GraphQL Client

Note that Apollo GraphQL provider was set up in exercise 3.

For this exercise you need to query the server in
`/src/pages/AccountsPage/AccountsPage.tsx` to fetch the accounts. Copy the
GraphQL query from `/code/src/pages/AccountsPage/AccountsPage.query.graphql` to
your repo. Generate the code for the query by running `graphql:codegen`.
Finally, execute the query from `AccountsPage.tsx` and supply the results to
`<SideBar>`.

### Mock Service Worker

Add the following code to your MSW `handlers.js` file to mock the `GetAccounts`
API:

```typescript jsx
import { graphql } from 'msw';
import accounts from './data/accounts.json';

export const handlers = [
  /** get accounts */
  graphql.query('GetAccounts', (req, res, ctx) => {
    return res(ctx.data({ accounts }));
  }),
];
```

Copy the `/data` folder from this repo to your bullsfirst client repo at
`/src/mocks/data`. This folder contains sample data for the Bullsfirst
application including the `accounts.json` file imported above.
