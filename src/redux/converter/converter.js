const GET_CONVERTER = 'GET_CONVERTER';
const APIKEY = '9e67fc888564b46b79e331a0';
const converterUrl = `https://v6.exchangerate-api.com/v6/${APIKEY}/latest/USD`;

const initialState = [];

const converter = (payload) => ({
  type: GET_CONVERTER,
  payload,
});

export const getConverter = () => async (dispatch) => {
  const response = await fetch(converterUrl);
  const data = response.json();

  data
    .then((respond) => {
      dispatch(converter(respond));
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const converterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERTER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default converterReducer;
