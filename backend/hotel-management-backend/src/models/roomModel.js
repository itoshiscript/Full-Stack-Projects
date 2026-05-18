import { conn } from "../database/config.js";

export const getAllRoomsModel = async () => {
    const query = "SELECT * FROM rooms";

    const [rows] = await conn.execute(query);

    return rows;
};

export const getRoomByIdModel = async (roomId) => {
    const query = "SELECT * FROM rooms WHERE id = ?";

    const [rows] = await conn.execute(query, [roomId]);

    return rows[0];
};

export const createRoomModel = async (
    roomNumber,
    roomType,
    price,
    capacity,
    description,
    image,
) => {
    const query =
        "INSERT INTO rooms (room_number, room_type, price, capacity, description, image) VALUES (?, ?, ?, ?, ?, ?)";

    const [result] = await conn.execute(query, [
        roomNumber,
        roomType,
        price,
        capacity,
        description,
        image,
    ]);

    return result;
};

export const updateRoomModel = async (
    roomId,
    roomNumber,
    roomType,
    price,
    capacity,
    description,
    image,
) => {
    const query =
        "UPDATE rooms SET room_number = ?, room_type = ?, price = ?, capacity = ?, description = ?, image = ? WHERE id = ?";

    const [result] = await conn.execute(query, [
        roomNumber,
        roomType,
        price,
        capacity,
        description,
        image,
        roomId,
    ]);

    return result;
};

export const deleteRoomModel = async (roomId) => {
    const query = "DELETE FROM rooms WHERE id = ?";

    const [result] = await conn.execute(query, [roomId]);

    return result;
};
