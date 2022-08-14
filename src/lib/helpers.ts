import { Mode } from '@sbzen/cron-core';

import { DeepPartial, localization, CronLocalization } from './cron-localization';

export const genSessionId = () => `${Date.now()}_${Math.random()}`;

export const genClassName = (cssClassPrefix = '', classes: string[], noPrefixClasses: string[] = []) => {
  const prefixed = classes.map(c => cssClassPrefix + c);
  return prefixed.concat(noPrefixClasses).join(' ');
};

export const genId = (mode: Mode, session: string, extra?: string) => {
  return `${mode}-${extra}${session}`;
};

export const getCssClassPrefix = (cssClassPrefix?: string) => cssClassPrefix || '';

export const localizeList = (list: { value: string, label: string }[], localizationStore: { [key: string]: string }) => {
  return list.map(v => ({
    ...v,
    label: localizeLabel(v.label, localizationStore)
  }));
}

export const localizeLabel = (label: string, localizationStore: { [key: string]: string }) => {
  return localizationStore[label.toLowerCase()]
}

export const getLocalization = (input?: CronLocalization) => {
  const args: RawObject[] = [localization];
  if (input) {
    args.push(input);
  }
  return mergeDeep<typeof localization>(...args);
}

type RawObject = DeepPartial<{
  [key: string]: string|RawObject;
}>;
const mergeDeep = <T extends RawObject>(...objects: RawObject[]) => {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (pVal && typeof pVal === 'object' && oVal && typeof oVal === 'object') {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {}) as T;
}
