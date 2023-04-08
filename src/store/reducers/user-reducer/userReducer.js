const UserReducer = (state, action) => {
    switch (action.type) {
        case "USER/CREATE_NEW_USER":
            console.log("Create New User");

            return {
                ...state,
                userId: action.payload.userId,
                displayName: action.payload.displayName,
                avatarUrl: action.payload.avatarUrl,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                timestamp: action.payload.timestamp,
                role: action.payload.role,
                authorized: action.payload.authorized,
            };

        case "USER/SET_EXISTING_USER":
            console.log("Setting Existing Details: ", action.payload);

            return {
                ...state,
                userId: action.payload.userId,
                displayName: action.payload.displayName,
                avatarUrl: action.payload.avatarUrl,
                role: action.payload.role,
                email: action.payload.email,
                timestamp: action.payload.timestamp,
                authorized: action.payload.authorized,
            };

        case "AUTH/LOGOUT":
            return {
                isAuthenticated: false,
            };

        default:
            return state;
    }
};

export default UserReducer;
