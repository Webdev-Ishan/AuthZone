import React from "react";

const Product = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-fuchsia-400 to-indigo-500 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Our Products & Services
          </h1>
          <p className="text-lg text-gray-200">
            Explore the cutting-edge authentication solutions we provide to
            secure your applications and enhance user experience.
          </p>
        </header>

        {/* Products Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product 1 */}
          <div className="bg-slate-800 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">User Authentication</h2>
            <p className="text-gray-300 mb-4">
              Secure and reliable user authentication with features like email
              verification, password reset, and multi-factor authentication.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>

          {/* Product 2 */}
          <div className="bg-slate-800 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">OAuth Integration</h2>
            <p className="text-gray-300 mb-4">
              Seamlessly integrate with third-party platforms like Google,
              Facebook, and GitHub for single sign-on (SSO) capabilities.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>

          {/* Product 3 */}
          <div className="bg-slate-800 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Role-Based Access</h2>
            <p className="text-gray-300 mb-4">
              Manage user roles and permissions to control access to different
              parts of your application.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>

          {/* Product 4 */}
          <div className="bg-slate-800 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Biometric Login</h2>
            <p className="text-gray-300 mb-4">
              Enable biometric authentication like fingerprint and facial
              recognition for enhanced security.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>

          {/* Product 5 */}
          <div className="bg-slate-800 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">API Security</h2>
            <p className="text-gray-300 mb-4">
              Protect your APIs with token-based authentication and rate
              limiting to prevent unauthorized access.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>

          {/* Product 6 */}
          <div className="bg-slate-800 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
            <p className="text-gray-300 mb-4">
              Monitor user activity and authentication metrics with a
              comprehensive analytics dashboard.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="text-center mt-16">
          <p className="text-gray-200">
            © {new Date().getFullYear()} AuthZone. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Product;
