import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  const rooms = DB.rooms;
  const totalRooms = rooms.length;
  return NextResponse.json({
    ok: true,
    rooms: rooms,
    totalRooms: totalRooms,
  });
};

export const POST = async (request) => {
  const token = request.headers.get("Authorization");
  const payload = checkToken(token);

  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  readDB();
  const { roomName } = await request.json();

  const isRoomExist = DB.rooms.some((room) => room.roomName === roomName);

  if (isRoomExist) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${roomName} already exists`,
      },
      { status: 400 }
    );
  }

  const roomId = nanoid();

  DB.rooms.push({
    roomId,
    roomName,
  });
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
