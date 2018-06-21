import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  CardBody,
} from 'reactstrap';
import { withRouter } from 'react-router';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FluidContainer } from '../../components';
import Menubar from '../../components/Menubar';
import UserNav from '../../components/UserNav';
import { fetchAllExperimentsAsync, fetchAllParticipantsAsync } from '../../actions/dashboard';
import Loading from '../../components/Loading';
import DashboardTable from './DashboardTable';

const Dashboard = class extends React.Component {
  constructor(props) {
    super(props);

    props.fetchAllExperimentsAsync(props.userID);

    this.state = {
      dropdownOpen: false,
      expID: 'Select',
    };

    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  handleClick(event) {
    const expID = event.target.id;
    const { userID } = this.props;

    this.setState({
      expID,
    });

    this.props.fetchAllParticipantsAsync(userID, expID);
  }

  render() {
    const {
      experimentList, experimentCount, participantList, participantCount,
    } = this.props;

    const { expID } = this.state;

    if (experimentCount === 0) return <Loading fullScreen />;

    const dropDownMenu = experimentList.map(value => (
      <DropdownItem key={value} id={value} onClick={this.handleClick}>
        {value}
      </DropdownItem>
    ));

    return (
      <FluidContainer fluid>
        <Menubar nav={<UserNav />} navBar />
        <Container className="my-3 my-md-5">
          <Row>
            <Col>
              <Card>
                <CardHeader className="d-flex">
                  <h4 className="font-weight-normal">Choose the Experiment Data to display</h4>
                  <div className="ml-auto">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret>{expID}</DropdownToggle>
                      <DropdownMenu>{dropDownMenu}</DropdownMenu>
                    </Dropdown>
                  </div>
                </CardHeader>
                <CardBody>
                  {expID === 'Select' || (
                    <DashboardTable
                      participantCount={participantCount}
                      participantList={participantList}
                      expID={expID}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </FluidContainer>
    );
  }
};

Dashboard.defaultProps = {
  experimentCount: 0,
  experimentList: new List(),
  participantCount: 0,
  participantList: new List(),
};

Dashboard.propTypes = {
  userID: PropTypes.string.isRequired,
  fetchAllExperimentsAsync: PropTypes.func.isRequired,
  fetchAllParticipantsAsync: PropTypes.func.isRequired,
  experimentCount: PropTypes.number,
  experimentList: PropTypes.instanceOf(List),
  participantCount: PropTypes.number,
  participantList: PropTypes.instanceOf(List),
};

const mapStateToProps = state => ({
  userID: state.user.get('userID'),
  experimentCount: state.dashboard.get('experimentCount'),
  experimentList: state.dashboard.get('experimentList'),
  participantCount: state.dashboard.get('participantCount'),
  participantList: state.dashboard.get('participantList'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllExperimentsAsync,
      fetchAllParticipantsAsync,
    },
    dispatch,
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard));
