type Type = "submit" | "button";

type button = {
  label?: string;
  type: Type;
  className?: string;
  isLoading?: boolean;
};

const Button = ({ label, type, isLoading }: button) => {
  return (
    <button type={type} className={`w-full h-12 rounded-2xl outline-0 text-2xl bg-[#166534] font-semibold text-white px-20 cursor-pointer`}>
      {isLoading ? "chargement..." : label}
    </button>
  );
};

export default Button;

// #f1f5f
