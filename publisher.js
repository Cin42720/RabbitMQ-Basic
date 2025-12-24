const amqp = require('amqplib')
const messege = {
    description: "bu bir test mesajı"
};
const queuename = process.argv[2] || 'TestQueue';
connect_rabbitmq();
    async function connect_rabbitmq() {
        try {  
            const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queuename);
        setInterval(() => {
        channel.sendToQueue(queuename, Buffer.from(JSON.stringify(messege)));
        console.log("Mesaj başarılı",messege);
        },1);
         } catch(error) {
            console.error("error", error);
         }
        }



