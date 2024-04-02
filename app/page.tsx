"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the interface for the object containing title and description.
interface IJobs {
  $id: string;
  title: string;
  description: string;
}

export default function Home() {
  // State to store fetched data
  const [jobs, setJobs] = useState<IJobs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("api/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.log("API Error to fetch data", error);
        setError("Failed to load jobs. Please try reloading the page.");
      } finally {
        setIsLoading(false);
      }
    };
    getJobs();
  }, []);

  return (
    <div className="flex flex-col">
      <div>{error && <p className="py-4 text-red-500">{error}</p>}</div>
      {isLoading ? (
        <p>Loading Jobs...</p>
      ) : (
        <div>
          {jobs.map((job, index) => (
            <div
              key={index}
              className="lists mb-12 border border-indigo-700 border-b-2 py-6 px-6 rounded border-b-indigo-700"
            >
              <h2 className="text-xl md:text-2xl font-semibold leading-7 text-gray-800 sm:truncate mb-4 ">
                {job.title}
              </h2>
              <p>{job.description}</p>
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
          ))}
        </div>
      )}
    </div>
  );
}
