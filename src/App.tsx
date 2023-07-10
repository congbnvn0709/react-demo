import { Suspense } from "react";
import "./App.css";
import Login from "./auth/Login/Login";
import Dashboard from "./admin/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TableDemo from "./admin/home/TableDemo";
import Todo from "./admin/Todo";
import About from "./admin/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "./components/Spinner/GlobalContext";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Dashboard />
              </Suspense>
            }
          >
            <Route index element={<TableDemo />} />
            <Route path="todo" element={<Todo />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </GlobalProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
