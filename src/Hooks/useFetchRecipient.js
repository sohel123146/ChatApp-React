import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../Utils/Services";

export const useFetchRecipientUser = ({ chat, user }) => {
    const [recipientUser, setRecipientUser] = useState(null); // corrected typo
    const [error, setError] = useState(null);

    const recipientId = chat?.members.find(id => id !== user?._id);

    useEffect(() => {
        const getUser = async () => {

            if (!recipientId) return null; // if recipient id is not available, return null

            const response = await getRequest(`${baseUrl}/users/fetchuser/${recipientId}`); // fetching other user using getRequest and with help of id

            if (response.error) {
                return setError(response); // if the response contains error set error to response
            }

            setRecipientUser(response); // if the api call goes through setRecipientUser to response
        };

        getUser();
    }, [recipientId]);

    return { recipientUser, error }; // return recipientUser and error
};
