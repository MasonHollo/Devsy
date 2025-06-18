import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Products from '../components/Products';
import ManageProducts from '../components/ManageProducts/ManageProducts';
import ProductDetail from '../components/ProductDetails/ProductDetails';
import CreateProducts from '../components/CreateProduct.tsx/CreateProduct';
import UpdateProduct from '../components/ManageProducts/updateProduct';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "manageProducts",
        element: <ManageProducts />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />,
      },
        {
        path: "products/new",
        element: <CreateProducts />,
      },
        {
        path: "products/:productId/edit",
        element: <UpdateProduct />,
      },

    ],
  },
]);
