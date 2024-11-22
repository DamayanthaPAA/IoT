import axios from "axios";

const token = 'Bearer OWU3OTIxMWUtY2U4MC00ZWQ0LTkwMmMtNTJhZjdlMDgzNDY3YzZmNzNmMTItYTA1_PE93_9baca39d-2e56-415d-b1c4-e77c2237760a';

const roomsUrl = 'https://webexapis.com/v1/rooms';
const messagesUrl = "https://webexapis.com/v1/messages";

const myRoomTitle = "Anura";

const config = {
    headers: {
        'Authorization': token
    }
};

const postMessage = async (message) => {
    try {
        const rooms = await axios.get(roomsUrl, config);
        const ourRoom = rooms.data.items.find(item => item.title === myRoomTitle);

        if (!ourRoom) {
            console.error("Room not found");
            return;
        }

        const messageData = {
            roomId: ourRoom.id,
            text: message
        };

        const response = await axios.post(messagesUrl, messageData, config);
        console.log("Message sent successfully:", response.data);

    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
};

postMessage("Test");