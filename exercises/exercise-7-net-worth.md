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

- Finally, execute the NetWorth query and render the result using a child
  component called `NetWorthRenderer` created in the same file. This component
  should take two props: `investmentTotal` and `cashBalance`. Make sure that all
  the numbers are formatted with two decimal places and comma separators. Use
  the library `@react-force/number-utils` for this (use `npm install` or
  `yarn add` to add it directly to your package.json). Use the method
  `NumberUtils.formatAsMoney()` to format all money amounts.

- Create a Storybook story to test the `NetWorthRenderer` component:

```tsx
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NetWorthRenderer } from './NetWorth';

export default {
  title: 'Pages/Accounts/NetWorth',
  component: NetWorthRenderer,
} as Meta;

const Template: Story = (args) => (
  <div className="paper border-paper">
    <NetWorthRenderer
      investmentTotal={args.investmentTotal}
      cashBalance={args.cashBalance}
    />
  </div>
);

export const NetWorthStory = Template.bind({});
NetWorthStory.storyName = 'NetWorth';
NetWorthStory.args = { investmentTotal: 900000.66, cashBalance: 100000.33 };
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

- On the mock server, create a MSW handler to return the net worth for a given
  account. Use the sample data under `/src/mocks/data` to compute the net worth.

- Test the NetWorth component in the real app. Make sure that the NetWorth value
  changes as you select different accounts.

- Attach a screenshot of your implementation to your pull request.
