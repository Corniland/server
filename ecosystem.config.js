module.exports = {
  apps: [
    {
      name: "Corniland-Server",
      script: "./dist/server.js",
      env: {
        NODE_ENV: "production",
      },
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
