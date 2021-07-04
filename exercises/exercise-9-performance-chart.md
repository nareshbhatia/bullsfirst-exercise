# Exercise 9: Performance Chart

In this exercise, we will implement the Performance chart on the Overview tab.
This is a line chart that shows the investment performance of an account since
its inception. The performance is shown as a
[Time-weighted Investment Returns](https://www.investopedia.com/terms/t/time-weightedror.asp).
For comparison, we also show the performance of S&P 500 for the same period of
time.

- As part of the previous exercise, we already have a placeholder
  `PerformanceChart`.

- Copy the GraphQL query from
  `/code/src/pages/AccountsPage/Overview/PerformanceChart.query.graphql` to your
  repo. Note that this query passes in an `accountId` as the parameter and
  receives two `SeriesFields` in return - one for the account and another for
  S&P 500. Note that `Series` consists of a name and the data associated with
  the series. Here's the GraphQL type definition for it:

```graphql
type Series {
  name: String!
  data: [DataPoint!]!
}

type DataPoint {
  x: Float!
  y: Float!
}
```

- Use [this Highcharts example](https://www.highcharts.com/demo/line-basic) to
  implement a reusable Line chart component at
  `src/components/Charts/LineChart.tsx`. This component should take in the
  following props:

```ts
export interface LineChartProps {
  title: string;
  series: any;
}
```

Here's an example of invoking this line chart:

```tsx
const series = [
  {
    name: 'Brokerage Account',
    data: [
      [2015, 0],
      [2016, -4.7],
      [2017, 24.5],
      [2018, 45.1],
      [2019, 40.9],
      [2020, 75.5],
      [2021, 80.7],
    ],
  },
  {
    name: 'S&P 500',
    data: [
      [2015, 0],
      [2016, -10.2],
      [2017, 14.0],
      [2018, 34.9],
      [2019, 30.1],
      [2020, 63.5],
      [2021, 68.2],
    ],
  },
];

<LineChart title="PERFORMANCE" series={series} />;
```

- Write a Storybook story to make sure that the line chart works as expected.

- Write a simple test to make sure that the line chart renders correctly. At a
  minimum, check to see if the expected number of lines are being rendered.

- Now let's focus on implementing the `PerformanceChart` component using our
  reusable `LineChart` component. Execute the `GetAccountPerformance` query in
  the PerformanceChart component. Note that the query passes in an `accountId`
  as the parameter and receives an array of two series in return. See sample
  data returned from the server in `src/mocks/data/performances.json`.

- The PerformanceChart component should grab the accountId from the URL of the
  page. This is the exact same pattern as that used in the NetWorth component.
  So look over that component to see how it was done.

- Once we receive the account performance from the server, we need to transform
  it into the structure needed by the `LineChart` component. Write a top-level
  function (outside the React component) in the PerformanceChart.tsx file to do
  this.

```ts
export function computeLineChartSeries(accountPerformance: Array<Series>) {
  ...
}
```

- Write a test for the above function.

- Implement rest of the `PerformanceChart` component.

- Create a MSW handler to return the account performance for a given account.
  Use the sample data in `/src/mocks/data/performances.json` - no need to do a
  real investment return calculation for this exercise.

- Create a unit test to make sure that the PerformanceChart component renders
  correctly. Be sure to mock the `useParams()` hook as done in the previous
  exercise.

- Test the PerformanceChart component in the real app. Make sure that the chart
  changes as you select different accounts.

- Attach a screenshot of your implementation to your pull request.
