import React, { useEffect } from 'react';
import { Meta } from '@storybook/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { HorizontalContainer } from '../../../components';
import { RefreshContextProvider } from '../../../contexts';
import { AccountContextProvider, useAccountContext } from '../AccountContext';
import { OrderContextProvider, useOrderContext } from './OrderContext';
import { OrderDialog } from './OrderDialog';

const AccountInitializer = () => {
  const { setAccountState } = useAccountContext();

  useEffect(() => {
    setAccountState({
      account: { id: 'brokerage-account', name: 'BrokerageAccount' },
    });
  }, [setAccountState]);

  return null;
};

const AccountHeader = () => {
  const { setOrderState } = useOrderContext();

  const handleOrderClicked = () => {
    setOrderState({ showDialog: true });
  };

  return (
    <HorizontalContainer className="paper border-paper p-2">
      <button className="btn-sm btn-secondary" onClick={handleOrderClicked}>
        Trade
      </button>
    </HorizontalContainer>
  );
};

const TestContainer = () => {
  return (
    <Router>
      <AccountContextProvider>
        <RefreshContextProvider>
          <OrderContextProvider>
            <AccountInitializer />
            <AccountHeader />
            <OrderDialog />
          </OrderContextProvider>
        </RefreshContextProvider>
      </AccountContextProvider>
    </Router>
  );
};

export default {
  title: 'Pages/Accounts/OrderDialog',
  component: OrderDialog,
} as Meta;

export const OrderDialogStory = () => {
  return <TestContainer />;
};
OrderDialogStory.storyName = 'OrderDialog';
