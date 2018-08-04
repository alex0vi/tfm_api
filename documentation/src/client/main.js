import { connect } from 'react-redux';
import { App } from '@addaps/doca-addaps-theme';
import config from '../../config';

// this dynamically imports css, less and sass from the "THEME/styles"
try {
  const reqCSS = require.context('@addaps/doca-addaps-theme/styles', true, /\.css$/ig);
  reqCSS.keys().forEach(reqCSS);
  const reqLESS = require.context('@addaps/doca-addaps-theme/styles', true, /\.less$/ig);
  reqLESS.keys().forEach(reqLESS);
  const reqSASS = require.context('@addaps/doca-addaps-theme/styles', true, /\.scss$/ig);
  reqSASS.keys().forEach(reqSASS);
} catch (e) {
  // no theme styles were found
}

const mapStateToProps = state => ({
  schemas: state.schemas,
  config
});

const Main = connect(
  mapStateToProps,
)(App);

export default Main;
