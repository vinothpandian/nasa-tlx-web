import styled from 'react-emotion';
import { Container, Row } from 'reactstrap';

export const FluidContainer = styled(Container)({
  padding: 0,
});

export const JustifiedParagraph = styled.p({
  textAlign: 'justify',
});

export const FullHeightRow = styled(Row)(props => ({
  justifyContent: props.justify,
  alignItems: props.align,
  textAlign: 'left',
  height: 'calc(100% - 58.8px)',
}));

export default null;
