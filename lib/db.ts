import mongoose from 'mongoose';

let connection: typeof mongoose;

const url = process.env.MONGODB_URI!;

const startDb = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(url);
    }
    return connection;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export default startDb;
