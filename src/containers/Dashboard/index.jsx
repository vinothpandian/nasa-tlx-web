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
import ErrorPage from '../ErrorPage/index';

const Dashboard = class extends React.Component {
  constructor(props) {
    super(props);

    props.fetchAllExperimentsAsync();

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

    this.setState({
      expID,
    });

    this.props.fetchAllParticipantsAsync(expID);
  }

  render() {
    const { experimentList, experimentCount, participantList } = this.props;

    const { expID } = this.state;

    /* Default loading screen */
    if (experimentCount === -1) return <Loading fullScreen />;

    /* When no experiments found */
    if (experimentCount === 0) {
      return (
        <ErrorPage
          message="No experiments conducted"
          notification="Come back later.."
          clearExperiment={false}
        />
      );
    }

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
                  <h4 className="font-weight-normal">Choose experiment ID to display its data</h4>
                  <div className="ml-auto w-25">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle className="w-100" color="secondary" caret>
                        {expID}
                      </DropdownToggle>
                      <DropdownMenu>{dropDownMenu}</DropdownMenu>
                    </Dropdown>
                  </div>
                </CardHeader>
                <CardBody>
                  {expID === 'Select' || (
                    <DashboardTable participantList={participantList} expID={expID} />
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
  experimentCount: -1,
  experimentList: new List(),
  participantList: new List(),
};

Dashboard.propTypes = {
  fetchAllExperimentsAsync: PropTypes.func.isRequired,
  fetchAllParticipantsAsync: PropTypes.func.isRequired,
  experimentCount: PropTypes.number,
  experimentList: PropTypes.instanceOf(List),
  participantList: PropTypes.instanceOf(List),
};

const mapStateToProps = state => ({
  experimentCount: state.dashboard.get('experimentCount'),
  experimentList: state.dashboard.get('experimentList'),
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
