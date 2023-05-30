import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '@redux/reducers/language.reducer';
import votingMethodReducer from '@redux/reducers/votingMethod.reducer';
import setupCheckpointsReducer from '@redux/reducers/setupCheckpoints.reducer';
import proposalReducer from '@redux/reducers/proposal.reducer';
import checkNodeReducer from '@redux/reducers/check-node.reducer';
import blueprintReducer from '@redux/reducers/blueprint.reducer';
import routeDetailReducer from '@redux/reducers/blueprint.reducer/routeDetail';
import uiReducer from '@redux/reducers/ui.reducer';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    votingMethod: votingMethodReducer,
    setupCheckpoints: setupCheckpointsReducer,
    proposal: proposalReducer,
    checkNode: checkNodeReducer,
    blueprint: blueprintReducer,
    routerDetail: routeDetailReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// action types
export const CLEAR_DATA = 'CLEAR_DATA';

// action creator
export const clearData = () => ({
  type: CLEAR_DATA,
});

const reducer = (state = {}, action: any) => {
  switch (action.type) {
    case CLEAR_DATA:
      return {};
    // other cases
    default:
      return state;
  }
};
