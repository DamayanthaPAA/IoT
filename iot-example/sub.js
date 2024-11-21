import mqtt from 'mqtt';

// Configuration
const url = 'mqtts://f0ae3f10c7934f22af58baf1325a7a00.s2.eu.hivemq.cloud:8883';
const username = 'IoT-GUEST';
const password = 'Gj@ci85TjdJvzMZ';
const clientId = 'gateway-controller-001-reporter-anura';
const topic = '/karelia/wartsila/026a/lights';

let lightsOn = false

// MQTT client options
const options = {
    clientId: clientId,
    username: username,
    password: password,
    clean: true,
    protocol: 'mqtts',
    rejectUnauthorized: false  // Only use in development/testing
};

// Create MQTT client
const client = mqtt.connect(url, options);

client.on('connect', () => {
    console.log("Subscribing topic" + topic)
    client.subscribe(topic)
    console.log("done.")
})

client.on('message', (topic,message) =>{
    console.log("Recived a message from topic" + topic)
    var obj = JSON.parse(message.toString())
    lightsOn = obj.JSON
    console.log("LighLight switched to " + (lightsOn ? "on" : "off"))

})