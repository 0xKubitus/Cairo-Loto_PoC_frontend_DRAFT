import * as process from "process";

const global = {
  nftAddress:
    // "0x039eb1299cbb259edabb45376ec742497c67150b9adc2d9c3c026a8cc58c634a", // AVNU's contract
    // "0x06b69b2e55b2327728bb21ec3f8f5203bf68ff129a2c64d4a8a119e6ccd43dc7", // Tickets contract v0.3
    "0x05f457b76adb6dd1de9f76cde1f436c3a3778f83d7ae42b8ae0761711b7d2b70", // TicketsHandler v0.4
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
