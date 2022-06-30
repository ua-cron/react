import React, { useState, Fragment } from 'react';
import { Story, ComponentMeta } from '@storybook/react';

import { ReUnixCron, ReUnixCronProps, Tab } from './../lib';

const Wrapper = (args: ReUnixCronProps) => {
  const [value, setValue] = useState('');
  return (
    <Fragment>
      <input className='form-control mb-2' readOnly value={value} />
      <ReUnixCron {...args} value={value} onChange={setValue}/>
    </Fragment>
  )
};

export default {
  title: 'ReUnixCron',
  component: ReUnixCron,
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
} as ComponentMeta<typeof ReUnixCron>;

const Template: Story<ReUnixCronProps> = args => <Wrapper {...args} />;
export const Default = Template.bind({});
Default.args = {};
