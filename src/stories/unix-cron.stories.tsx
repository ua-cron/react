import React, { useState, useEffect, Fragment } from 'react';
import { Story, ComponentMeta } from '@storybook/react';

import { ReUnixCron, ReUnixCronProps, Tab } from './../lib';

const Wrapper = (args: ReUnixCronProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => setValue(args.value), [args.value])

  return (
    <Fragment>
      <input className="form-control mb-2" readOnly value={value}/>
      <ReUnixCron {...args} value={value} onChange={setValue}/>
    </Fragment>
  );
};

export default {
  title: 'ReUnixCron',
  component: ReUnixCron,
  argTypes: {
    tabs: {
      control: 'inline-check',
      options: [
        Tab.MINUTES,
        Tab.HOURS,
        Tab.MONTH,
        Tab.DAY
      ]
    },
    activeTab: {
      control: 'inline-radio',
      options: [
        Tab.MINUTES,
        Tab.HOURS,
        Tab.MONTH,
        Tab.DAY
      ]
    }
  }
} as ComponentMeta<typeof ReUnixCron>;

const Template: Story<ReUnixCronProps> = args => <Wrapper {...args} />;
export const Default = Template.bind({});
Default.args = {
  value: '0 40 7 ? * MON-FRI *'
};
