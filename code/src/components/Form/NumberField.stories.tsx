import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NumberField } from './NumberField';

// ---------- TestForm ----------
const schema = yup.object().shape({
  quantity: yup.number().typeError('quantity must be a number').required(),
  price: yup.number().typeError('price must be a number').required(),
});

interface Holding {
  quantity: number;
  price: number;
}

interface TestFormProps {
  onSubmit: (holding: Holding) => void;
}

function TestForm({ onSubmit }: TestFormProps) {
  const { control, formState, handleSubmit } = useForm<Holding>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <NumberField
          id="quantity"
          name="quantity"
          decimalScale={0}
          control={control}
          label="Quantity"
          error={errors.quantity?.message}
        />
      </div>

      <div className="mb-5">
        <NumberField
          id="price"
          name="price"
          decimalScale={2}
          control={control}
          label="Price"
          error={errors.price?.message}
        />
      </div>

      <button className="btn-lg w-full" type="submit">
        Submit
      </button>
    </form>
  );
}

export default {
  title: 'Forms/NumberField',
  component: NumberField,
} as Meta;

const Template: Story = () => {
  const [holding, setHolding] = useState<Holding>();

  return (
    <div style={{ width: 320 }}>
      <TestForm onSubmit={setHolding} />
      <div className="mt-5">
        <h4>Form value</h4>
        <p>quantity: {holding?.quantity}</p>
        <p>price: {holding?.price}</p>
      </div>
    </div>
  );
};

export const NumberFieldStory = Template.bind({});
NumberFieldStory.storyName = 'NumberField';
NumberFieldStory.args = {};
