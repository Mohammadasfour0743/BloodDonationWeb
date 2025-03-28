import { createBrowserRouter, RouterProvider } from 'react-router';
import { saveModel } from './firebaseModel.js';
import LoginPage from './routes/LoginPage.js';
import ReactDOM from 'react-dom/client';
import './index.css';
import HospitalProfile from './routes/HospitalProfile.js';
import { model } from './testmodel.js';





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

// Connect to Firestore
/* connectToPersistence(model); */
//saveModelToFirestoreACB(model);

saveModel(model);