const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      images: {
        domains: ["train-track-images.s3.us-east-2.amazonaws.com"],
      },
    };
  } else {
    return defaultConfig;
  }
};
