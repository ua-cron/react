import React, { useState } from 'react';
import { Tab, CronLocalization } from '@sbzen/re-cron';

import { getLocalizationPathes, getLocalization } from './localization';

export const TestContainer = ({
  type = '',
  render,
  initialValue,
  initialTabs = [Tab.SECONDS, Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR]
}) => {
  const [value, setValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(false);
  const [hideTabs, setHideTabs] = useState(false);
  const [cssClassPrefix, setCssClassPrefix] = useState<string|undefined>(undefined);
  const [activeTab, setActiveTab] = useState<Tab|undefined>(undefined);
  const [localization, setLocalization] = useState<CronLocalization|undefined>(undefined);
  const [tabs, setTabs] = useState<Tab[]|undefined>(undefined);

  const getLocalizationValue = (path: string, loc = getLocalization()) => {
    const paths = path.split('.');
    const lastProp = paths[paths.length - 1];
    const store = paths.slice(0, paths.length - 1).reduce((acc, prop) => acc[prop], loc);
    return store[lastProp];
  }

  const updateLocalizationField = (path: string, localizationValue: string) => {
    if (!localization) {
      return;
    }
    const paths = path.split('.');
    const lastProp = paths[paths.length - 1];
    const store = paths.slice(0, paths.length - 1).reduce((acc, prop) => acc[prop], localization);
    store[lastProp] = localizationValue;
    setLocalization({ ...localization });
  };

  const addedTab = (tab: Tab) => (tabs || []).includes(tab);

  const toggleTab = (tab: Tab) => {
    const tabsToUse = tabs || [];
    if (addedTab(tab)) {
      setTabs(tabsToUse.filter(t => t !== tab));
      return;
    }
    setTabs([
      ...tabsToUse,
      tab
    ]);
  };

  return (
    <div
      className="re-cron-test"
      data-cron-type={type}>

      <h1>{type}</h1>

      <input
        data-cron="value"
        value={value}
        onChange={e => setValue(e.target.value)}/>

      <button
        data-cron-action="localization-reset"
        className="ml-1"
        onClick={() => setLocalization(undefined)}>
        Reset Localization
      </button>
      <button
        data-cron-action="localization-use"
        className="ml-1"
        onClick={() => setLocalization(localization || getLocalization())}>
        Use Localization
      </button>
      <button
        data-cron-action="disable"
        className="ml-1"
        onClick={() => setDisabled(!disabled)}>
        Disable
      </button>
      <button
        data-cron-action="hide-tabs"
        className="ml-1"
        onClick={() => setHideTabs(true)}>
        Hide tabs
      </button>
      <button
        data-cron-action="show-tabs"
        className="ml-1"
        onClick={() => setHideTabs(false)}>
        Show tabs
      </button>
      <button
        data-cron-action="add-css-class-prefix"
        className="ml-1"
        onClick={() => setCssClassPrefix('my-')}>
        Add "my-" css prefix
      </button>
      <button
        data-cron-action="remove-css-class-prefix"
        className="ml-1"
        onClick={() => setCssClassPrefix(undefined)}>
        Remove "my-" css prefix
      </button>

      <div className="mt-1">
        {getLocalizationPathes().map((path, i) => (
          <input
            data-cron-action="localization-field"
            data-cron-action-value={path}
            className="mr-1 mw-fixed-70"
            key={i}
            disabled={!localization}
            placeholder={path}
            value={getLocalizationValue(path, localization)}
            onChange={e => updateLocalizationField(path, e.target.value)}/>
        ))}
      </div>

      <div className="mt-1">
        <button
          className="mr-1"
          data-cron-action="reset-tab"
          onClick={() => setTabs(undefined)}>
          Reset Tabs
        </button>
        <button
          className="mr-1"
          data-cron-action="hide-tab"
          onClick={() => setTabs([])}>
          Remove Tabs
        </button>
        {initialTabs.map((tab, i) => (
          <button
            className="mr-1"
            data-cron-action="toggle-tab"
            data-cron-action-value={tab}
            key={i}
            onClick={() => toggleTab(tab)}>
            {tab}
            {addedTab(tab) ? '-' : '+'}
          </button>
        ))}
      </div>

      <div className="mt-1">
        {initialTabs.map((tab, i) => (
          <button
            className="mr-1"
            data-cron-action="change-tab"
            data-cron-action-value={tab}
            key={i}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div data-cron-active-tab={activeTab}>
        {activeTab}
      </div>

      <div data-cron-host>
        {render({
          value,
          cssClassPrefix,
          localization,
          activeTab,
          tabs,
          onChange: setValue,
          hideTabs,
          onTabChange: setActiveTab,
          disabled
        })}
      </div>
    </div>
  );
};
