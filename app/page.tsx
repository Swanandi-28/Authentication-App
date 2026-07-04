import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-400 flex items-center justify-center">
      <div className="bg-gray-300 shadow-lg rounded-xl p-10 w-full max-w-md text-center">

        <h1 className="text-4xl font-bold text-black mb-4">
          Authentication App
        </h1>

        <p className="text-gray-600 mb-8">
          Login to your account or create a new one.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </main>
  );
}