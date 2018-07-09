import styled, { keyframes } from 'react-emotion';
import { Container, Row, Button } from 'reactstrap';

const spin = keyframes(`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`);

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

export const TH = styled.th(props => ({
  width: `${props.width} !important`,
}));

export const LoadingButton = styled(Button)((props) => {
  if (props.state === 'loading') {
    return {
      position: 'relative',
      opacity: '90% !important',
      '&:after': {
        content: '" "',
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        border: '4px solid #455969',
        borderTop: '4px solid white',
        borderRight: '4px solid white',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        animation: `${spin} 2s linear infinite`,
      },
    };
  }

  return {};
});

export default null;
