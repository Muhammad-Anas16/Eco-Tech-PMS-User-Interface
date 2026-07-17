import { toast } from "sonner";

export const showToast = {
  success: (message) => {
    toast.success(message, {
      duration: 3000,
    });
  },

  error: (message) => {
    toast.error(message, {
      duration: 3000,
    });
  },

  warning: (message) => {
    toast.warning(message, {
      duration: 3000,
    });
  },

  info: (message) => {
    toast.info(message, {
      duration: 3000,
    });
  },

  loading: (message) => {
    return toast.loading(message);
  },

  dismiss: (id) => {
    toast.dismiss(id);
  },
};
