const GET_EXCHANGES = 'GET_EXCHANGES';

const exchangeUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

const initialState = [];

const loadexchange = (payload) => ({
  type: GET_EXCHANGES,
  payload,
});

export const getexchange = () => async (dispatch) => {
  const response = await fetch(exchangeUrl);
  const data = response.json();

  data
    .then((respond) => {
      dispatch(loadexchange(respond));
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const exchangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXCHANGES:
      return [ ...state, action.payload ];
    default:
      return state;
  }
};

export default exchangeReducer;
