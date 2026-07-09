function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
    >
      {children}
    </button>
  );
}

export default Button;
