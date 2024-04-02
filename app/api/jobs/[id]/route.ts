import client from "@/lib/appwrite_client";

import { Databases, ID, Query } from "appwrite";

import { NextResponse } from "next/server";

const database = new Databases(client);

//fetch a specific job
async function fetchJobs(id: string) {
  try {
    const job = await database.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_COLLECTION_ID as string,
      id
    );
    return job;
  } catch (error) {
    console.log("Error fetching job:", error);
    throw new Error("Failed to fetch job");
  }
}

//delete a specific job
async function deleteJobs(id: string) {
  try {
    const job = await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_COLLECTION_ID as string,
      id
    );
    return job;
  } catch (error) {
    console.log("Error deleting job:", error);
    throw new Error("Failed to delete the job");
  }
}

//update a specific job
async function updateJobs(
  id: string,
  data: { title: string; description: string }
) {
  try {
    const job = await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_COLLECTION_ID as string,
      id,
      data
    );
    return job;
  } catch (error) {
    console.log("Error updating job:", error);
    throw new Error("Failed to update the job" + error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const job = await fetchJobs(id);
    return NextResponse.json({ job });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const job = await deleteJobs(id);
    return NextResponse.json({ message: "Jobs deleted successfully!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete jobs" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  //   return NextResponse.json(await req.json());
  try {
    const id = params.id;
    const job = await req.json();
    await updateJobs(id, job);
    return NextResponse.json({ message: "Jobs updated successfully!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update jobs" },
      { status: 500 }
    );
  }
}
