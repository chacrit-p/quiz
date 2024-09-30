import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-fit mx-auto gap-5 items-center">
      <h1 className="text-3xl font-semibold">Hello Welcome</h1>

      <Link
        href="/login"
        className="bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg text-sm font-medium text-white"
      >
        get started
      </Link>
      <Link
        className="underline text-blue-600 self-center mt-1"
        href="/register"
      >
        dont have a account click here to sign up
      </Link>
    </div>
  );
}
