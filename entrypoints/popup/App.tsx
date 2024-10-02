// Import the useReducer hook from React
import { useReducer } from "react";

// Define the App component
export default function App() {
  // Initialize the count state using useReducer
  // The reducer function increments the count by 1
  // The initial count value is 0
  const [count, increase] = useReducer((c) => c + 1, 0);

  // Render the component
  return (
    // Button to increment the count
    <button
      // Call the increase function on button click
      onClick={() => increase()}
      type="button"
      // Tailwind CSS classes for styling
      className="flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none shadow-lg hover:shadow-md active:scale-105 bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900"
    >
      {/* Display the current count */}
      Count:
      {/* Span element to display the count */}
      <span
        // Tailwind CSS classes for styling
        className="inline-flex items-center justify-center w-8 h-4 ml-2 text-xs font-semibold rounded-full"
      >
        {/* Display the count value */}
        {count}
      </span>
    </button>
  );
}
