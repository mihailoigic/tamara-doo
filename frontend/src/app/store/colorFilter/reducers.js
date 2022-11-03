const initialState = {
    colors: [],
};
const colorReducer = (
        state = initialState,
            action,
    ) => {
    switch (action.type) {
        case 'SET_FILTER_COLOR':
            return {
                ...state,
                colors: action.payload,
            };
    }
    return state;
};

export default colorReducer;
