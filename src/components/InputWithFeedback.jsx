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

const InputWithFeedback = props => (
  <FormGroup>
    <Label for={props.name}>{props.label}</Label>
    <InputGroup>
      <Input
        id={props.name}
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
        invalid={props.error}
      />
      {props.addon && (
        <InputGroupAddon addonType="append">
          <Button onClick={props.buttonAction} color={props.buttonColor}>
            {props.buttonLabel}
          </Button>
        </InputGroupAddon>
      )}
      <FormFeedback invalid={props.error.toString()}>{props.errorText}</FormFeedback>
    </InputGroup>
    <FormText>{props.helperText}</FormText>
  </FormGroup>
);

InputWithFeedback.defaultProps = {
  helperText: '',
  addon: false,
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
  addon: PropTypes.bool,
  buttonLabel: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonAction: PropTypes.func,
};

export default InputWithFeedback;
