import React from 'react';
import PropTypes from 'prop-types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardBody, Col, Row } from 'reactstrap';

const Chart = (props) => {
  const { adjustedRating, weightedRating } = props;

  const chartData = Object.entries(adjustedRating).map(([key, value]) => ({
    name: key,
    score: parseFloat((value / 15).toFixed(2)),
  }));

  return (
    <Col xs={12} className="mt-4">
      <Card>
        <CardBody>
          <Row className="justify-content-center align-items-stretch">
            <Col xs={9}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="none">
                    <Label value="Importance Weight" offset={-10} position="bottom" />
                  </XAxis>
                  <YAxis
                    label={{ value: 'Rating', angle: -90, position: 'insideLeft' }}
                    domain={[0, 'dataMax + 10']}
                  />
                  <Tooltip />
                  <Bar dataKey="score" fill="#82ca9d">
                    <LabelList dataKey="name" position="top" />
                  </Bar>
                  <Legend align="left" verticalAlign="bottom" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
            <Col xs={3}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={[{ tag: 'Weighted Rating', score: weightedRating }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="none">
                    <Label value="Overall Workload" offset={-10} position="bottom" />
                  </XAxis>
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8884d8">
                    <LabelList dataKey="tag" position="top" />
                  </Bar>
                  <Legend align="right" verticalAlign="bottom" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

Chart.propTypes = {
  adjustedRating: PropTypes.shape().isRequired,
  weightedRating: PropTypes.number.isRequired,
};

export default Chart;
