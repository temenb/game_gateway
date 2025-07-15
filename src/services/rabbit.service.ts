import amqp from 'amqplib';
import { config } from '../config/config';

let channel: amqp.Channel;

export const connectRabbit = async () => {
    const conn = await amqp.connect(config.rabbitUrl);
    channel = await conn.createChannel();
    console.log('✅ Connected to RabbitMQ');
};

export const getChannel = () => channel;
