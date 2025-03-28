import { createBrowserRouter, RouterProvider } from 'react-router';

import LoginPage from './routes/LoginPage.js';
import ReactDOM from 'react-dom/client';
import './index.css';
import HospitalProfile from './routes/HospitalProfile.js';
import { model } from './testmodel.js';
import { connectToPersistence,saveModelToFirestoreACB } from './firebaseModel.js';

saveModelToFirestoreACB(model);
connectToPersistence(model);


const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/hospitalprofile',
    element: <HospitalProfile />,
  },
]);

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);

console.log(model);