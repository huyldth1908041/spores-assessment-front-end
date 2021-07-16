import '../styles/globals.css'
//antd css
import 'antd/dist/antd.css';
import 'boxicons/css/boxicons.min.css'
import React from "react";
import AppLayout from "../components/AppLayout";
import {Provider} from "react-redux";
import store from "../state";

function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>

    )
}

export default MyApp
