import React, { ReactNode, useContext, useEffect, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";

import Toast from "./Toast";

const jToastProviderStyles = cva("fixed flex z-50", {
  variants: {
    position: {
      "top-left": "flex-col-reverse top-0 left-0",
      "top-right": "flex-col-reverse top-0 right-0",
      "bottom-right": "flex-col bottom-0 right-0",
      "bottom-left": "flex-col bottom-0 left-0",
    },
  },
  defaultVariants: {
    position: "top-left",
  },
});

type VariantType = "info" | "success" | "warning" | "error";

type ToastType = {
  id: string;
  message: string;
  variant: VariantType;
};

type ToastContextType = {
  addToast: (message: string, variant?: VariantType) => void;
};

interface JToastProviderProps
  extends VariantProps<typeof jToastProviderStyles> {
  children: ReactNode;
}

const ToastContext = React.createContext({} as ToastContextType);

const JToastProvider = ({
  children,
  position = "top-left",
}: JToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length) handleRemoveToast(toasts[0].id);
    }, 2000);

    return () => clearInterval(interval);
  }, [toasts]);

  const handleAddToast = (message: string, variant: VariantType = "info") => {
    setToasts([...toasts, { id: new Date().toISOString(), message, variant }]);
  };

  const handleRemoveToast = (id: string) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };
  return (
    <ToastContext.Provider
      value={{
        addToast: handleAddToast,
      }}
    >
      {children}
      <div className={jToastProviderStyles({ position })}>
        {toasts.length > 0 &&
          toasts.map(({ id, message, variant }) => (
            <Toast
              key={id}
              id={id}
              message={message}
              variant={variant}
              removeToast={handleRemoveToast}
            />
          ))}
      </div>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const { addToast } = useContext(ToastContext);

  return addToast;
};

export { useToast, JToastProvider };
