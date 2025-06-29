import toast from "react-hot-toast";
import CustomToastComponent from "./CustomToastComponent";
import { IoIosWarning } from "react-icons/io";

export function customToast(text, btnText, btnClickFunction) {
  toast(
    (t) => (
      <CustomToastComponent
        t={t}
        btnText={btnText}
        btnClickFunction={btnClickFunction}
      >
        {text}
      </CustomToastComponent>
    ),
    {
      icon: <IoIosWarning size={80} color="#ffc800" />,
      duration: 10000,
    }
  );
}
