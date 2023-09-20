import * as process from "process";

const global = {
  nftAddress:
    "0x05bb38d5bfb0e6b4918edc3a02839981afd49dd27b3566cba0d2be50333bed28", // TicketsHandler v0.4.3.2 (currently testing if deposit to zkLend is working)
  // "0x0233314cf65085aabb2762bd2481caa2123c52a52f37d18b4f1ea2cef24a386c", // TicketsHandler v0.4.3.1 (only approves zkLend Market, but no deposit)
  // "0x039eb1299cbb259edabb45376ec742497c67150b9adc2d9c3c026a8cc58c634a", // AVNU's contract
  // "0x06b69b2e55b2327728bb21ec3f8f5203bf68ff129a2c64d4a8a119e6ccd43dc7", // Tickets contract v0.3
  // "0x025654448400d6078a4b9e09f6e90816bc63325996232aa1a69661c267354cab", // TicketsHandler v0.4
  // "0x07c4e99af60f7466b03347dbe1faa4f788776bf5e934c8ab5a911a45ca64d566", // TicketsHandler v0.4.2
  ethAddress:
    "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
  usdcAddress:
    "0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426",
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
