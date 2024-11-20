import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from './components/Header';
import Home from "./pages/Home";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import NotFound from './pages/NotFound';
import Otp from './components/Checkout/Otp'; // Import Otp component

import ProductLoader from './loaders/productLoader';
import TimerContext from "./context/TimerContext";
import { useState } from 'react';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "product/:name",
        element: <Product />,
        loader: ProductLoader,
      },
      {
        path: "checkout/:name",
        element: <Checkout />,
        loader: ProductLoader
      },
      {
        path: "/otp", // Define OTP route
        element: <Otp /> // Use the correct OTP component path
      }
    ]
  }
]);

function App() {
  const minute = 5;
  const date = new Date(Date.now() + ((60 * minute) * 1000));
  const [countdown, set_countdown] = useState(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

  return (
    <TimerContext.Provider value={countdown}>
      <RouterProvider router={routes} />
    </TimerContext.Provider>
  );
}

export default App;
