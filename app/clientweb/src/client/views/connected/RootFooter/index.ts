import { connect } from "react-redux";

import AppTypes from "AppTypes";
import RootFooter, { Props } from "./component";

export type DispatchProps = {};

const mapStateToProps = (state: AppTypes.Store.State): Props => ({});

const mapDispatchToProps = (
  dispatch: AppTypes.Store.Dispatcher
): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootFooter);
