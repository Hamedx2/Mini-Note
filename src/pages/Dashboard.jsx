import { useDispatch } from "react-redux";
import DashboardBody from "../components/dashboard/DashboardBody";
import styles from "./Dashboard.module.css";
import { getNotes } from "../context/noteSlice";

function Dashboard() {
  const dispatch = useDispatch();
  dispatch(getNotes());
  return (
    <div className={styles.dashboardBody}>
      <DashboardBody />
    </div>
  );
}

export default Dashboard;
