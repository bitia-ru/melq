import { StyleSheet as Aphrodite } from 'aphrodite/no-important';

const aphrodite = Aphrodite.extend([{
  selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
    if (selector[0] === '>') {
      const tag = selector.slice(1);
      const nestedTag = generateSubtreeStyles(`${baseSelector} ${tag}`);
      return nestedTag;
    }
    return null;
  },
}]);

export const { StyleSheet, css } = aphrodite;
