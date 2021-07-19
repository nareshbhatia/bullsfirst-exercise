import React from 'react';
import { Meta } from '@storybook/react';
import { HorizontalContainer } from '../Containers';
import { useMessageContext } from './MessageContext';
import { MessageDialog } from './MessageDialog';

export default {
  title: 'Components/MessageDialog',
  component: MessageDialog,
} as Meta;

export const MessageDialogStory = () => {
  const { setMessageState } = useMessageContext();

  const closeButton = {
    label: 'Close',
    className: 'btn-sm btn-outline-secondary',
    onClick: () => {
      setMessageState({ showDialog: false });
    },
  };

  const viewTransactionsButton = {
    label: 'View Transactions',
    className: 'btn-sm btn-primary ml-1',
    onClick: () => {
      setMessageState({ showDialog: false });
      alert('View Transactions button clicked');
    },
  };

  const handleShowMessageClicked = () => {
    setMessageState({
      showDialog: true,
      title: 'SUCCESS',
      message: 'Your transfer was successful.',
      buttonSpecs: [closeButton, viewTransactionsButton],
    });
  };

  return (
    <HorizontalContainer className="paper border-paper p-2">
      <button
        className="btn-sm btn-outline-secondary"
        onClick={handleShowMessageClicked}
      >
        Show Message
      </button>
    </HorizontalContainer>
  );
};
MessageDialogStory.storyName = 'MessageDialog';
