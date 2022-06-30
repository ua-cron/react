export const genClassName = (cssClassPrefix = '', classes: string[], noPrefixClasses: string[] = []) => {
  const prefixed = classes.map(c => cssClassPrefix + c);
  return prefixed.concat(noPrefixClasses).join(' ');
};
