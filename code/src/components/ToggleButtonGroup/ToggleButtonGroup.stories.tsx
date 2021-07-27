import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { ToggleButtonGroup } from './ToggleButtonGroup';

export default {
  title: 'Components/ToggleButtonGroup',
  component: ToggleButtonGroup,
} as Meta;

export const ToggleButtonGroupStory = () => {
  const [color, setColor] = useState<string | undefined>('R');

  return (
    <div style={{ width: '40%', height: 48 }}>
      <ToggleButtonGroup
        value={color}
        onChange={setColor}
        options={[
          { value: 'R', label: 'Red' },
          { value: 'G', label: 'Green' },
          { value: 'B', label: 'Blue' },
        ]}
      />

      <p className="mt-2">Color: {color}</p>
    </div>
  );
};
ToggleButtonGroupStory.storyName = 'ToggleButtonGroup';
