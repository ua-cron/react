import React, { useState, useEffect, Fragment } from 'react';
import { Story, ComponentMeta } from '@storybook/react';

import { ReQuartzCron, ReQuartzCronProps, Tab } from './../lib';

const Wrapper = (args: ReQuartzCronProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => setValue(args.value), [args.value])

  return (
    <Fragment>
      <input className="form-control mb-2" readOnly value={value}/>
      <ReQuartzCron {...args} value={value} onChange={setValue}/>
    </Fragment>
  );
};

export default {
  title: 'ReQuartzCron',
  component: ReQuartzCron,
  argTypes: {
    tabs: {
      control: 'inline-check',
      options: [
        Tab.SECONDS,
        Tab.MINUTES,
        Tab.HOURS,
        Tab.MONTH,
        Tab.DAY,
        Tab.YEAR
      ]
    },
    activeTab: {
      control: 'inline-radio',
      options: [
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
Default.args = {
  value: '2,0,4,3,1 0/1 3/2 ? * 4/5 *'
};
