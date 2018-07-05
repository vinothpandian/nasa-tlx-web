import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button } from 'reactstrap';
import { List } from 'immutable';
import { NavLink } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const processParticipantData = (participantList, expID) => {
  let sum = 0;
  let count = 0;
  const chartData = [];

  const tableData = participantList.map((details, index) => {
    const { partID, date, weightedRating } = details.toJS();

    sum += weightedRating;
    count += 1;
    chartData.push({
      name: partID,
      weightedRating,
    });

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
  });

  return {
    tableData,
    chartData,
    average: (sum / count).toFixed(2),
  };
};

const DashboardTable = (props) => {
  const { expID, participantList } = props;

  if (participantList.size === 0) {
    return (
      <Row>
        <Col xs={12}>
          <h3>No complete experiment data found</h3>
        </Col>
      </Row>
    );
  }

  const { tableData, average, chartData } = processParticipantData(participantList, expID);

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
            {tableData}
            <tr>
              <td />
              <td />
              <th scope="row">Average weighted rating</th>
              <td> {average} </td>
              <td />
            </tr>
          </tbody>
        </Table>
        <hr />
      </Col>
      <Col xs="12">
        <h3 className="mt-3">Weighted-rating chart of participants</h3>
        <Row className="justify-content-center align-items-center w-100 mt-5 h-100">
          <Col xs={12}>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: 'Participants', position: 'bottom' }} dataKey="name" />
                <YAxis
                  label={{ value: 'Weighted Rating', angle: -90, position: 'insideLeft' }}
                  domain={[0, 100]}
                />
                <Tooltip />
                <Legend align="left" verticalAlign="bottom" />
                <Bar dataKey="weightedRating" fill="#2E81C0" />
                <ReferenceLine
                  y={parseFloat(average)}
                  stroke="red"
                  strokeDasharray="3 3"
                  label={{ value: `Average: ${average}`, position: 'insideBottom' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

DashboardTable.defaultProps = {
  participantList: new List(),
};

DashboardTable.propTypes = {
  expID: PropTypes.string.isRequired,
  participantList: PropTypes.instanceOf(List),
};

export default DashboardTable;
