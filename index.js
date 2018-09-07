
// import {AppRegistry,AsyncStorage} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
//
// AppRegistry.registerComponent(appName, () => App);

import {AppRegistry,AsyncStorage} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import './shim';


AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;

