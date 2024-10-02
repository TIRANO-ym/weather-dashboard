import './App.css';
import Layout from './components/layout';
import Dashboard from './routes/dashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Dashboard/>
      }
    ]
  }
]);

function App() {
  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
