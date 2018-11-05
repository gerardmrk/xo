import { connect } from "react-redux";

import AppTypes from "AppTypes";
import GlobalLoader, { Props } from "./component";

export type DispatchProps = {};

const mapStateToProps = (state: AppTypes.Store.State): Props => ({
  show: state.globalLoader.loading,
  loadingMessage: state.globalLoader.message
});

const mapDispatchToProps = (
  dispatch: AppTypes.Store.Dispatcher
): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalLoader);
