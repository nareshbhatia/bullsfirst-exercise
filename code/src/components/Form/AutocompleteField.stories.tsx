import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Story, Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { GetSecuritiesDocument } from '../../graphql';
import { AutocompleteField } from './AutocompleteField';

// ---------- TestForm ----------
const schema = yup.object().shape({
  security: yup
    .object()
    .shape({
      id: yup.string().required('symbol is required'),
      name: yup.string().required('symbol is required'),
    })
    .typeError('symbol is required')
    .required(),
});

type Security = { id: string; name: string };

type Order = { security: Security };

interface TestFormProps {
  onSubmit: (order: Order) => void;
}

function TestForm({ onSubmit }: TestFormProps) {
  const apolloClient = useApolloClient();

  const { control, formState, handleSubmit } = useForm<Order>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      security: {
        id: 'AAPL',
        name: 'Apple Inc',
      },
    },
  });
  const { errors } = formState;

  const loadOptions = async (inputValue: string): Promise<Array<Security>> => {
    const result = await apolloClient.query({
      query: GetSecuritiesDocument,
      variables: {
        query: inputValue,
      },
      fetchPolicy: 'no-cache',
    });
    return result.data.securities;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <AutocompleteField<Security>
          id="security"
          name="security"
          label="Symbol"
          // @ts-ignore
          error={errors.security?.message || errors.security?.id?.message}
          control={control}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => `${option.id} (${option.name})`}
          loadOptions={loadOptions}
        />
      </div>

      <button className="btn-lg w-full" type="submit">
        Submit
      </button>
    </form>
  );
}

export default {
  title: 'Forms/AutocompleteField',
  component: AutocompleteField,
} as Meta;

const Template: Story = () => {
  const [order, setOrder] = useState<Order>();

  return (
    <div style={{ width: 320 }}>
      <TestForm onSubmit={setOrder} />
      <div className="mt-2">
        <h4 className="m-0">Form value</h4>
        <p>Symbol: {order?.security.id}</p>
      </div>
    </div>
  );
};

export const AutocompleteFieldStory = Template.bind({});
AutocompleteFieldStory.storyName = 'AutocompleteField';
AutocompleteFieldStory.args = {};
