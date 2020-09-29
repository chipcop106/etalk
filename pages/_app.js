import React from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import App from 'next/app';
import Router from 'next/router';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import 'react-toastify/scss/main.scss';
import '~/components/Header/header.scss';
import '~/styles/dashforge.scss';
import '~/styles/styles.scss';
import '~/components/Layout/layout.scss';
import '~/styles/responsive.scss';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
config.autoAddCss = false;
library.add(fas, far);
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {}),
			},
		};
	}

	componentDidMount() {
		if (process.env.NODE_ENV !== 'production') {
			const axe = require('react-axe');
			axe(React, ReactDOM, 1000);
		}
	}

	render() {
		const { Component, pageProps } = this.props;
		const getLayout = Component.getLayout || ((page) => page);

		return (
			<>
				<Head>
					<title>E-talk Elearning</title>
				</Head>
				{getLayout(
					typeof window !== 'undefined' ? <Component {...pageProps} /> : null,
				)}
			</>
		);
	}
}
