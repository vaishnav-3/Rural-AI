import React from 'react';
import { useSignIn } from '@clerk/clerk-react';  // Import the hook

const CustomSignInButton = () => {
  const { signIn, isLoading, error } = useSignIn();  // Use Clerk's sign-in hook
//   const [email, setEmail] = useState("");  // Example email field for sign-in

  // Handle sign-in logic
  const handleSignIn = async () => {
    try {
      console.log('Attempting to sign in...');
      // Use Clerk's redirect method to show the sign-in modal
      await signIn.redirectToSignIn();
      console.log('Sign-in successful');
    } catch (err) {
      console.error("Error signing in:", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Sign-in button with custom styling */}
      <button
        onClick={handleSignIn}
        className="bg-blue-600 text-white font-bold text-lg px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>

      {/* Optional: Show error message if any */}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default CustomSignInButton;