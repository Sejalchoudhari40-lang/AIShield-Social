type ButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

function Button({
  text,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
      w-full
      rounded-xl
      bg-cyan-500
      py-3
      text-lg
      font-semibold
      text-white
      transition-all
      duration-300
      hover:scale-105
      hover:bg-cyan-400
      hover:shadow-xl
      hover:shadow-cyan-500/50
      disabled:bg-gray-500
      disabled:hover:scale-100
      disabled:hover:shadow-none
      disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );
}

export default Button;