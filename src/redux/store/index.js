import { applyMiddleware, createStore, compose } from "redux";
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import * as localforage from "localforage";
import axios from 'axios';
import { createLogger } from 'redux-logger';

offlineConfig.persistOptions = { storage: localforage };

const customConfig = {
  ...offlineConfig,
  effect: (effect, action) => {
    return axios.post(effect.url, action.payload && action.payload.content);
  }
};

// Create the logger
const logger = createLogger();

// Apply middleware
const middleware = applyMiddleware(thunk, logger);

const store = createStore(
  rootReducer,
  compose(
    middleware,
    offline(customConfig)
  )
);

export default store;
