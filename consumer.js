const amqp = require('amqplib')

const messege = {
    description: "bu bir test mesajı"
  
};
const queuename = process.argv[2] || 'TestQueue';
connect_rabbitmq();
    async function connect_rabbitmq() {
        try {  const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queuename);
        // Mesajın alındığı kısım
          console.log("mesaj beklemede...") ;
        channel.consume(queuename, (msg)=> {
            console.log("messege",msg.content.toString());   
            channel.ack(msg);
        });
         } catch(error) {
            console.error("error", error);
         }
        }



