import React from "react";
import {
  XCircleIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { cva, VariantProps } from "class-variance-authority";

const containerStyles = cva(
  "m-2 w-80 space-y-2 h-20 p-2 cursor-pointer shadow-2xl flex-col justify-start items-start border-0 rounded-lg border-l-4",
  {
    variants: {
      variant: {
        info: "bg-white border-blue-800",
        success: "bg-green-600 border-green-900",
        warning: "bg-yellow-600 border-yellow-900",
        error: "bg-red-600 border-red-900",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const toastHeaderStyles = cva(null, {
  variants: {
    variant: {
      info: "text-blue-800",
      success: "text-white",
      warning: "text-white",
      error: "text-white",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const toastMessageStyles = cva(null, {
  variants: {
    variant: {
      info: "text-blue-800",
      success: "text-white",
      warning: "text-white",
      error: "text-white",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

interface ToastProps extends VariantProps<typeof containerStyles> {
  id: string;
  message: string;
  removeToast: (id: string) => void;
}

interface ToastHeaderProps extends VariantProps<typeof toastHeaderStyles> {}

interface ToastMessageProps extends VariantProps<typeof toastMessageStyles> {
  message: string;
}

const ToastHeader = ({ variant }: ToastHeaderProps) => {
  const HeaderIcon =
    variant === "info"
      ? InformationCircleIcon
      : variant === "success"
      ? CheckCircleIcon
      : variant === "warning"
      ? ExclamationCircleIcon
      : XCircleIcon;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <HeaderIcon className={toastHeaderStyles({ variant }) + " h-6 w-6"} />
        <span className={toastHeaderStyles({ variant }) + " font-bold"}>
          {variant?.toUpperCase()}
        </span>
      </div>
      <XMarkIcon className={toastHeaderStyles({ variant }) + " w-5 h-5"} />
    </div>
  );
};

const ToastMessage = ({ message, variant }: ToastMessageProps) => {
  return (
    <p className={toastMessageStyles({ variant }) + " px-1 text-sm"}>
      {message.length < 45 ? message : `${message.substring(0, 45)}...`}
    </p>
  );
};

const Toast = ({ id, message, variant, removeToast }: ToastProps) => {
  return (
    <div
      onClick={() => removeToast(id)}
      className={containerStyles({ variant })}
    >
      <ToastHeader variant={variant} />
      <ToastMessage message={message} variant={variant} />
    </div>
  );
};

export default Toast;
