import React from 'react'
import { mount } from '@cypress/react'

import { activeTab, cssClasses, localization, disabled, tabChange, tabs, hideTabs, values } from '@sbzen/e2e';
import { App } from './app';

describe('E2e tests', () => {
  beforeEach(() => mount(<App/>));

  activeTab();
  cssClasses();
  localization();
  disabled();
  tabChange();
  tabs();
  hideTabs();
  values();
});
