export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              BigCommerce Migration Tool
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
              Streamline your e-commerce migration with our powerful, intuitive platform designed to make your transition to BigCommerce seamless and efficient.
            </p>
          </div>

          {/* Main Content Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Getting Started Card */}
            <div className="group bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-300/20 hover:border-purple-300/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Getting Started</h2>
              </div>
              <p className="text-purple-200 mb-6 leading-relaxed">
                Configure your migration settings and start the migration process with our step-by-step wizard.
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                Start Migration
              </button>
            </div>

            {/* Features Card */}
            <div className="group bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-300/20 hover:border-purple-300/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Key Features</h2>
              </div>
              <ul className="text-purple-200 space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Automated data migration
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time progress tracking
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Data validation & error handling
                </li>
              </ul>
              <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25">
                Learn More
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 border border-purple-300/10 text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-purple-200">Successful Migrations</div>
            </div>
            <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 border border-purple-300/10 text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-purple-200">Success Rate</div>
            </div>
            <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 border border-purple-300/10 text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-200">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 