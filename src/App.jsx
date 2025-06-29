import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import LoginLayout from "./pages/LoginLayout";
import DashboardLayout from "./pages/DashboardLayout";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    {
      element: <LoginLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="sign-in" />,
        },
        { path: "sign-in", element: <SignIn />, index: true },
      ],
    },
    {
      element: <DashboardLayout />,
      children: [{ path: "/dashboard", element: <Dashboard /> }],
    },
  ]);
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "1.8rem",
            fontWeight: "500",
            padding: "1.4rem 4rem",
            color: "#111827",
            textAlign: "center",
          },
        }}
      />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
