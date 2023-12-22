import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import store from './src/redux/store';

const RootApp = () => {
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}


AppRegistry.registerComponent(appName, () => RootApp);
