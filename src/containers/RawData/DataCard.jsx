import React from 'react';
import { Card, CardBody, CardTitle, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { TH } from '../../components';

const shortid = require('shortid');

function DataCard(props) {
  const tableHead = [];
  const tableContent = [];

  Object.entries(props.values)
    .sort()
    .forEach(([key, value]) => {
      const head = (
        <TH
          width={16.67}
          className="col text-left align-baseline"
          key={shortid.generate()}
          scope="col"
        >
          {key}
        </TH>
      );

      const field = (
        <td className="text-left align-baseline" key={shortid.generate()}>
          {value}
        </td>
      );

      tableHead.push(head);
      tableContent.push(field);
    });

  return (
    <Col xs={12} className="mt-4">
      <Card className="p-4">
        <CardTitle>{props.title}</CardTitle>
        <CardBody className="pb-0">
          <Table responsive>
            <thead>
              <tr>{tableHead}</tr>
            </thead>
            <tbody>
              <tr>{tableContent}</tr>
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
