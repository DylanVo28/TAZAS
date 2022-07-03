const Dai = artifacts.require("Dai.sol");
const PaymentProcessor= artifacts.require("PaymentProcessor.sol");
const Greeter= artifacts.require("Greeter.sol");
const Order=artifacts.require('Order.sol')
module.exports = async function (deployer,network,address) {
    await deployer.deploy(Greeter)
    await Order.deploy(Order)
    const [admin, payer, _]=address;
    if(network==='develop'){
        await deployer.deploy(Dai)
        const dai=await Dai.deployed();
        await dai.faucet(payer,web3.utils.toWei('10000'))
        await deployer.deploy(PaymentProcessor,admin,dai.address);
    }
    else{
        const ADMIN_ADDRESS='';
        const DAI_ADDRESS=''
        await deployer.deploy(PaymentProcessor, ADMIN_ADDRESS,DAI_ADDRESS)
    }
};
