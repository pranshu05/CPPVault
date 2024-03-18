import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/(layout)/NavBar";
import Footer from "@/components/(layout)/Footer";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="min-h-dvh w-dvw p-0 m-0 bg-black text-white flex flex-col">
            <Analytics />
            <Head>
                <meta name='og:type' content='docs' />
                <meta name='og:url' content='http://cppvault.vercel.app' />
                <meta name='og:image' content='https://github.com/pranshu05/pranshu05/assets/70943732/f0d7ded9-c81c-427e-aadf-a4f1b0f26673' />
                <meta name='twitter:image' content='https://github.com/pranshu05/pranshu05/assets/70943732/f0d7ded9-c81c-427e-aadf-a4f1b0f26673' />
                <meta name='og:site_name' content='CPPVault' />
            </Head>
            <NavBar />
            <div className="flex-1">
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    );
}