# Exercise 11: Holdings

In this exercise, we will implement the Holdings tab as shown in the
[visual design](https://www.figma.com/file/UdOTt1Z2fTnm0Cbi0FA1We/Bullsfirst).
This tab shows a list of holdings in the selected account. We will use
[ag-Grid](https://www.ag-grid.com/react-grid/) for this implementation. The two
buttons shown above the grid are for resizing the grid columns:

1. The first button is for _Size to Fit_, meaning that it will size the columns
   in a way that the grid fills the entire width of the container. However, we
   will put constrains on all columns, except the Name column, to suppress the
   size to fit functionality. So, in essence, only the Name column will be
   adjusted to fill the window.

2. The second button is for _Auto Size_, meaning that it will automatically size
   each column to occupy only the necessary space. In this mode, the grid could
   end up being narrower or wider than the browser window.

Note that the two sizing buttons are external to the ag-Grid. We will provide
them access to the ag-Grid API so that they can trigger the appropriate
functionality.

## ag-Grid Tutorial

Go through the following tutorials to learn how to use ag-Grid using plain
JavaScript vs. React. The reason you need to learn both is that we will be using
features from each. For the most part we will be using the React version, i.e.,
the `<AgGridReact>` component. However, for column definitions, we will use the
JavaScript way of defining columns, using the `columnDefs` property of
`<AgGridReact>` instead of the `<AgGridColumn>` component. The former is much
easier for customizing the ag-Grid by simply supplying a hash of column
properties.

1. [JavaScript Grid](https://www.ag-grid.com/javascript-grid/getting-started/)
2. [React Grid](https://www.ag-grid.com/react-grid/getting-started/)

After finishing the React Grid tutorial, try deleting the `<AgGridColum>`
components and replacing them with the `columnDefs` property.

## Exercise Instructions

As part of the previous exercises, we already have a placeholder for the
`Holdings` tab. Let's continue from there.

- Copy the GraphQL query from
  `/code/src/pages/AccountsPage/Holdings/Holdings.query.graphql` to your repo.
  Note that this query passes in an `accountId` as the parameter and receives a
  list of `Holding` objects in return. Here's the GraphQL type definition for a
  Holding:

```graphql
type Holding {
  id: ID!
  security: Security!
  quantity: Int!
  account: Account!
  value: Float!
}
```

- While the GraphQL definition for `Holding` contains an `account`, that is just
  for completeness. After all, holdings belong to an account. However, our
  holdings query is specific to an account. So we do not need to ask for an
  account for each holding. Hence our holdings fragment should look like this:

```graphql
fragment HoldingFields on Holding {
  id
  quantity
  value
  security {
    id
    name
    price
  }
}
```

- Generate the code for the query by running `graphql:codegen`.

- Add the following modules to Bullsfirst client to get started with ag-Grid.
  Note that we are using ag-Grid version 25 because version 26 has introduced
  some breaking changes. Also note that we are adding node-sass for styling
  ag-Grid (that's the easier way to style it).

```sh
npm install ag-grid-community@25.3.0 ag-grid-react@25.3.0
npm install --save-dev node-sass

# or

yarn add ag-grid-community@25.3.0 ag-grid-react@25.3.0
yarn add -D node-sass
```

- Create a custom grid component at `src/components/Grids/CustomGrid.tsx` that
  will be reused across the Bullsfirst application. It should take in the
  following props:

```ts
export interface CustomGridProps {
  columnDefs: Array<ColDef>;
  frameworkComponents?: any;
  rowData: Array<any>;
}
```

`columnDefs` and `rowData` should be self-explanatory. The optional
`frameworkComponents` prop is there to register any React components that will
be used to render ag-Grid cells. In the case of the Holdings grid, we will use a
framework component to render the buy and cell buttons.

Here's an example of invoking this custom grid to show holdings:

```tsx
<CustomGrid
  columnDefs={columnDefs}
  frameworkComponents={frameworkComponents}
  rowData={holdings}
/>
```

To get you started quickly, here's a minimal implementation of the `CustomGrid`.
Make sure you understand how this is working.

```tsx
import React from 'react';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

export interface CustomGridProps {
  columnDefs: Array<ColDef>;
  frameworkComponents?: any;
  rowData: Array<any>;
}

export const CustomGrid = ({
  columnDefs,
  frameworkComponents,
  rowData,
}: CustomGridProps) => {
  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    menuTabs: ['filterMenuTab'],
  };

  const gridOptions: GridOptions = {
    suppressCellSelection: true,
    defaultColDef,
    columnDefs,
    frameworkComponents,
    rowData,
  };

  return (
    <div className="ag-theme-alpine h-full w-full">
      <AgGridReact gridOptions={gridOptions} />
    </div>
  );
};
```

- Write a Storybook story to test your `CustomGrid` implementation as you build
  more features into it. A starter story is provided for you at
  `/code/src/components/Grids/CustomGrid.stories.tsx`. Copy it into your repo.
  Also, add the ag-Grid css into `/.storybook/preview.tsx` to make sure that the
  required styles are available:

```tsx
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
```

- Let's add a minor enhancement to `CustomGrid`. When the grid comes up
  initially, size its columns to fit the container's width. This is done by
  calling `gridApi.sizeColumnsToFit()`. However, the `gridApi` is only available
  when the ag-Grid instance is "ready". Handle the `onGridReady` event from
  ag-Grid and call this api.

```tsx
export const CustomGrid = ({ ... }: CustomGridProps) => {

  const handleGridReady = (event: GridReadyEvent) => {
    const { api: gridApi, columnApi } = event;
    gridApi.sizeColumnsToFit();
  };

  ...

  const gridOptions: GridOptions = {
    ...
    onGridReady: handleGridReady,
  };

  ...
};
```

- Now let's build some infrastructure to implement the _Size To Fit_ and _Auto
  Size_ buttons. These buttons will need to call the `gridApi` and the
  `columnApi` which are made available in `handleGridReady`. Since these buttons
  are external to the grid, we will have to save these APIs in a React Context
  and make that context available to the buttons. Create a Context at
  `/src/contexts/GridContext/GridContext.tsx` to save the following state:

```tsx
type GridState = {
  gridApi?: GridApi;
  columnApi?: ColumnApi;
};
```

- Coming back to `CustomGrid`, modify the `handleGridReady` handler to capture
  `gridApi` and `columnApi` in `GridContext`.
- Create a new component at `/src/components/Grids/GridToolbar.tsx` to house the
  _Size To Fit_ and _Auto Size_ buttons. Use icons from 'react-icons/cg' inside
  these buttons.

```tsx
import { CgArrowsHAlt, CgArrowsShrinkH } from 'react-icons/cg';
```

- Make sure that the two buttons show appropriate tool-tips: "Size to Fit" and
  "Auto-Size". Use the title attribute on the buttons to achieve this.

- Assume that the `GridToolbar` will have access to the `GridContext`. Use
  `gridApi` and `columnApi` from `GridContext` to implement the _Size To Fit_
  and _Auto Size_ buttons.

- Enhance the `CustomGrid` storybook story to test that the two buttons work as
  expected. To do this, add the `GridToolbar` to the story. Wrap `GridToolbar`
  and `CustomGrid` in `<GridContextProvider>`. Verify that the buttons work.

- Now let's focus on implementing the `Holdings` tab. Start by adding the
  `GridToolbar` and `CustomGrid` to this component and wrap them in
  `<GridContextProvider>`, just like the Storybook story we created above.

- Execute the `GetHoldings` query in the `Holdings` component. Pass the returned
  holdings into the `CustomGrid`. Also, pass in the appropriate `columnDefs`.
  Ignore the column containing the _Buy_ and _Sell_ buttons for now.

- Add the ag-Grid css into `/src/index.tsx` to make sure that the required
  styles are available:

```tsx
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
```

- Create a MSW handler to return the holdings for a given account. Use the
  sample data in `/src/mocks/data/holdings.json`.

- Try out the holdings tab in the app now. Does it work? Make sure that the
  numbers are formatted as show in the Visual design. Specify the
  `valueFormatter` property of `ColDef ` for this. Use `NumberUtils` to make
  this formatting easier.

- Now make the Refresh button work. It should fetch fresh holdings from the
  server and re-render the grid.

- So far we have been using the built-in alpine theme for the ag-Grid. Let's
  override this theme to make the grid look like the visual design. To do this
  remove the two ag-Grid css imports in `/src/index.tsx`. Replace them with an
  import of an `index.scss` file. Make sure that the styling of the grid
  changes. Review the `index.scss` file to see how we override the default
  alpine theme.

- Finally, implement the _Buy_ and _Sell_ buttons shown in ag-Grid rows. For
  this, implement a React component called `ActionsRenderer` at
  `/src/pages/AccountsPage/Holdings/ActionsRenderer.tsx`. For now, just show an
  alert when these buttons are clicked. The alert should show the security that
  was clicked. Here's the full implementation of the cell renderer. Make sure
  you understand how it works:

```tsx
import { ICellRendererParams } from 'ag-grid-community';

export const ActionsRenderer = ({ data }: ICellRendererParams) => {
  const btnClickedHandler = () => {
    alert(data.security.id);
  };

  return (
    <div className="flex items-center justify-between h-full">
      <button className="btn-xs btn-outline-buy" onClick={btnClickedHandler}>
        Buy
      </button>
      <button className="btn-xs btn-outline-sell" onClick={btnClickedHandler}>
        Sell
      </button>
    </div>
  );
};
```

- Coming back to `Holdings.tsx`, add a new column to the grid called `actions`.
  This column will use the cell renderer implemented above. First register the
  cell renderer with ag-Grid:

```tsx
export const Holdings = () => {

  ...

  const frameworkComponents = {
    actionsRenderer: ActionsRenderer,
  };

  return (
    <CustomGrid
      columnDefs={columnDefs}
      frameworkComponents={frameworkComponents}
      rowData={holdings}
    />
  );
};
```

- Now specify a new column that used this cell renderer:

```ts
{
  field: 'actions',
  headerName: '',
  cellRenderer: 'actionsRenderer',
  width: 148,
  suppressSizeToFit: true,
  // suppress column menu, sorting and filtering
  menuTabs: [],
  resizable: false,
  sortable: false,
  filter: false,
}
```

- Try out the grid to make sure that the actions column works correctly.

- Attach a screenshot of your implementation to your pull request.
