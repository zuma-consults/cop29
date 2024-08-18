function ForgotPassword() {
    return (
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center bg-green-800 text-white p-8">
          <div className="space-y-8 w-full max-w-md">
            <h3 className="text-4xl font-bold text-center">
              Forgot Password?
            </h3>
            <div className="w-full">
              <label htmlFor="username" className="block text-lg mb-2">
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                className="w-full p-3 rounded-md border border-green-600 bg-green-900 placeholder-gray-300 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your username or email"
                required
              />
            </div>
            <div className="w-full">
              <button className="w-full py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-200">
                Reset Password
              </button>
            </div>
          </div>
        </div>
  
        {/* Right Section */}
        <div className="flex-1">
          <img
            src="/images/globe.jpg"
            alt="Globe Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
  
  export default ForgotPassword;
  