import ThemeReducer from "./theme"
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = {
    isDarkMode: ThemeReducer,
    //add more reducer late
}
const store= configureStore({
    devTools:process.env.NODE_ENV !== 'production',
    reducer: rootReducer
})
export default store