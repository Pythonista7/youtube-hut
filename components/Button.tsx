import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  variant?: string; // default, primary, info, success, warning, danger, dark
  size?: string; // sm, md, lg
  disabled?: boolean;
}

// TODO: Add button variants: https://sujaykundu.com/web-development/creating-a-reusable-button-component-in-react-typescript-and-tailwind/

const Button: React.FC<Props> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`btn ${variant} ${size}` + (disabled ? " disabled" : "")}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
