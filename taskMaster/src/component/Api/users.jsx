import axios from 'axios'

export const getUsers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/user-management/user/all', {
            withCredentials: true,
            timeout: 20000
        });
        const sortedResponse = response.data.sort((a, b) => a.id - b.id);
        return sortedResponse;
    } catch (error) {
        console.log(error)
    }
}