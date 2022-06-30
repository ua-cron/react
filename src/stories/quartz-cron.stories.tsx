import React, { useState, Fragment } from 'react';
import { Story, ComponentMeta } from '@storybook/react';

import { ReQuartzCron, ReQuartzCronProps, Tab } from './../lib';

const Wrapper = (args: ReQuartzCronProps) => {
  const [value, setValue] = useState('');
  return (
    <Fragment>
      <input className='form-control mb-2' readOnly value={value} />
      <ReQuartzCron {...args} value={value} onChange={setValue}/>
    </Fragment>
  )
};

export default {
  title: 'ReQuartzCron',
  component: ReQuartzCron,
  parameters: {
    activeTab: {
      values: [
        Tab.SECONDS,
        Tab.MINUTES,
        Tab.HOURS,
        Tab.MONTH,
        Tab.DAY,
        Tab.YEAR
      ]
    }
  }
} as ComponentMeta<typeof ReQuartzCron>;

const Template: Story<ReQuartzCronProps> = args => <Wrapper {...args} />;
export const Default = Template.bind({});
Default.args = {};
