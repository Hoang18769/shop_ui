import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        newestOnTop
        draggable
      />
      <div className="text-black bg-white dark:text-white dark:bg-gray-900 overflow-x-hidden">
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout || Fragment;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
