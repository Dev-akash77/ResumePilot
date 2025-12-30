import logger from "./logger.config";
import amqp, {
  Channel,
  ChannelModel,
  Connection,
  ConsumeMessage,
} from "amqplib";

export let connection: Connection | null = null;
export let channel: Channel | null = null;

// ! Connect rabitmq
export const connectRabbitMQ = async (exchangeName: string): Promise<void> => {
  try {
    if (!process.env.RABBITMQ_URI) {
      throw new Error("RABITMQ_URI is not defined in environment variables");
    }

    const chanelModel: ChannelModel = await amqp.connect(
      process.env.RABBITMQ_URI as string
    );
    connection = chanelModel.connection;
    channel = await chanelModel.createChannel();
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    logger.info(`RabbitMQ connected with exchange name:"${exchangeName}"`);
  } catch (error) {
    logger.error(
      `Error connecting to RabbitMQ or asserting exchange "${exchangeName}":`,
      error
    );
  }
};

// ! PUBLISH EVENT
export const publishEvent = async (
  exchange: string,
  routingKey: string,
  message: any
): Promise<void> => {
  try {
    if (!channel) {
      await connectRabbitMQ(exchange);
    }
    channel?.publish(
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

// ! CONSUME EVENT
export const consumeEvent = async (
  exchange: string,
  routingKey: string,
  callback: any
): Promise<void> => {
  try {
    if (!channel) await connectRabbitMQ(exchange);

    const { queue }: any = await channel?.assertQueue("", { exclusive: true });
    await channel?.bindQueue(queue, exchange, routingKey);

    channel?.consume(queue, (msg: ConsumeMessage | null) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        channel?.ack(msg);
      }
    });
    logger.info(
      `Message consume with exchange name "${exchange}" and routing key "${routingKey}"`
    );
  } catch (error) {
    logger.error("RabbitMQ consumeEvent failed:", error);
  }
};
