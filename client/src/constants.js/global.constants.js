export const CURRENT_URL =
  process.env.REACT_APP_NODE_END === "development"
    ? process.env.REACT_APP_LOCALHOST_URL
    : process.env.REACT_APP_HEROKU_HOST_URL;

console.log(process.env.REACT_APP_NODE_END);
