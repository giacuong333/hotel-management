import { Bounce, toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type) => {
      toast[type](message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
      });
};

export default <ToastContainer />;
