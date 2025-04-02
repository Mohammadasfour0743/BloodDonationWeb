import { createBrowserRouter, RouterProvider } from 'react-router';
import { persistFirebase } from './model/firebaseModel.js';
import LoginPage from './routes/LoginPage.js';
import ReactDOM from 'react-dom/client';
import './index.css';
import HospitalProfile from './routes/HospitalProfile.js';
import { configure, observable, reaction } from 'mobx';
import { model } from './model/model.js';

configure({ enforceActions: 'always' });
const reactiveModel = observable(model);

global.myModel = reactiveModel;

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

//getModel();

persistFirebase(reactiveModel, reaction);

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
export { reactiveModel };

