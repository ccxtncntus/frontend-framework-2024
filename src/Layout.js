import UserContext from './context';
import App from './App';
import Root from './Root';
import DemoAPI from './DemoAPI';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './pages/page404';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import PostDetail from './pages/postDetail';
import Login from './pages/login';
import RoutePrivate from './routePrivate';
import Register from './pages/register';
import { useState } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <RoutePrivate>
            <DemoAPI />
          </RoutePrivate>
        ),
      },
      {
        path: '/posts',
        element: (
          <RoutePrivate>
            <DemoAPI />
          </RoutePrivate>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/posts/:postId',
        element: <PostDetail />,
      },
    ],
  },
]);

const Layout = () => {
  const [userName, setUserName] = useState();
  // const user = localStorage.getItem("user")
  return (
    <>
      <UserContext.Provider value={[userName, setUserName]}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};
export default Layout;
