import Web3 from 'web3';
import SolidityFunction from 'web3/lib/web3/function';

const config = require('config');

class FCClaimRegistry {
  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
    }
  }  

  isAvailable(networkId){
    if (!!config.FCClaimRegistry[networkId] ){
      this.contract = this.web3.eth.contract(config.FCClaimRegistry[networkId].abi).at(config.FCClaimRegistry[networkId].address);
      this.verifyFunc = new SolidityFunction(
        window.web3,
        config.FCClaimRegistry[networkId].abi.find(v => v.type === 'function' && v.name === 'get'),
        config.FCClaimRegistry[networkId].address
      );
    }
    return Promise.resolve(!!config.FCClaimRegistry[networkId]);
  }

  getCost() {
    return new Promise((resolve, reject) => {
      if (this.web3) {
        this.contract.cost((err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      } else reject(new Error('No Web3 provider: install MetaMask!'));
    });
  }

  verifyClaim(issuer, calldata) {
    return new Promise((resolve, reject) => {
      if (this.web3) {
        this.web3.eth.call({
          to: issuer,
          data: calldata
        }, (err, result) => {
          // eslint-disable-next-line no-unused-vars
          const [active, sub] = this.verifyFunc.unpackOutput(result);
          if (err) return reject(err);
          return resolve({
            active,
            sub
          });
        });
      } else reject(new Error('No Web3 provider: install MetaMask!'));
    });
  }
}

export default new FCClaimRegistry();
