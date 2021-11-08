# Exercise 12: Orders

In this exercise, we will implement the Orders tab as shown in the
[visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
This tab shows a list of orders in the selected account. We will reuse the
`CustomGrid` that we implemented in the previous exercise for this one.

## Exercise Instructions

As part of the previous exercises, we already have a placeholder for the
`Orders` tab. Let's continue from there.

- Write a GraphQL query in `/src/pages/AccountsPage/Orders/Orders.query.graphql`
  to fetch the required fields from the GraphQL server. Use the Holdings query
  as an example. Add the required fragment in `/src/graphql/fragments.graphql`,
  call it `OrderFields`.

- Generate the code for the query by running `graphql:codegen`.

- Following the `Holdings` tab as an example, add the `GridToolbar` and
  `CustomGrid` to the `Orders` tab and wrap them in a `<GridContextProvider>`.

- Execute the `GetOrders` query in the `Orders` component. Pass the returned
  orders into the `CustomGrid`. Also, pass in the appropriate `columnDefs`.

- Create a MSW handler to return the orders for a given account. Use the sample
  data in `/src/mocks/data/orders.json`.

- Try out the orders tab in the app now. Does it work? Make sure that the
  numbers and dates are formatted as shown in the Visual design. (Dates can be
  formatted based on your locale.)

- Make sure that the Side, Type and Status columns show the correct case (not
  all upper case). You can use the supplied translations file the convert from
  the enumeration values to English strings (see
  `/code/src/graphql/translations.ts`).

- Make sure that the date column can be filtered as a date object and not as a
  string. ag-Grid should show a calendar widget to set the date filter.

- Make sure that the Refresh button works.

- Attach a screenshot of your implementation to your pull request.
