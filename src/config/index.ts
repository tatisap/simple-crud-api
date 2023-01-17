const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('Port is not defined');
}

export { PORT };
