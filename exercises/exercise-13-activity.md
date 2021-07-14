# Exercise 13: Activity

In this exercise, we will implement the Activity tab as shown in the
[visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
This tab shows a list of transactions in the selected account. We will reuse the
`CustomGrid` that we implemented earlier.

Note that transactions are modeled as a
[discriminated union](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
of cash transfers and trades. Review the GraphQL schema, and the generated
TypeScript to understand how this is implemented. Querying a discriminated union
is also a bit more complicated, see the example
[here](https://graphql.org/learn/schema/#union-types).

## Exercise Instructions

As part of the previous exercises, we already have a placeholder for the
`Activity` tab. Let's continue from there.

- Write a GraphQL query in
  `/src/pages/AccountsPage/Activity/Transactions.query.graphql` to fetch the
  required fields from the GraphQL server. Unlike our previous queries, do not
  use fragments for this one. Using fragments with unions requires a special
  technique to deserialize them with Apollo Client (see
  [here](https://www.apollographql.com/docs/react/data/fragments/#using-fragments-with-unions-and-interfaces)).

- Generate the code for the query by running `graphql:codegen`.

- Following the `Holdings` tab as an example, add the `GridToolbar` and
  `CustomGrid` to the `Activity` tab and wrap them in a `<GridContextProvider>`.

- Execute the `GetTransactions` query in the `Activity` component. Pass the
  returned transactions into the `CustomGrid`. Also, pass in the appropriate
  `columnDefs`. Note that the `Description` column does not relate to any single
  field in the returned transactions. It has to be computed. Use the ag-Grid
  [valueGetter](https://www.ag-grid.com/react-grid/value-getters/) feature for
  this.

- Create a MSW handler to return the transactions for a given account. Use the
  sample data in `/src/mocks/data/transactions.json`.

- Try out the activity tab in the app now. Does it work? Make sure all columns
  are formatted as shown in the design.

- Make sure that the Refresh button works.

- Attach a screenshot of your implementation to your pull request.
