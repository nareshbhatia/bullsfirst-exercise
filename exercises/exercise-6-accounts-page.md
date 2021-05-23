# Exercise 6: Accounts Page

In this exercise, we will

1. Create a skeleton of the Accounts page as show in the
   [visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
2. We will include the `SideBar` that was implemented in exercise 3.
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
   `signupJohnSmith` to signup and authenticate a user. See accelerated-news
   example. The command is defined in `/cypress/support/commands`. This command
   should be used in all tests that need to test an authenticated page.
10. Attach a screenshot of your implementation to your pull request.

## Tips

### React Router

Use React Router's
[nested routes](https://github.com/ReactTraining/react-router/blob/dev/docs/installation/getting-started.md#nested-routes)
feature to navigate to the 4 tabs on the Account page:

```typescript jsx
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/accounts" element={<Accounts />}>
        <Route path=":accountId" element={<Account />}>
          <Route path="overview" element={<Overview />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
```

For example, if the user has an account with id = 'brokerage-account', the route
for the overview tab will be `/accounts/brokerage-account/overview`.

Also use React Router's
[NavLink](https://github.com/ReactTraining/react-router/blob/dev/docs/api-reference.md#navlink)
component to create the 4 links on the Account page.

### Apollo GraphQL Client

Note that Apollo GraphQL provider was set up in exercise 3.

For this exercise you need to query the server in
src/features/Accounts/Accounts.tsx as shown below to fetch the accounts:

```typescript jsx
import { useQuery, gql } from '@apollo/client';

const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name
    }
  }
`;

interface Account {
  id: string;
  name: string;
}

interface AccountsData {
  accounts: Array<Account>;
}

export const Accounts = () => {
  const { loading, error, data } = useQuery<AccountsData>(GET_ACCOUNTS);

  if (loading) return <Loading />;
  if (error) {
    throw error;
  }

  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="bf-min-height-0">
        {selectedNavId !== undefined ? (
          <SideBar
            title="Accounts"
            items={data?.accounts}
            selectedNavItemId={selectedNavId}
            onNavItemSelected={handleNavItemSelected}
          />
        ) : (
          <div className="p-3">No accounts found</div>
        )}
        <Outlet />
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
};
```

### Mock Service Worker

Add the following code to your MSW `handlers.js` file to mock the `GetAccounts`
API:

```typescript jsx
import { graphql } from 'msw';

export const handlers = [
  // ---- GetAccounts -----
  graphql.query('GetAccounts', (req, res, ctx) => {
    return res(
      ctx.data({
        accounts: [
          {
            id: 'brokerage-account',
            name: 'Brokerage Account',
          },
          {
            id: 'retirement-account',
            name: 'Retirement Account',
          },
          {
            id: 'jennys-college-fund',
            name: "Jenny's College Fund",
          },
        ],
      })
    );
  }),
];
```
