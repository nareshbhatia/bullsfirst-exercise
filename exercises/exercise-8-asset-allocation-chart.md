# Exercise 8: Asset Allocation Chart

In this exercise, we will implement the Asset Allocation Chart on the Overview
tab. Note that this is a drilldown chart that shows sector allocations at the
top level and then allows drilldown to the industry level. We will use
[Highcharts](https://www.highcharts.com/docs/index) for this implementation.

- As part of the previous exercise, we already have a placeholder
  `AssetAllocationChart`.

- Copy the GraphQL query from
  `/code/src/pages/AccountsPage/Overview/AssetAllocationChart.query.graphql` to
  your repo. Note that this query passes in an `accountId` as the parameter and
  receives `AssetAllocationFields` in return. Note that `AssetAllocation` is a
  recursive data structure so that we can define a tree of allocations at the
  sector and industry level. Here's the GraphQL type definition for it:

```graphql
type AssetAllocation {
  categoryId: String!
  categoryName: String!
  value: Float!
  percentage: Float!
  children: [AssetAllocation!]
}
```

- Generate the code for the query by running `graphql:codegen`.

- Review
  [this Highcharts example](https://www.highcharts.com/demo/pie-drilldown) to
  understand how to implement a drilldown pie-chart. Note that this example uses
  the basic JavaScript API of Highcharts. You should instead use the Highcharts
  React wrapper as documented
  [here](https://github.com/highcharts/highcharts-react). Review the following
  examples to see how the React wrapper is used:

  - [Highcharts Demo](https://github.com/nareshbhatia/highcharts-demo)
  - [Charts Demo](https://github.com/nareshbhatia/charts-demo)

- Implement a reusable Pie chart component at
  `src/components/Charts/PieChart.tsx`. The component should allow a two level
  drilldown. It should take in the following props:

```ts
export interface PieChartProps {
  title: string;
  series: any;
  drilldown: any;
}
```

Here's an example of invoking this pie chart:

```tsx
const series = [
  {
    name: 'Sectors',
    data: [
      { name: 'Technology', y: 80, drilldown: 'technology' },
      { name: 'Consumer Cyclical', y: 20, drilldown: 'consumer-cyclical' },
    ],
  },
];

const drilldown = {
  activeDataLabelStyle: {
    color: '#000000',
    fontWeight: 'normal',
    textDecoration: 'none',
  },
  series: [
    {
      id: 'consumer-cyclical',
      name: 'Consumer Cyclical',
      data: [
        ['Restaurants', 75],
        ['Autos', 25],
      ],
    },
    {
      id: 'technology',
      name: 'Technology',
      data: [
        ['Application Software', 88],
        ['Computer Hardware', 13],
      ],
    },
  ],
};

<PieChart
  title="TOP SPENDING CATEGORIES"
  series={series}
  drilldown={drilldown}
/>;
```

- Write a Storybook story to make sure that the pie chart works as expected.

- Make sure that the pie colors match the visual design in Figma. Use the
  following code in `index.tsx` and `.storybook/preview.tsx` to configure
  Highcharts colors.

```ts
// Initialize Highcharts
Highcharts.setOptions({
  colors: ChartColors,
});
```

- Write a simple test to make sure that the pie chart renders correctly. At a
  minimum, check to see if the expected number of pies are being rendered. See
  below:

```tsx
test('PieChart renders correctly', () => {
  const { container } = render(
    <PieChart
      title="TOP SPENDING CATEGORIES"
      series={series}
      drilldown={drilldown}
    />
  );
  const pies = container.querySelectorAll('.highcharts-point');
  expect(pies).toHaveLength(4);
});
```

- Now let's focus on implementing the `AssetAllocationChart` component using our
  reusable `PieChart` component. Execute the `GetAssetAllocations` query in the
  AssetAllocationChart component. Note that the query passes in an `accountId`
  as the parameter and receives a nested list of sector and industry allocations
  in return. Here's a sample of the returned data. Note that this is just raw
  asset-allocation data, with no presentational information. The server should
  not make any assumptions about how this data is to be presented.

```json
{
  "assetAllocations": [
    {
      "id": "consumer-cyclical",
      "name": "Consumer Cyclical",
      "value": 2000,
      "percentage": 0.2,
      "children": [
        {
          "id": "autos",
          "name": "Autos",
          "value": 500,
          "percentage": 0.25
        },
        {
          "id": "restaurants",
          "name": "Restaurants",
          "value": 1500,
          "percentage": 0.75
        }
      ]
    },
    {
      "id": "technology",
      "name": "Technology",
      "value": 8000,
      "percentage": 0.8,
      "children": [
        {
          "id": "computer-hardware",
          "name": "Computer Hardware",
          "value": 1000,
          "percentage": 0.125
        },
        {
          "id": "application-software",
          "name": "Application Software",
          "value": 7000,
          "percentage": 0.875
        }
      ]
    }
  ]
}
```

- The AssetAllocationChart component should grab the accountId from the URL of
  the page. This is the exact same pattern as that used in the NetWorth
  component. So look over that component to see how it was done.

- Once we have asset allocations from the server, we need to break down that
  structure into what is needed by the `PieChart` component, essentially a
  `series` and a `drilldown`. Write two top-level functions (outside the React
  component) in the AssetAllocationChart.tsx file to do this. We are
  intentionally not embedding this logic into the component so that it is easier
  to test. Make sure that the pie series and the drilldown are sorted in
  descending order so that the pie slices are sequenced from large to small.

```ts
export function computePieSeries(sectorAllocations: Array<AssetAllocation>) {
  ...
}

export function computePieDrilldown(sectorAllocations: Array<AssetAllocation>) {
  ...
}
```

- Write tests for the above two functions.

- Implement rest of the `AssetAllocationChart` component.

- Create a MSW handler to return the asset allocations for a given account. Use
  the sample data under `/src/mocks/data` to compute the asset allocations. This
  is not trivial. Expect to write approximately 70-90 lines of business logic.
  Here's the high-level algorithm:

```ts
// iterate through holdings and start creating asset allocations
const sectorAllocations: Array<AssetAllocation> = [];
accountHoldings.forEach((holding) => {
  // get security, industry and sector
  // create or update sector allocation (just the value)
  // create or update industry allocation as child of sector allocation (just the value)
});

// calculate total account value as the sum of all sector values

// calculate sector allocation percentages
sectorAllocations.forEach((sectorAllocation) => {
  sectorAllocation.percentage = sectorAllocation.value / accountValue;

  // calculate industry allocation percentages
  const { children: industryAllocations } = sectorAllocation;
  industryAllocations!.forEach((industryAllocation) => {
    industryAllocation.percentage =
      industryAllocation.value / sectorAllocation.value;
  });
});
```

- Create a unit test to make sure that the AssetAllocationChart component
  renders correctly. Be sure to mock the `useParams()` hook as done in the
  previous exercise.

- Test the AssetAllocationChart component in the real app. Make sure that the
  chart changes as you select different accounts.

- Attach a screenshot of your implementation to your pull request.
