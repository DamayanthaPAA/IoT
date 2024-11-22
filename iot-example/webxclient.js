//axios for http commad
import axios from "axios";

const  token ='Bearer OWU3OTIxMWUtY2U4MC00ZWQ0LTkwMmMtNTJhZjdlMDgzNDY3YzZmNzNmMTItYTA1_PE93_9baca39d-2e56-415d-b1c4-e77c2237760a'

const roomsUrl ='https://webexapis.com/v1/rooms'
const messagesUrl ="https://webexapis.com/v1/messages"

const myRoomTitle= "Anura";

let config = {
    headers:{
        'Authorization': token
    }
    
}

const postMessage = async (message) =>{
    try {
        let rooms = await axios (roomsUrl,config)
        let ourroom = rooms.data.items.filter(item => item.title === myRoomTitle)
        let roomId = ourroom[0].id

        console.log("Room Id " + roomId)

        message.roomId =roomId
        let result = await axios.post(messagesUrl,message,config)
        console.log('Result ' + JSON.stringify(result.data))

        // console.log("Result: " + JSON.stringify(rooms.data))

    
    } catch (error) {
        console.log(error)
    }
}

let testMessage = {"text": "Hi there",
    "markdown":"this is commig form a script"
}
postMessage(testMessage);