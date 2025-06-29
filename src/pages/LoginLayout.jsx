import { Outlet } from "react-router";

function LoginLayout() {
  return (
    <div className="pages">
      <Outlet />
    </div>
  );
}

export default LoginLayout;
