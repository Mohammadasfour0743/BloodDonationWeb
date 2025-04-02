import { createBrowserRouter, RouterProvider } from 'react-router';
import { getModel, persistFirebase, saveRequests } from './model/firebaseModel.js';
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

/* getModel(); */

/* const testRequest = {
  id: "test123",
  urgency: "high",
  hospitalId: "edgd",
  bloodType: "O+",
  amount: 2,
  description: "Need urgent blood donation"
};
saveRequests(testRequest); */


ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
export { reactiveModel };

