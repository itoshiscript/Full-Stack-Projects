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

export const updateRoomModel = async (roomId, data) => {
    const fields = [];
    const values = [];

    if (data.roomNumber !== undefined) {
        fields.push("room_number = ?");
        values.push(data.roomNumber);
    }

    if (data.roomType !== undefined) {
        fields.push("room_type = ?");
        values.push(data.roomType);
    }

    if (data.price !== undefined) {
        fields.push("price = ?");
        values.push(data.price);
    }

    if (data.capacity !== undefined) {
        fields.push("capacity = ?");
        values.push(data.capacity);
    }

    if (data.description !== undefined) {
        fields.push("description = ?");
        values.push(data.description);
    }

    if (data.image !== undefined) {
        fields.push("image = ?");
        values.push(data.image);
    }

    if (fields.length === 0) {
        throw new Error("No fields to update");
    }

    values.push(roomId);

    const query = `
        UPDATE rooms
        SET ${fields.join(", ")}
        WHERE id = ?
    `;

    const [result] = await conn.execute(query, values);

    return result;
};

export const deleteRoomModel = async (roomId) => {
    const query = "DELETE FROM rooms WHERE id = ?";

    const [result] = await conn.execute(query, [roomId]);

    return result;
};
