import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FluidContainer } from '../../components';
import Menubar from '../../components/Menubar';
import UserNav from '../../components/UserNav';
import { syncExpDataAsync } from '../../actions/experiments';

const RawData = class extends React.Component {
  componentDidMount() {
    const { userID, match } = this.props;
    const { expID, partID } = match.params;

    console.log(userID);

    this.props.syncExpDataAsync({ userID, expID, partID });
  }

  render() {
    return (
      <FluidContainer fluid>
        <Menubar nav={<UserNav />} navBar />
        <Container className="my-3 my-md-5">
          <h1>Hello</h1>
        </Container>
      </FluidContainer>
    );
  }
};

RawData.propTypes = {
  syncExpDataAsync: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      expID: PropTypes.string.isRequired,
      partID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  userID: state.user.get('userID'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      syncExpDataAsync,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawData);
