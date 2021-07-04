# Exercise 7: Net Worth

In this exercise, we will create the Net Worth component on the Overview tab.

- Create a skeleton of the Overview tab as show in the
  [visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
  Create placeholders for `NetWorth`, `AssetAllocationChart` and
  `PerformanceChart` components.

- Copy the GraphQL query from
  `/code/src/pages/AccountsPage/Overview/NetWorth.query.graphql` to your repo.
  Note that this query passes in an `accountId` as the parameter and receives
  `NetWorthFields` in return. Generate the code for the query by running
  `graphql:codegen`.

- The NetWorth component should grab the accountId from the URL of the page. For
  example, given the URL `/accounts/brokerage-account/overview`, it should pick
  out `brokerage-account` as the accountId. For this, you will need to use
  react-router's `useParams()` hook.
- Finally, execute the NetWorth query and render the component.

- On the mock server, create a MSW handler to return the net worth for a given
  account. Use the sample data under `/src/mocks/data` to compute the net worth.

- Create a Storybook story to test the NetWorth component. Make sure that the
  story is able to get an `accountId` from the router to make the NetWorth
  component work correctly. For this you will need to use the memory router:

```tsx
import React from 'react';
import { Meta } from '@storybook/react';
import { MemoryRouter as Router, Route, Routes } from 'react-router';
import { NetWorth } from './NetWorth';

export default {
  title: 'Pages/Account Overview',
  component: NetWorth,
} as Meta;

export const NetWorthStory = () => (
  <Router initialEntries={['/accounts/brokerage-account/overview']}>
    <Routes>
      <Route
        path="/accounts/:accountId/overview"
        element={
          <div className="paper border-paper">
            <NetWorth />
          </div>
        }
      />
    </Routes>
  </Router>
);
NetWorthStory.storyName = 'NetWorth';
```

- Create a unit test to make sure that the NetWorth component renders correctly.
  Be sure to mock the `useParams()` hook as shown below. Understand how this
  mock works. What is the purpose of `jest.requireActual()`?

```ts
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    accountId: 'brokerage-account',
  }),
}));
```

- Test the NetWorth component in the real app. Make sure that the NetWorth value
  changes as you select different accounts.

- Attach a screenshot of your implementation to your pull request.
