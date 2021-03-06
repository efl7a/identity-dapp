import { connect } from 'react-redux';

import { estimateCost, deployIdentity, resetDeployment } from 'actions/Register.action';
import RegisterComponent from 'components/Register.component';
import {addIdentity} from "../actions/Identity.action";

const mapStateToProps = store => ({
  providerReady: store.network.providerReady,
  network: store.network.network,
  account: store.network.account,
  fetchingCost: store.register.fetchingCost,
  cost: store.register.cost,
  gas: store.register.gas,
  deploying: store.register.deploying,
  txHash: store.register.txHash,
  address: store.register.address,
  addIdentityOperationResult: store.identity.addIdentityOperationResult
});

const mapDispatchToProps = dispatch => ({
  fetchCost: () => dispatch(estimateCost()),
  deploy: (account, gas) => dispatch(deployIdentity(account, gas)),
  reset: () => dispatch(resetDeployment()),
  addIdentity: address => dispatch(addIdentity(address))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent);
