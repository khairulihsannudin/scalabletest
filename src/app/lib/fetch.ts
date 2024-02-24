export const getMessages = async () => {
    const res = await fetch("http://localhost:3000/messages", {
        method: "GET",
    });
    const data = await res.json();
    return data;
    };

export const postMessage = async (name: string, messages: string) => {
    const res = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, messages }),
    });
    const data = await res.json();
    return data;
    };