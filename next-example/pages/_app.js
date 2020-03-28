import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import thunk from 'redux-thunk'
import withRedux from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxPromiseMiddleWare from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducers from '../store/reducers'

// const makeStore = (initialState, options) => {
//   return createStore(
//     reducers,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunk))
//   )
// }

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // we can dispatch from here too
    // ctx.store.dispatch({ type: 'FOO', payload: 'foosdsadsa' })

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux((initialState, options) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(reduxPromiseMiddleWare, thunk, logger))
  )
})(MyApp)
