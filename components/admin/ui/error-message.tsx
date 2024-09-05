import { AlertCircle } from "lucide-react";

const ErrorMessage = () => (
  <div className="flex h-screen max-h-[400px] items-center justify-center bg-gray-50">
    <div className="text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
      <h2 className="mb-2 text-2xl font-bold text-gray-900">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600">
        There was a problem with the server. Please try again later.
      </p>
    </div>
  </div>
);

export default ErrorMessage;
