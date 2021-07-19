import React from 'react';
import { Meta } from '@storybook/react';
import { HorizontalContainer } from '../Containers';
import { ActionBar } from './ActionBar';

export default {
  title: 'Components/ActionBar',
  component: ActionBar,
} as Meta;

export const ActionBarStory = () => {
  const closeButton = {
    label: 'Close',
    className: 'btn-sm btn-outline-secondary',
    onClick: () => {
      alert('Close button clicked');
    },
  };

  const viewTransactionsButton = {
    label: 'View Transactions',
    className: 'btn-sm btn-primary ml-1',
    onClick: () => {
      alert('View Transactions button clicked');
    },
  };

  return (
    <HorizontalContainer className="paper border-paper p-2">
      <ActionBar buttonSpecs={[closeButton, viewTransactionsButton]} />
    </HorizontalContainer>
  );
};
ActionBarStory.storyName = 'ActionBar';
