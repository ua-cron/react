[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://vshymanskyy.github.io/StandWithUkraine)

# Quartz/Unix Cron Component - React

[React](https://reactjs.org/) cron widget built from the ground up using only [Bootstrap 4](https://getbootstrap.com/) CSS.

Please check our [demo & documentation](https://recron.emptyui.com) and the list of
[issues](https://github.com/ua-cron/react/issues) to see all the things we are working on. Feel free to make comments there.

<p align="center">
	<a href="https://recron.emptyui.com">
		<img
			width="200"
			src="https://res.cloudinary.com/dwkakr4wt/image/upload/v1661086527/cron/recron.png"
			alt="Quartz/Unix Cron Component - React">
	</a>
</p>

<p align="center">
	<a href="https://badge.fury.io/js/%40sbzen%2Fre-cron">
		<img
			src="https://badge.fury.io/js/%40sbzen%2Fre-cron.svg"
			alt="npm version">
	</a>
	<a href="https://npmjs.org/%40sbzen%2Fre-cron">
		<img
			src="https://img.shields.io/npm/dm/%40sbzen%2Fre-cron.svg"
			alt="npm downloads">
	</a>
</p>

## Getting Started

This is an open source project that builds a cron builder component for React applications.
It supports Quartz/Unix cron string formats for both input and output.
Inspired by this [non-react](https://www.freeformatter.com/cron-expression-generator-quartz.html) implementation.

## Installation
You can use either the npm or yarn command-line tool to install packages.
```
npm install --save @sbzen/re-cron
```

## Display the cron component
Import and add the cron component into your jsx/tsx.

```tsx
import React, { useState } from 'react';
import { ReQuartzCron } from '@sbzen/re-cron';

const App = () => {
  const [value, setValue] = useState('2,0,4,3,1 0/1 3/2 ? * 4/5 *');

  return (
    <ReQuartzCron
      value={value}
      onChange={setValue}/>
  );
};
export default App;
```

## Usage & Demo
Main source of API documentation and usage scenarios available here: https://recron.emptyui.com.


## Compatibility
The only two required dependencies are React and cron-core.
The Bootstrap CSS is optional as you can use this component with your own styling.
Here is the versions compatibility list:

| Re Cron          |    React    |  Bootstrap CSS |
| -------------    | ------------- | -------------- |
| 0.0.1            | 16.x.x         | 4.x.x          |
| 2.0.0            | 17.x.x         | 4.x.x          |
