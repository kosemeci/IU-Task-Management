import axios from 'axios'


const BASE_URL = 'http://localhost:8080/project-management/project';

export const getAllProject = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            withCredentials: true,
            timeout: 25000
        });
        const sortedResponse = response.data.sort((a, b) => a.id - b.id);
        return sortedResponse;
    } catch (error) {
        console.log(error)
    }
}