// src/components/ui/button.jsx
export function Button({ className = '', children, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full ${className}`}
      type="button"
    >
      {children}
    </button>
  );
}
