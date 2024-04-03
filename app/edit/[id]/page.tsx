"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const EditPage = ({ params }: { params: { id: string } }) => {
  console.log("Edit page");
  // console.log(`paramid: ${params.id}`);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        console.log(`paramid: ${params.id}`);
        const response = await fetch(`/api/jobs/${params.id}`);
        console.log(`paramid: ${params.id}`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();

        setFormData({
          title: data.job.title,
          description: data.job.description,
        });
      } catch (err) {
        console.log("Failed to load the specific job");
      }
    })();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    // const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });

    console.log("on change");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form data");
    if (!formData.title || !formData.description) {
      setError("Please fill in all the fields");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/jobs/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="heading text-3xl text-indigo-800 font-bold mb-8">
        Edit post
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-5">
          <div className="mb-7">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Write your thoughts here..."
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? "Udating..." : "Update"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
};

export default EditPage;
