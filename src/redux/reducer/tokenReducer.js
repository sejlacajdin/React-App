export const defaultState = {
    token: null,
  };
  
  export const tokenReducer = (state = defaultState, action) => {
    switch (action.type) {
      case "CREATE_TOKEN":
        return { ...state, ...action.data };
      default:
        return state;
    }
  };
  
  