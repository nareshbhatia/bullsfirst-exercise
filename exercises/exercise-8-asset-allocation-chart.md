# Exercise 8: Asset Allocation Chart

In this exercise, we will implement the Asset Allocation Chart on the Overview
tab. Note that this is a drilldown chart that shows sector allocations at the
top level and then allows drilldown to the industry level. We will use
[Highcharts](https://www.highcharts.com/docs/index) for this implementation.

- As part of the previous exercise, we already have a placeholder
  `AssetAllocationChart`.

- Create the following models under `/src/models`. Note that `AssetAllocation`
  is a recursive data structure so that we can define a tree of allocations at
  the sector and industry level.

```ts
// ----- AssetAllocation.ts -----
export interface AssetAllocation {
  id: string;
  name: string;
  value: number;
  percentage: number;
  children?: Array<AssetAllocation>;
}

// ----- Holding.ts -----
export interface Holding {
  id: string;
  symbol: string;
  quantity: number;
  accountId: string;
}

// ----- Industry.ts -----
export interface Industry {
  id: string;
  name: string;
  sectorId: string;
}

// ----- Sector.ts -----
export interface Sector {
  id: string;
  name: string;
}

// ----- Security.ts -----
export interface Security {
  id: string;
  name: string;
  price: number;
  industryId: string;
}
```

- Use [this Highcharts example](https://www.highcharts.com/demo/pie-drilldown)
  to implement a reusable Pie chart component at
  `src/components/Charts/PieChart.tsx`. This component should allow a two level
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

- Write a simple test to make sure that the pie chart renders correctly. At a
  minimum, check to see if the expected number of pies are being rendered. See
  below:

```ts
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
  reusable `PieChart` component. Create a GraphQL query in the
  AssetAllocationChart component to fetch asset allocations from the server.
  Note that the query passes in an `accountId` as the parameter and receives a
  nested list of sector and industry allocations in return.

```ts
interface AssetAllocationData {
  assetAllocations: Array<AssetAllocation>;
}

export const GET_ASSET_ALLOCATIONS = gql`
  query GetAssetAllocations($accountId: ID!) {
    assetAllocations(id: $accountId) {
      id
      name
      value
      percentage
      children {
        id
        name
        value
        percentage
      }
    }
  }
`;
```

Here's a sample of the data returned from the server. Note that this is just raw
asset-allocation data, with no presentational information. The server should not
make any assumptions about how this data is to be presented.

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
  component) in the AssetAllocationChart.tsx file to transform the server
  structure into what is needed by `PieChart`. We are intentionally not
  embedding this logic into the component so that it is easier to test.

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
  the sample data under `/src/mocks/data` to compute the asset allocations.

- Create a unit test to make sure that the AssetAllocationChart component
  renders correctly. Be sure to mock the `useParams()` hook as done in the
  previous exercise.

- Test the AssetAllocationChart component in the real app. Make sure that the
  chart changes as you select different accounts.

- Attach a screenshot of your implementation to your pull request.
