import { combineReducers } from 'redux';
import authReducer from './auth';
import learnCardPreviewReducer from './learnCardPreview';

export default combineReducers({
  auth: authReducer,
  learnCardPreview: learnCardPreviewReducer,
});
