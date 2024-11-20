import mqtt from 'mqtt';

// Configuration
const url = 'mqtts://f0ae3f10c7934f22af58baf1325a7a00.s2.eu.hivemq.cloud:8883';
const username = 'IoT-GUEST';
const password = 'Gj@ci85TjdJvzMZ';
const clientId = 'gateway-controller-001-reporter';
const topic = '/karelia/wartsila/026a/status';
const timerDelay = 5000;

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

// Event handlers
client.on('connect', () => {
    console.log('Connection established');
    
    // Set up interval for publishing data
    setInterval(() => {
        const data = {
            temperature: Math.random() * 10 + 15,
            illumination: Math.random() * 100
        };

        const frame = JSON.stringify(data);

        client.publish(topic, frame, (err) => {
            if (err) {
                console.error('Error publishing:', err);
            } else {
                console.log('Published:', frame);
            }
        });
    }, timerDelay);
});

// Add error handling
client.on('error', (error) => {
    console.error('Connection error:', error);
});

// Handle process termination
process.on('SIGINT', () => {
    client.end();
    process.exit();
});