import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Main from '../pages/main';
import Work from '../pages/work';
import History from '../pages/history';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Main /> },
      {
        path: 'work',
        element: <Work />,
        //loader: () => ({ title: "첫 번째 페이지" }),
      },
      {
        path: 'history',
        element: <History />,
      },
    ],
  },
  {
    path: '*',
    //element: <NotFound />,
  },
]);
