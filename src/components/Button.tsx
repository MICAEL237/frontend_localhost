type Type = "submit" | "button";

type button = {
  label?: string;
  type: Type;
  className?: string;
  isLoading?: boolean;
};

const Button = ({ label, type, isLoading}: button) => {
  return (
    <button type={type} className={`w-full h-12  btn btn-soft btn-success`}>
      {isLoading ? "chargement..." : label}
    </button>
  );
};

export default Button;

// #f1f5f
