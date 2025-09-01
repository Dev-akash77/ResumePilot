import logger from "./logger.config.js";
import amqp from "amqplib";

export let connection, channel;

// ! connect rabitmq
export const connectRabbitMQ = async (exchangeName) => {
  try {
    connection = await amqp.connect(process.env.RABITMQ_URI);
    channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    logger.info(`RabbitMQ connected with exchange name:"${exchangeName}"`);
  } catch (error) {
    logger.error(
      `Error connecting to RabbitMQ or asserting exchange "${exchangeName}":`,
      error
    );
  }
};

// ! publish event
export const publishEvent = async (exchange, routingKey, message) => {
  try {
    if (!channel) {
      await connectRabbitMQ(exchange);
    }

    await channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );

    logger.info(
      `Message published with exchange name "${exchange}" and routing key "${routingKey}"`
    );
  } catch (error) {
    logger.error("RabbitMQ publishEvent failed:", error);
  }
};

// ! Comnsume Events

export const consumeEvent = async (exchange, routingKey, callback) => {
  try {
    if (!channel) {
      await connectRabbitMQ();
    }

    const q = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(q.queue, exchange, routingKey);

    channel.consume(q.queue, (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        channel.ack(msg);
      }
    });
    logger.info(
      `Message consume with exchange name "${exchange}" and routing key "${routingKey}"`
    );
  } catch (error) {
    logger.error("RabbitMQ consumeEvent failed:", error);
  }
};
