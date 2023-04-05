import "this/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { store } from "../features/app/store";
import { Provider } from "react-redux";
import ErrorBoundary from "this/features/Sections/ErrorBoundary";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
      <ErrorBoundary>
        <Component {...pageProps}/>
    </ErrorBoundary>
      </SessionProvider>
    </Provider>
  );
}
