import mqtt from 'mqtt';

// Configuration
const url = 'mqtts://f0ae3f10c7934f22af58baf1325a7a00.s2.eu.hivemq.cloud:8883';
const username = 'IoT-GUEST';
const password = 'Gj@ci85TjdJvzMZ';
const clientId = 'gateway-controller-001-reporter';
const topic = '/karelia/wartsila/026a/status';


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

client.on('connect',() => {
    console.log('subscribing topic' + topic)
    client.subscribe(topic)
    console.log('done .')
})

client.on('message', (topic , message) =>{
    const frames = message.toString()
    var obj= JSON.parse(frames)
    console.log('temperature' + obj.temperature)
})

