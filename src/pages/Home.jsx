import HomeLayout from "../components/HomeLayout";

function Home() {
  return (
    <HomeLayout>
      {/* Hero Section */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Slaughterhouse Balayan
              </h1>
              <p className="mt-4 text-lg text-red-100">
                Discover the best services and products tailored for your needs.
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  className="px-6 py-3 bg-white text-red-700 font-semibold rounded-lg shadow hover:bg-red-50 mr-4"
                >
                  Get Started
                </a>
                <a
                  href="#"
                  className="px-6 py-3 border border-red-200 text-white font-semibold rounded-lg hover:bg-red-600"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-red-100 h-64 md:h-80 rounded-lg shadow-lg flex items-center justify-center">
                <p className="text-red-800 font-medium">Hero Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Facilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-t-4 border-red-600">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Fast Performance
              </h3>
              <p className="text-gray-600">
                Our platform is optimized for speed to provide you with the best
                experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-t-4 border-red-600">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Secure System
              </h3>
              <p className="text-gray-600">
                Your data is protected with the latest security measures and
                encryption.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-t-4 border-red-600">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our team is always available to help you with any questions or
                issues.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            business with our platform.
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-white text-red-700 font-semibold rounded-lg shadow hover:bg-red-50"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;