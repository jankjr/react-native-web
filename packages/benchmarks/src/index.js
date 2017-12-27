import aphrodite from './implementations/aphrodite';
import cssModules from './implementations/css-modules';
import emotion from './implementations/emotion';
import jss from './implementations/jss';
import glamor from './implementations/glamor';
import radium from './implementations/radium';
import reactNativeWeb from './implementations/react-native-web';
import reactxp from './implementations/reactxp';
import styledComponents from './implementations/styled-components';
import styletron from './implementations/styletron';

import renderDeepTree from './cases/renderDeepTree';
import renderSierpinskiTriangle from './cases/renderSierpinskiTriangle';
import renderTweet from './cases/renderTweet';
import renderWideTree from './cases/renderWideTree';

const testMatrix = {
  'css-modules': [
    () => renderSierpinskiTriangle('css-modules', cssModules),
    () => renderDeepTree('css-modules', cssModules),
    () => renderWideTree('css-modules', cssModules)
  ],
  'react-native-web': [
    () => renderTweet('react-native-web', reactNativeWeb),
    () => renderSierpinskiTriangle('react-native-web', reactNativeWeb),
    () => renderDeepTree('react-native-web', reactNativeWeb),
    () => renderWideTree('react-native-web', reactNativeWeb)
  ],

  aphrodite: [
    () => renderDeepTree('aphrodite', aphrodite),
    () => renderWideTree('aphrodite', aphrodite)
  ],
  emotion: [
    () => renderSierpinskiTriangle('emotion', emotion),
    () => renderDeepTree('emotion', emotion),
    () => renderWideTree('emotion', emotion)
  ],
  glamor: [
    () => renderSierpinskiTriangle('glamor', glamor),
    () => renderDeepTree('glamor', glamor),
    () => renderWideTree('glamor', glamor)
  ],
  jss: [
    () => renderDeepTree('jss', jss),
    () => renderWideTree('jss', jss)
  ],
  radium: [
    () => renderSierpinskiTriangle('radium', radium),
    () => renderDeepTree('radium', radium),
    () => renderWideTree('radium', radium)
  ],
  reactxp: [
    () => renderSierpinskiTriangle('reactxp', reactxp),
    () => renderDeepTree('reactxp', reactxp),
    () => renderWideTree('reactxp', reactxp)
  ],
  'styled-components': [
    () => renderSierpinskiTriangle('styled-components', styledComponents),
    () => renderDeepTree('styled-components', styledComponents),
    () => renderWideTree('styled-components', styledComponents)
  ],
  styletron: [
    () => renderDeepTree('styletron', styletron),
    () => renderWideTree('styletron', styletron)
  ]
};

const allTests = Object.keys(testMatrix).reduce((acc, curr) => {
  testMatrix[curr].forEach(test => {
    acc.push(test);
  });
  return acc;
}, []);

const tests = [];

if (window.location.search) {
  window.location.search
    .slice(1)
    .split(',')
    .forEach(implementation => {
      if (Array.isArray(testMatrix[implementation])) {
        tests.push(...testMatrix[implementation]);
      } else {
        throw new Error(`Benchmark for ${implementation} not found`);
      }
    });
} else {
  tests.push(...allTests);
}

tests.push(() => () => Promise.resolve(console.log('Done')));

tests.reduce((promise, test) => promise.then(test()), Promise.resolve());
