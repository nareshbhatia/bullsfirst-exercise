import React from 'react';
import { Meta } from '@storybook/react';
import { ColDef } from 'ag-grid-community';
import { ViewVerticalContainer } from './../Containers';
import { CustomGrid } from './CustomGrid';

interface Movie {
  name: string;
  year: number;
  rating: number;
}

const movies: Array<Movie> = [
  {
    name: 'The Shawshank Redemption',
    year: 1994,
    rating: 9.3,
  },
  {
    name: 'The Godfather',
    year: 1972,
    rating: 9.2,
  },
  {
    name: 'The Godfather: Part II',
    year: 1974,
    rating: 9.0,
  },
  {
    name: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
  },
  {
    name: '12 Angry Men',
    year: 1957,
    rating: 8.9,
  },
  {
    name: "Schindler's List",
    year: 1993,
    rating: 8.9,
  },
  {
    name: 'The Lord Of The Rings: The Return Of The King',
    year: 2003,
    rating: 8.9,
  },
  {
    name: 'Pulp Fiction',
    year: 1994,
    rating: 8.9,
  },
  {
    name: 'The Good, The Bad And The Ugly',
    year: 1966,
    rating: 8.8,
  },
  {
    name: 'The Lord Of The Rings: The Fellowship Of The Rings',
    year: 2001,
    rating: 8.8,
  },
];

const columnDefs: Array<ColDef> = [
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'year',
    headerName: 'Year',
    width: 130,
    suppressSizeToFit: true,
    type: 'rightAligned',
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 130,
    suppressSizeToFit: true,
    type: 'rightAligned',
    filter: 'agNumberColumnFilter',
  },
];

export default {
  title: 'Components/Grids',
  component: CustomGrid,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const CustomGridStory = () => (
  <ViewVerticalContainer className="p-2">
    <CustomGrid columnDefs={columnDefs} rowData={movies} />
  </ViewVerticalContainer>
);
CustomGridStory.storyName = 'CustomGrid';
