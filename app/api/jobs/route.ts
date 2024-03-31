import client from "@/lib/appwrite_client";

import { Databases, ID, Query } from "appwrite";

import { NextResponse } from "next/server";

const database = new Databases(client);

export async function createJobs(data: { title: string; description: string }) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      "jobs",
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.log("Error creating new jobs post", error);
    throw new Error("Failed to create new job posts");
  }
}

//fetch
export async function fetchJobs() {
  let filters = [Query.orderAsc("$createdAt"), Query.limit(25)];
  try {
    // return Response.json({ message: "hehe sdfsdfsdfs" });
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_COLLECTION_ID as string
    );
    return response.documents;
  } catch (error) {
    console.log("Error fetching jobs post", error);
    throw new Error("Failed to fetch job posts");
  }
}

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();
    const data = { title, description };
    const response = await createJobs(data);
    return NextResponse.json({ message: "Jobs created successfully!" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create job",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const jobs = await fetchJobs();
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch jobs ",
      },
      { status: 500 }
    );
  }
}
