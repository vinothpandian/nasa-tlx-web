import React from 'react';
import { Card, CardBody, CardTitle, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';

const shortid = require('shortid');

function DataCard(props) {
  const tableHead = [];
  const tableContent = [];

  Object.entries(props.values)
    .sort()
    .forEach(([key, value]) => {
      const head = (
        <th className="col-2 text-left align-baseline" key={shortid.generate()} scope="col">
          {key}
        </th>
      );

      const field = (
        <td className="col-2 text-left align-baseline " key={shortid.generate()}>
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
          <Table>
            <thead>
              <tr className="d-flex">{tableHead}</tr>
            </thead>
            <tbody>
              <tr className="d-flex">{tableContent}</tr>
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
