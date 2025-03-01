import axios from 'axios';

const BASE_URL = 'http://localhost:8080/project-management/project';
export const getProjectStatistics = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}/statistics`, {
            withCredentials: true,
            timeout: 30000
        });
        // console.log("response" + JSON.stringify(response.data.data));
        return response.data.data;

    } catch (error) {
        console.log(error);
    }
}
