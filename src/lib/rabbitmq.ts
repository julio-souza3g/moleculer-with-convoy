import amqp from 'amqplib';

const amqpURL = process.env.AMQP_URL || 'amqp://localhost';

class RabbitMQInstance {
  private connection: amqp.Connection | null;

  private channel: amqp.Channel | null;

  private static instance: RabbitMQInstance;

  constructor() {
    this.connection = null;
    this.channel = null;
  }

  public static getInstance(): RabbitMQInstance {
    if (!RabbitMQInstance.instance) {
      RabbitMQInstance.instance = new RabbitMQInstance();
    }
    return RabbitMQInstance.instance;
  }

  async connect() {
    if (!this.connection) {
      this.connection = await amqp.connect(amqpURL);
      console.log('RabbitMQ connected'); // eslint-disable-line no-console
    }

    if (!this.channel) {
      this.channel = await this.connection.createConfirmChannel();
      console.log('RabbitMQ channel created'); // eslint-disable-line no-console
    }

    return { connection: this.connection, channel: this.channel };
  }
}

const rabbitMQInstance = RabbitMQInstance.getInstance();
export default rabbitMQInstance;
