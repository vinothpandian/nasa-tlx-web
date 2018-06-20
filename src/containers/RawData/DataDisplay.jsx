import React from 'react';
import PropTypes from 'prop-types';
import { CardBody, CardTitle } from 'reactstrap';
import Chart from './Chart';
import DataCard from './DataCard';

const DataDisplay = (props) => {
  const {
    scale, workload, adjustedRating, weightedRating,
  } = props.data;

  return (
    <CardBody>
      <CardTitle tag="h3">Weighted rating: {weightedRating}</CardTitle>
      <Chart adjustedRating={adjustedRating} weightedRating={weightedRating} />
      <DataCard title="Raw ratings" values={scale} />
      <DataCard title="Sources of Workload tally (number of times selected)" values={workload} />
      <DataCard title="Adjusted Rating (Weight x Raw)" values={adjustedRating} />
    </CardBody>
  );
};

DataDisplay.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DataDisplay;
