module.exports = {
  apps: [
    {
      name: "Corniland-Server",
      script: "./dist/server.js",
      env: {
        PORT: 3000,
      },
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
