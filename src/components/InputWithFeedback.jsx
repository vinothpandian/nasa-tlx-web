import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  InputGroup,
  InputGroupAddon,
  Button,
} from 'reactstrap';

const InputWithFeedback = class extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
  }

  render() {
    const { props } = this;

    return (
      <FormGroup>
        <Label for={props.name}>{props.label}</Label>
        <InputGroup>
          <Input
            id={props.name}
            name={props.name}
            onChange={this.handleChange}
            value={props.value}
            invalid={props.error}
          />
          <InputGroupAddon addonType="append">
            <Button onClick={props.buttonAction} color={props.buttonColor}>
              {props.buttonLabel}
            </Button>
          </InputGroupAddon>
          <FormFeedback invalid={props.error.toString()}>{props.errorText}</FormFeedback>
        </InputGroup>
        <FormText>{props.helperText}</FormText>
      </FormGroup>
    );
  }
};

InputWithFeedback.defaultProps = {
  helperText: '',
  buttonLabel: 'primary',
  buttonColor: '',
  buttonAction: () => {},
};

InputWithFeedback.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonAction: PropTypes.func,
};

export default InputWithFeedback;
