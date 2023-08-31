import * as process from "process";

const global = {
  nftAddress:
    // "0x039eb1299cbb259edabb45376ec742497c67150b9adc2d9c3c026a8cc58c634a", // AVNU's contract
    // "0x06b69b2e55b2327728bb21ec3f8f5203bf68ff129a2c64d4a8a119e6ccd43dc7", // Tickets contract v0.3
    "0x025654448400d6078a4b9e09f6e90816bc63325996232aa1a69661c267354cab", // TicketsHandler v0.4
  ethAddress:
    "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
  dev: false,
};

const dev = {
  ...global,
  dev: true,
};

const prod = {
  ...global,
};

const environment = process.env.NODE_ENV === "development" ? dev : prod;
export default environment;
