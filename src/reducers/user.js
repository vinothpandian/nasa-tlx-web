import { handleAction } from 'redux-actions';
import { Map } from 'immutable';

const defaultState = new Map({
  loginStatus: true,
  userID: 'NvTI1mpnvkyHxkmcGeFHRg',
  username: 'Vinoth',
});

export default handleAction('TEST', state => state, defaultState);
