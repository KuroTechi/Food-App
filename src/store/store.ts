import { configureStore, Middleware } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE, login, register, userActions } from './user.slice';
import { saveState } from './storage';
import cartSlice, { CART_PERSISTENT_STATE, cartActions } from './cart.slice';


export const authMiddleware: Middleware = () => next => action => {
    const result = next(action);

    if (login.fulfilled.match(action) || register.fulfilled.match(action)) {
        const jwt = action.payload?.access_token;
        saveState({ jwt }, JWT_PERSISTENT_STATE);
    }
    if (userActions.logout.match(action)) {
        saveState({ jwt: null }, JWT_PERSISTENT_STATE);
    }
    return result;
};

export const cartMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    if (cartActions.add.match(action) || cartActions.remove.match(action) || cartActions.delete.match(action)
    ) {
        console.log(store.getState().cart);

        saveState(store.getState().cart, CART_PERSISTENT_STATE);
    }
    return result;
};



export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware, cartMiddleware)
});

// store.subscribe(() => {
//     saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;