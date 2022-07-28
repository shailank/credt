import '../public/styles/globals.css';
import {createStore} from 'redux';
import rootReducer from '../redux/reducer/index';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

function MyApp({ Component, pageProps }) {
  return ( 
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  ) 
}

export default MyApp;
