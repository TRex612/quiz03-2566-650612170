import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Phuchit Moonkaew",
    studentId: "650612170",
  });
};
