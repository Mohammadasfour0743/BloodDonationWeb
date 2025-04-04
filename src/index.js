import { configure, observable, reaction } from 'mobx';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import { fetchreq, persistFirebase } from './model/firebaseModel.js';
import { model } from './model/model.js';
import HospitalProfile from './routes/HospitalProfile.js';
import LoginPage from './routes/LoginPage.js';

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

fetchreq(reactiveModel)

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

