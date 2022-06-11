require("@nomiclabs/hardhat-waffle");
// https://eth-rinkeby.alchemyapi.io/v2/GTarSxt8i5GwZn9PxsTQQf-xVjNJDpgn

module.exports = {
  solidity: "0.8.0",
  networks:{
    rinkeby:{
      url:"https://eth-rinkeby.alchemyapi.io/v2/GTarSxt8i5GwZn9PxsTQQf-xVjNJDpgn",
      accounts:['0c07df1d7dff826637d793112894610bd1081c6a989aa224466001d7fdbe311c']
    }
  }
};
