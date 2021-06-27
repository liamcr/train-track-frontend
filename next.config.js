module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    domains: [
      "train-track-images.s3.amazonaws.com",
      "train-track-images.s3.us-east-2.amazonaws.com",
      "train-track-4wf42j4sua-ue.a.run.app",
    ],
  },
};
