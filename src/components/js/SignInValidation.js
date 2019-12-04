import axios from "axios";

export const validationForm = async values => {
    const API = process.env.REACT_APP_API_LIVE;

    let errors = {};

    try {
        const { data: result } = await axios.post(
            `${API}/validate/signin`,
            values
        );

        return { ...errors, ...result };
    } catch (err) {
        throw err;
    }
};