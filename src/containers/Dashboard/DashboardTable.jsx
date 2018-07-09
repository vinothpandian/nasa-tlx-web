import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, ButtonGroup } from 'reactstrap';
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
import { TH, LoadingButton } from '../../components';
import { fetchExperimentData } from '../../components/firebase';

const DashboardTable = class extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      jsonButton: {
        state: 'none',
        disabled: false,
      },
      csvButton: {
        state: 'none',
        disabled: false,
      },
    };

    this.state = this.initialState;

    this.processParticipantData = this.processParticipantData.bind(this);
    this.handleJSONClick = this.handleJSONClick.bind(this);
    this.handleCSVClick = this.handleCSVClick.bind(this);
    this.downloadContent = this.downloadContent.bind(this);
  }

  downloadContent = (type, content) => {
    const data =
      type === 'json'
        ? `data:text/json;charset=utf-8,${encodeURIComponent(content)}`
        : `data:text/csv;charset=utf-8,${encodeURIComponent(content)}`;

    const el = document.createElement('a');
    el.setAttribute('href', data);
    el.setAttribute('download', `data.${type}`);
    el.click();
  };

  handleJSONClick() {
    this.setState({
      csvButton: {
        state: 'none',
        disabled: true,
      },
      jsonButton: {
        state: 'loading',
        disabled: true,
      },
    });

    fetchExperimentData(this.props.expID, 'json').then((response) => {
      if (response.status) {
        this.downloadContent('json', response.data);

        this.setState(this.initialState);
      }
    });
  }

  handleCSVClick() {
    this.setState({
      csvButton: {
        state: 'loading',
        disabled: true,
      },
      jsonButton: {
        state: 'none',
        disabled: true,
      },
    });

    fetchExperimentData(this.props.expID, 'csv').then((response) => {
      if (response.status) {
        this.downloadContent('csv', response.data);

        this.setState(this.initialState);
      }
    });
  }

  processParticipantData() {
    const { expID, participantList } = this.props;

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
  }

  render() {
    const { expID, participantList } = this.props;
    const { jsonButton, csvButton } = this.state;

    if (participantList.size === 0) {
      return (
        <Row>
          <Col xs={12}>
            <h3>No complete experiment data found</h3>
          </Col>
        </Row>
      );
    }

    const { tableData, average, chartData } = this.processParticipantData();

    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col>
              <h3>Experiment: {expID} </h3>
            </Col>
            <Col xs="auto" className="ml-auto">
              <Row className="align-items-center">
                <Col className="lead">Export :</Col>
                <Col>
                  <ButtonGroup>
                    <LoadingButton
                      disabled={jsonButton.disabled}
                      state={jsonButton.state}
                      onClick={this.handleJSONClick}
                    >
                      JSON
                    </LoadingButton>
                    <LoadingButton
                      disabled={csvButton.disabled}
                      state={csvButton.state}
                      onClick={this.handleCSVClick}
                    >
                      CSV
                    </LoadingButton>
                  </ButtonGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="mt-4">
          <Table responsive>
            <thead>
              <tr>
                <TH className="col" width={10} scope="col" />
                <TH className="col" width={18} scope="col">
                  Date and Time
                </TH>
                <TH className="col" width={18} scope="col">
                  Participant ID
                </TH>
                <TH className="col" width={18} scope="col">
                  Weighted Rating
                </TH>
                <TH className="col" width={18} scope="col" />
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
          <h3>Weighted rating chart of participants</h3>
        </Col>
        <Col xs="12" className="mt-4">
          <Row className="justify-content-center align-items-center">
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
  }
};

DashboardTable.defaultProps = {
  participantList: new List(),
};

DashboardTable.propTypes = {
  expID: PropTypes.string.isRequired,
  participantList: PropTypes.instanceOf(List),
};

export default DashboardTable;
