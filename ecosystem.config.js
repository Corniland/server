module.exports = {
  apps: [
    {
      name: "Corniland-Server",
      script: "./dist/server.js",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
