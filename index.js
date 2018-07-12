import { AppRegistry, YellowBox, I18nManager } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('rapp', () => App);
I18nManager.forceRTL(true);

// Fix YellowBox warning 
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
]);
