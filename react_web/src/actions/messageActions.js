import axios from 'axios';
import { ADD_MESSAGE } from './typesOfMessage';

export const addMessage = message => dispatch => {
  axios.post('/api/messages', message).then(res =>
    dispatch({
      type: ADD_MESSAGE,
      payload: res.data
    })
  );
};
