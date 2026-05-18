import {
    getAllRoomsModel,
    getRoomByIdModel,
    createRoomModel,
} from "../models/roomModel.js";

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await getAllRoomsModel();

        return res.status(200).json({
            data: {
                status: "success",
                rooms,
            },
        });
    } catch (err) {
        return res.status(500).json({
            data: {
                status: "error",
                message: "An error occurred while fetching rooms.",
            },
        });
    }
};

export const getRoomById = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await getRoomByIdModel(id);

        if (!room) {
            return res.status(404).json({
                data: {
                    status: "error",
                    message: "Room not found.",
                },
            });
        }

        return res.status(200).json({
            data: {
                status: "success",
                room,
            },
        });
    } catch (err) {
        return res.status(500).json({
            data: {
                status: "error",
                message: "An error occurred while fetching the room.",
            },
        });
    }
};

export const createRoom = async (req, res) => {
    const { roomNumber, roomType, price, capacity, description, image } =
        req.body;

    try {
        console.log(req.body);
        const result = await createRoomModel(
            roomNumber,
            roomType,
            price,
            capacity,
            description,
            image,
        );

        return res.status(201).json({
            data: {
                status: "success",
                message: "Room created successfully.",
                roomId: result.insertId,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            data: {
                status: "error",
                message: "An error occurred while creating the room.",
            },
        });
    }
};
