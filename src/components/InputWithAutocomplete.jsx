import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import { List } from 'immutable';

const InputWithAutocomplete = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchItems();
  };

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  handleClick(event) {
    this.props.handleChange(event.target.id);
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
  }

  render() {
    const {
      name, label, value, error, errorText, helperText, items,
    } = this.props;
    const { isOpen } = this.state;

    const dropDownItems = items
      .toJS()
      .slice(0, 5)
      .map(val => (
        <DropdownItem key={val} id={val} onClick={this.handleClick}>
          {' '}
          {val}{' '}
        </DropdownItem>
      ));

    return (
      <FormGroup>
        <Label for={name}>{label}</Label>
        <InputGroup>
          <Input id={name} name={name} onChange={this.handleChange} value={value} invalid={error} />
          <InputGroupButtonDropdown addonType="append" isOpen={isOpen} toggle={this.toggle}>
            <DropdownToggle split />
            <DropdownMenu>{dropDownItems}</DropdownMenu>
          </InputGroupButtonDropdown>
          <FormFeedback invalid={error.toString()}>{errorText}</FormFeedback>
        </InputGroup>
        <FormText>{helperText}</FormText>
      </FormGroup>
    );
  }
};

InputWithAutocomplete.defaultProps = {
  helperText: '',
};

InputWithAutocomplete.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  items: PropTypes.instanceOf(List).isRequired,
};

export default InputWithAutocomplete;
