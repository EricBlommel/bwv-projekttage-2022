import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {composeWithDevToolsDevelopmentOnly} from '@redux-devtools/extension';
import {themeReducer} from "../reducers/theme.reducer";

const rootReducer = combineReducers({
  themeStore: themeReducer,
});

export const store = createStore(rootReducer, composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;