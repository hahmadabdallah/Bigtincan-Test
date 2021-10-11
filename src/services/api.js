import axios from 'axios';

/* Api url  */
const filesUrl = 'http://localhost:3001/files';

/* Get files  */
export const getFiles = async (id) => {
    id = id || '';
    return await axios.get(`${filesUrl}/${id}`);
}

/* Add file  */
export const addFile = async (file) => {
    return await axios.post(`${filesUrl}`, file);
}

/* Delete file  */
export const deleteFile = async (id) => {
    return await axios.delete(`${filesUrl}/${id}`);
}

/* Edit file  */
export const editFile = async (id, file) => {
    return await axios.put(`${filesUrl}/${id}`, file)
}

