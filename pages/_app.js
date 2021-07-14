import '../styles/globals.css'
//antd css
import 'antd/dist/antd.css';
import 'boxicons/css/boxicons.min.css'
import React from "react";
import AppLayout from "../components/AppLayout";

function MyApp({Component, pageProps}) {
    return (
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>

    )
}

export default MyApp
