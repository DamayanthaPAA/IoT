import mqtt from 'mqtt';

// Configuration
const url = 'mqtts://f0ae3f10c7934f22af58baf1325a7a00.s2.eu.hivemq.cloud:8883';
const username = 'IoT-GUEST';
const password = 'Gj@ci85TjdJvzMZ';
const clientId = 'gateway-controller-001-receiver'; // Changed clientId to indicate this is a receiver
const topic = '/karelia/wartsila/026a/status';
const roomo26ALightsTopic ='/karelia/wartsila/026a/lights';

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

// Handle connection
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    console.log('Subscribing to topic: ' + topic);
    
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log('Successfully subscribed to ' + topic);
        }
    });
});

// Handle incoming messages
client.on('message', (topic, message) => {
    try {
        const frames = message.toString();
        const obj = JSON.parse(frames);
        console.log('---------------------');
        console.log('Topic:', topic);
        console.log('Temperature:', obj.temperature.toFixed(2) + '°C');
        console.log('Illumination:', obj.illumination.toFixed(2));
        console.log('---------------------');

        console.log('occupied:', obj.occupied);
        console.log('---------------------');

        console.log('humidity:', obj.humidity);
        console.log('---------------------');

        if (obj.occupied && obj.illumination < 50) {
            const frame = JSON.stringify({"value":true}) //light on
            client.publish(roomo26ALightsTopic , frame)
            console.log("Lights swithed on.")
        }

    } catch (error) {
        console.error('Error parsing message:', error);
        console.error('Raw message:', message.toString());
    }
});

// Handle errors
client.on('error', (error) => {
    console.error('Connection error:', error);
});

// Handle disconnection
client.on('close', () => {
    console.log('Disconnected from MQTT broker');
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('Disconnecting from MQTT broker...');
    client.end();
    process.exit();
});