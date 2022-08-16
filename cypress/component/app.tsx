import React, { Fragment } from 'react';
import { ReCron, ReUnixCron, ReQuartzCron, Tab } from '@sbzen/re-cron';

import { TestContainer } from './container';

export const App = () => {
  return (
    <Fragment>
      <TestContainer
        type="ReCron"
        initialValue="0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1"
        render={props => <ReCron {...props}/>}/>

      <TestContainer
        type="ReUnixCron"
        initialValue="0,5,12 4 8-14 * *"
        initialTabs={[Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH]}
        render={props => <ReUnixCron {...props}/>}/>

      <TestContainer
        type="ReQuartzCron"
        initialValue="0,1,2 2/4 6/2 ? 2-7 SUN,MON 2019/1"
        render={props => <ReQuartzCron {...props}/>}/>
    </Fragment>
  );
};

export default App;
