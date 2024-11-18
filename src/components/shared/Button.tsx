type ButtonProps = {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  label?: string;
  children?: React.ReactNode;
  isIcon?: boolean;
};

export const Button = ({
  onClick,
  className,
  disabled,
  label,
  children,
  isIcon = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isIcon
          ? "bg-transparent hover:bg-gray-100"
          : "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
    >
      {label ? label : children}
    </button>
  );
};
