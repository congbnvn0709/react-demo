import React, { Suspense } from 'react';
import './App.css';
import Login from './auth/Login/Login';
import Dashboard from './admin/Dashboard';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import TableDemo from './admin/home/TableDemo';
import Todo from './admin/Todo';
import About from './admin/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner/Spinner';
import { GlobalProvider } from './components/Spinner/Spinner-context';
function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/'
            element={
              <React.Suspense fallback={<>Loading...</>
              }>
                <Dashboard />
              </React.Suspense>
            }
          >
            <Route index element={<TableDemo />}></Route>
            <Route path='todo' element={<Todo />}></Route>
            <Route path='about' element={<About />}></Route>
          </Route>
        </Routes>
      </GlobalProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
