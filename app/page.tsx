import Link from "next/link";
export default function Home() {
  return (
    <>
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        Authentication App
      </h1>

      <p className="text-gray-600 mb-8">
        Login or create a new account
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Signup
        </Link>
      </div>
    </div>
    </>
  );
}