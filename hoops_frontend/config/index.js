const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";
export const apiServer = dev
  ? "http://localhost:1337"
: "https://your_deployment.server.com";
