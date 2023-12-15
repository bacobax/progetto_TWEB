const axios = require('axios');
const {getNodeServerUrl} = require("./options");
const deleteRoomURL = (id)=> getNodeServerUrl(`/api/room/${id}`);
const createRoomURL = () => getNodeServerUrl(`/api/room`);

const findOneRoomURL = (id) => getNodeServerUrl(`/api/room/${id}`);

/**
 * Deletes a room by its ID.
 *
 * @async
 * @function deleteRoom
 * @param {string} id - The ID of the room to delete.
 * @returns {Promise} Axios promise representing the deletion request.
 * @throws {Error} If an error occurs during the deletion request.
 */
exports.deleteRoom = async id => {
    try{
        return axios.delete(deleteRoomURL(id));
    }catch (e) {
        throw new Error(`Error while deleting room ${id}: ${e}`);
    }
}

/**
 * Creates a new room.
 *
 * @async
 * @function createRoom
 * @param {Object} roomData - The data for the new room.
 * @param {string} roomData.name - The name of the new room.
 * @param {string} roomData.description - The description of the new room.
 * @param {Array} roomData.messages - The messages in the new room.
 * @param {string} roomData.adminUserID - The ID of the admin user for the new room.
 * @returns {Promise} Axios promise representing the creation request.
 * @throws {Error} If an error occurs during the creation request.
 */
exports.createRoom = async ({name, description, messages, adminUserID:admin}) => {
    try{
        return axios.post(createRoomURL(), {name, description, messages, admin});
    }
    catch (e) {
        throw new Error(`Error while creating room ${name}: ${e}`);
    }
}

/**
 * Finds a room by its ID.
 *
 * @async
 * @function findOneRoom
 * @param {string} id - The ID of the room to find.
 * @returns {Promise} Axios promise representing the find request.
 * @throws {Error} If an error occurs during the find request.
 */
exports.findOneRoom = async id => {
    try{
        return axios.get(findOneRoomURL(id));
    }catch (e) {
        throw new Error(`Error while finding room ${id}: ${e}`);
    }
}