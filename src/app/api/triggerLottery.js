// import { constants, Provider } from "starknet";

// //initialize Provider
// const provider = new Provider({
//   sequencer: { network: constants.NetworkName.SN_GOERLI },
// });
// // connect your account. To adapt to your own account :
// const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
// const account0Address = "0xMyOZaccountAddress"; // TODO: to be replaced with real address

// const account0 = new Account(provider, account0Address, privateKey0);

// // Connect the deployed Lottery contract in Tesnet
// const LotteryAddress = "0xmMyLotteryContractAddress"; // TODO: to be replaced with real address

// // read abi of Lottery contract
// const { abi: LotteryAbi } = await provider.getClassAt(LotteryAddress);
// if (LotteryAbi === undefined) {
//   throw new Error("no abi.");
// }
// const myLotteryContract = new Contract(LotteryAbi, LotteryAddress, provider);

// // Connect account with the contract
// myLotteryContract.connect(account0);

// // Interactions with the contract
// // Make a call to know which is the current lottery_ID
// const IDbefore = await myLotteryContract.currentDrawId();
// console.log("Initial ID =", IDbefore.res.toString());

// // "Contract.populate()" is the recommended method to define the Cairo function we want to invoke (and eventually pass it some parameters)
// const myCall = myLotteryContract.populate("triggerTestFunction"); // "triggerTestFunction()" should be an external function in the deployed Lottery contract (and should increase by 1 the storage variable "drawId")
// const res = await myLotteryContract.triggerTestFunction(myCall.calldata);
// await provider.waitForTransaction(res.transaction_hash);

// // Make a call to ensure that the invoke has worked properly
// const IDafter = await myLotteryContract.currentDrawId();
// console.log("Final ID =", IDafter.res.toString());

// ----------------------------------------------------------------

// CHATGPT TAKE AT IMPLEMENTING SERVERLESS FUNCTION:

import { constants, Provider, Account, Contract } from "starknet";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    //initialize Provider
    const provider = new Provider({
      sequencer: { network: constants.NetworkName.SN_GOERLI },
    });

    // Connect your account. To adapt to your own account:
    const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
    const account0Address = "0xMyOZaccountAddress"; // TODO: to be replaced with real address
    const account0 = new Account(provider, account0Address, privateKey0);

    // Connect the deployed Lottery contract in Testnet
    const LotteryAddress = "0xmMyLotteryContractAddress"; // TODO: to be replaced with real address

    // Read abi of Lottery contract
    const { abi: LotteryAbi } = await provider.getClassAt(LotteryAddress);
    if (LotteryAbi === undefined) {
      throw new Error("no abi.");
    }
    const myLotteryContract = new Contract(
      LotteryAbi,
      LotteryAddress,
      provider
    );

    // Connect account with the contract
    myLotteryContract.connect(account0);

    // Interactions with the contract
    // Make a call to know which is the current lottery_ID
    const IDbefore = await myLotteryContract.currentDrawId();
    console.log("Initial ID =", IDbefore.res.toString());

    // "Contract.populate()" is the recommended method to define the Cairo function we want to invoke (and eventually pass it some parameters)
    const myCall = myLotteryContract.populate("triggerTestFunction"); // "triggerTestFunction()" should be an external function in the deployed Lottery contract (and should increase by 1 the storage variable "drawId")
    const res = await myLotteryContract.triggerTestFunction(myCall.calldata);
    await provider.waitForTransaction(res.transaction_hash);

    // Make a call to ensure that the invoke has worked properly
    const IDafter = await myLotteryContract.currentDrawId();
    console.log("Final ID =", IDafter.res.toString());

    return NextResponse.json({ ok: true }); // Return a response indicating success
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ ok: false, error: error.message }); // Return an error response
  }
}
