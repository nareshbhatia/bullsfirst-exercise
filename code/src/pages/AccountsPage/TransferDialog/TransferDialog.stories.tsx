import React, { useEffect } from 'react';
import { Meta } from '@storybook/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { HorizontalContainer } from '../../../components';
import { RefreshContextProvider } from '../../../contexts';
import { AccountContextProvider, useAccountContext } from '../AccountContext';
import { TransferContextProvider, useTransferContext } from './TransferContext';
import { TransferDialog } from './TransferDialog';

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
  const { setTransferState } = useTransferContext();

  const handleTransferClicked = () => {
    setTransferState({ showDialog: true });
  };

  return (
    <HorizontalContainer className="paper border-paper p-2">
      <button
        className="btn-sm btn-outline-secondary"
        onClick={handleTransferClicked}
      >
        Transfer
      </button>
    </HorizontalContainer>
  );
};

const TestContainer = () => {
  return (
    <Router>
      <AccountContextProvider>
        <RefreshContextProvider>
          <TransferContextProvider>
            <AccountInitializer />
            <AccountHeader />
            <TransferDialog />
          </TransferContextProvider>
        </RefreshContextProvider>
      </AccountContextProvider>
    </Router>
  );
};

export default {
  title: 'Pages/Accounts',
  component: TransferDialog,
} as Meta;

export const TransferDialogStory = () => {
  return <TestContainer />;
};
TransferDialogStory.storyName = 'TransferDialog';
