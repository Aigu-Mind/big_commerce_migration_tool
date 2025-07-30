import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            BigCommerce Migration Tool
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to your BigCommerce migration tool. This application will help you migrate your data to BigCommerce.
          </p>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Getting Started
            </h2>
            <p className="text-gray-600">
              Configure your migration settings and start the migration process.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
