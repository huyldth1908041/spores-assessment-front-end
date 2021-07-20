import '../styles/globals.css'
//antd css
import 'antd/dist/antd.css';
import 'boxicons/css/boxicons.min.css'
import React from "react";
import AppLayout from "../src/components/AppLayout";
import {Provider} from "react-redux";
import store from "../src/state";
import {Toaster} from "react-hot-toast";

function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <AppLayout>
                <Component {...pageProps} />
                <Toaster/>
            </AppLayout>
        </Provider>

    )
}

export default MyApp
