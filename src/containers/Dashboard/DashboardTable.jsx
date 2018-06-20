import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button } from 'reactstrap';
import { List } from 'immutable';
import { NavLink } from 'react-router-dom';

const DashboardTable = (props) => {
  const { expID } = props;

  return (
    <Row>
      <Col xs={12}>
        <h3>Experiment: {expID} </h3>
      </Col>
      <Col xs={12} className="mt-4">
        <Table>
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Date and Time</th>
              <th scope="col">Participant ID</th>
              <th scope="col">Weighted Rating</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {props.participantList.map((details, index) => {
              const { partID, date, weightedRating } = details.toJS();

              return (
                <tr key={partID}>
                  <td> {index + 1} </td>
                  <td> {date} </td>
                  <th scope="row"> {partID} </th>
                  <td> {weightedRating} </td>
                  <td>
                    <Button tag={NavLink} to={`/rawData/${expID}/${partID}`} color="primary">
                      View Raw Data
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <hr />
      </Col>
    </Row>
  );
};

DashboardTable.defaultProps = {
  participantCount: 0,
  participantList: new List(),
};

DashboardTable.propTypes = {
  expID: PropTypes.string.isRequired,
  participantCount: PropTypes.number,
  participantList: PropTypes.instanceOf(List),
};

export default DashboardTable;
