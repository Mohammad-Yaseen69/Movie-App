import axios from "axios";

const Base_Url = 'https://api.themoviedb.org/3/'
const Api_Key = import.meta.env.VITE_APP_API_KEY


export const fetchData = async (url, params) => {
    try {
        const response = await
            axios.get(`${Base_Url}${url}?api_key=${Api_Key}` , {
                params,
            })
        return response.data
    } catch (error) {
        console.log(error);
    }
}


