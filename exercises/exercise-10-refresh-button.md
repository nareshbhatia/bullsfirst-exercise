# Exercise 10: Refresh Button

In this exercise, we will implement the Refresh button in the account header.
When this button is pressed, the client will refetch data from the back-end and
refresh all 3 components on the Overview tab: `NetWorth`, `AssetAllocationChart`
and `PerformanceChart`.

The approach to accomplish this is to maintain a `refreshCount` that will be
incremented everytime the Refresh button is clicked. The 3 components mentioned
above will listen for changes to the `refreshCount` and trigger a refetch.

We will keep the `refreshCount` in a React Context that is placed at a high
enough level in the view hierarchy so that it is available to all the children
that need it. Here's the proposed view hierarchy:

```text
Accounts
  RefreshContextProvider
    AccountView
      AccountHeader
        Overview
          NetWorth
          AssetAllocationChart
          PerformanceChart
```

## Detailed Instructions

- Create a RefreshContext and RefreshProvider in
  `/scr/contexts/RefreshContext/RefreshContext.tsx`. Model this after
  `AuthContext`. The context should carry just a number called `refreshCount`.

- Let the `Accounts` component provide the `RefreshContext` to all its children
  as shown above.

- Create a new component called `RefreshButton` under in the same folder as
  `AccountHeader` (`/src/pages/Accounts/AccountHeader`). When this button is
  clicked, it should increment the `refreshCount`.

```tsx
export const RefreshButton = () => {
  const { refreshCount, setRefreshCount } = useRefreshContext();

  const handleRefresh = async () => {
    await setRefreshCount(refreshCount + 1);
  };

  return (
    <FaRedoAlt className="account-header__refresh" onClick={handleRefresh} />
  );
};
```

- Make sure to use the new `RefreshButton` in your `AccountHeader`.

- Now listen for changes to `refreshCount` in the 3 components that need to be
  refreshed. This is done using the `useEffect` hook. For example, below are the
  changes to `NetWorth`. Note that `useQuery` returns a `refetch` function that
  we are calling whenever the refresh count changes.

```tsx
export const NetWorth = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, error, data, refetch } = useQuery(GetNetWorthDocument, {
    variables: {
      accountId,
    },
  });

  useEffect(() => {
    refetch();
  }, [refreshCount, refetch]);

  ...
};
```

- That's all you need. Try out your implementation and make sure that it works.

- At this point some of your unit tests will be broken because the components
  under `AccountView` expect to have a `RefreshContextProvider` above them. You
  can fix this by adding this provider to your tests. For example:

```tsx
describe('<NetWorth />', () => {
  test('renders correctly', async () => {
    const { asFragment, getByText } = render(
      <RefreshContextProvider>
        <NetWorth />
      </RefreshContextProvider>
    );

    await waitForElementToBeRemoved(getByText('Loading...'));

    expect(asFragment()).toMatchSnapshot();
  });
});
```
