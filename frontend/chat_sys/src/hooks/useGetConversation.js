import { useEffect, useState } from "react";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:3000/users", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                console.error("Error in getting conversations", error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversation();
    }, []);

    return { loading, conversations };
}

export default useGetConversation;
