import { createBrowserRouter, RouterProvider } from 'react-router';

import LoginPage from './routes/LoginPage.js';
import ReactDOM from 'react-dom/client';
import './index.css';
import HospitalProfile from './routes/HospitalProfile.js';
import { configure, observable } from 'mobx';
import { model } from './model/model.js';

configure({ enforceActions: 'always' });
const reactiveModel = observable(model);

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage model={reactiveModel} />,
  },
  {
    path: '/hospitalprofile',
    element: <HospitalProfile model={reactiveModel} />,
  },
]);

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
export { reactiveModel };
