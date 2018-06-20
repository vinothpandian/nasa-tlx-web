import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Row, Col, Button, Card, CardBody, CardFooter, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FluidContainer } from '../../components';
import Menubar from '../../components/Menubar';
import { clearExperimentData } from '../../actions/experiments';

const ErrorPage = class extends React.Component {
  componentDidMount() {
    this.props.clearExperimentData();
  }

  render() {
    return (
      <FluidContainer fluid>
        <Menubar />
        <Container className="my-3 my-md-5">
          <Row className="p-5">
            <Col>
              <Card>
                <CardBody className="text-center">
                  <h1 className="display-4 pt-4">Link does not exist</h1>
                  <p className="lead p-3">Please check the url</p>
                </CardBody>
                <CardFooter className="text-right">
                  <Button color="primary" tag={NavLink} to="/">
                    Return to Home
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </FluidContainer>
    );
  }
};

ErrorPage.propTypes = {
  clearExperimentData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearExperimentData,
    },
    dispatch,
  );

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(ErrorPage));
