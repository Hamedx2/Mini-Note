import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/dashboard/Navbar";
import Footer from "../components/dashboard/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";
import { setLogin } from "../context/authSlice";

function DashboardLayout() {
  const toastShown = useRef(false);
  const dispatch = useDispatch();
  const { isAuthenticated, id } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(
    function () {
      async function checkAuth() {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          navigate("/");
        } else if (user) {
          dispatch(setLogin(user.email, user.id));
        } else if (!toastShown.current) {
          toast.success("Welcome !");
          toastShown.current = true;
        }
      }

      checkAuth();
    },
    [navigate, isAuthenticated, id, dispatch]
  );

  if (!isAuthenticated || !id) return null;

  return (
    <div className="pages">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default DashboardLayout;
