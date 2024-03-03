import React, { useState, useEffect } from 'react';
import {
  CronUnixUIService,
  UnixType,
  Type,
  getSegmentsList,
  getTypeSegments,
  getUnixTypes
} from '@sbzen/cron-core';

import { getLocalization, genSessionId, genClassName } from './../helpers';
import { CronHostProps } from './../cron-props.type';
import {
  UnixCronMinute,
  UnixCronHour,
  UnixCronMonth,
  UnixCronDay
} from './tabs';

export type ReUnixCronProps = CronHostProps<UnixType>;

export const ReUnixCron = ({
  localization: propLocalization,
  hideTabs: propHideTabs,
  tabs: propTabs,
  value = '',
  cssClassPrefix,
  activeTab,
  disabled,
  onTabChange,
  onChange
}: ReUnixCronProps) => {
  const tabs = (propTabs || getUnixTypes()).filter(t => ![
    Type.SECONDS,
    Type.YEAR
  ].includes(t));
  const [tab, setTab] = useState(activeTab || tabs[0]);
  const [service] = useState(new CronUnixUIService());
  const [renderCount, setRenderCount] = useState(0);
  const [session] = useState(genSessionId());
  const localization = getLocalization(propLocalization);
  const hasTabs = !propHideTabs && !!tabs.length;
  const tabProps = {
    cssClassPrefix,
    localization,
    session,
    service
  };

  useEffect(() => {
    const shouldUpdate = !!activeTab && activeTab !== tab;
    shouldUpdate && setTab(activeTab);
  }, [activeTab]);
  useEffect(() => () => service.destroy(), [service]);
  useEffect(() => listenChangas());
  useEffect(() => service.fillFromExpression(value), [value]);
  useEffect(() => service.setDisabled(disabled), [disabled]);

  const listenChangas = () => {
    const segments = getSegmentsList();
    return service.listen(segments, (_, segment) => {
      const shouldApply = getTypeSegments(tab).includes(segment);
      if (shouldApply) {
        applyChanges();
      }
    });
  };

  const genContent = () => {
    if (tab === Type.MINUTES) {
      return <UnixCronMinute {...tabProps}/>;
    } else if (tab === Type.HOURS) {
      return <UnixCronHour {...tabProps}/>;
    } else if (tab === Type.MONTH) {
      return <UnixCronMonth {...tabProps}/>;
    } else {
      return <UnixCronDay {...tabProps}/>;
    }
  };

  const genTabs = (activeTab: UnixType) => {
    const className = genClassName(cssClassPrefix, ['nav', 'nav-tabs', 'mb-2'], ['c-tabs']);
    return (
      <ul
        className={className}
        role="tablist"
        aria-label="Cron Generator Tabs">

        {tabs.map(t => genTab(t, activeTab))}
      </ul>
    );
  };

  const genTab = (tab: UnixType, activeTab: UnixType) => {
    const { tabs: tabsLocalization } = localization;
    const isActive = activeTab === tab;
    const className = genClassName(cssClassPrefix, ['nav-link', isActive ? 'active': ''], [tab, 'c-tab']);
    const tabKey = tab.toLowerCase() as keyof typeof tabsLocalization;

    return (
      <li
        key={tab}
        className={genClassName(cssClassPrefix, ['nav-item'], ['c-tab-item'])}>

        <button
          role="tab"
          type="button"
          className={className}
          aria-selected={isActive}
          tabIndex={isActive ? 0 : -1}
          onClick={() => changeTab(tab)}>

          {tabsLocalization[tabKey]}
        </button>
      </li>
    );
  };

  const changeTab = (tab: UnixType) => {
    setTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const applyChanges = () => {
    const str = service.toString();
    if (str !== value && onChange) {
      onChange(str);
    }
    setRenderCount(renderCount + 1);
  };

  return (
    <div className={'c-host c-unix'}>
      {hasTabs && genTabs(tab)}

      <div
        className="c-tab-content"
        style={{ outline: 'none' }}
        role="tabpanel"
        tabIndex={0}
        tab-name={tab}>
        {genContent()}
      </div>
    </div>
  );
};

export default ReUnixCron;
