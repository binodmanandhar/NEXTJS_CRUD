import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="lists mb-12 border border-indigo-700 border-b-2 py-6 px-6 rounded border-b-indigo-700">
        <h2 className="text-xl md:text-2xl font-semibold leading-7 text-gray-800 sm:truncate mb-4 ">
          Artificial Intelligence
        </h2>
        <p>
          AI is a machine's ability to perform the cognitive functions we
          associate with human minds, such as perceiving, reasoning, learning,
          interacting with an environment, problem solving, and even exercising
          creativity.
        </p>
        <div className="mt-8 flex justify-end gap-4">
          <Link
            className="inline-block text-white bg-blue-600 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            href={"/edit"}
          >
            Edit
          </Link>
          <Link
            className="inline-block text-white bg-red-600 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            href={"/delete"}
          >
            Delete
          </Link>
        </div>
      </div>
      <div className="lists mb-12 border border-indigo-700 border-b-2 py-6 px-6 rounded border-b-indigo-700">
        <h2 className="text-xl md:text-2xl font-semibold leading-7 text-gray-800 sm:truncate mb-4 ">
          Artificial Intelligence-2
        </h2>
        <p>
          AI is a machine's ability to perform the cognitive functions we
          associate with human minds, such as perceiving, reasoning, learning,
          interacting with an environment, problem solving, and even exercising
          creativity.
        </p>
      </div>
    </div>
  );
}
