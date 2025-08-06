'use client';

import { toast } from 'react-toastify';

const RenderToast = ({ message, type = 'info', duration = 5000 }) => {
  const toastOptions = {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
    case 'info':
    default:
      toast.info(message, toastOptions);
      break;
  }
};

export default RenderToast; 