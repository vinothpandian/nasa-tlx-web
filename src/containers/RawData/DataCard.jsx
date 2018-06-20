import React from 'react';
import { Card, CardBody, CardTitle, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';

const shortid = require('shortid');

function DataCard(props) {
  const tableHead = [];
  const tableContent = [];

  Object.entries(props.values).sort().forEach(([key, value]) => {
    tableHead.push(<th key={shortid.generate()} scope="col">{key}</th>);
    tableContent.push(<td key={shortid.generate()}>{value}</td>);
  });

  return (
    <Col xs={12} className="mt-4">
      <Card className="p-4">
        <CardTitle>{props.title}</CardTitle>
        <CardBody className="text-center pb-0">
          <Table>
            <thead>
              <tr>
                {tableHead}
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableContent}
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
}

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default DataCard;
