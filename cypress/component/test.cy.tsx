import React from 'react'
import { mount } from '@cypress/react'

import { activeTab, cssClasses, localization, disabled, tabChange, tabs, hideTabs, values } from '@sbzen/e2e';

import { App } from './app';

const beforeEachCb = () => beforeEach(() => mount(<App/>));

activeTab(beforeEachCb);
cssClasses(beforeEachCb, false);
localization(beforeEachCb);
disabled(beforeEachCb);
tabChange(beforeEachCb);
tabs(beforeEachCb);
hideTabs(beforeEachCb);
values(beforeEachCb);
