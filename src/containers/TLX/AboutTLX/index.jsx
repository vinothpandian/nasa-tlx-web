import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardBody, CardFooter } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import Paragraph from '../../../components/Paragraph';

const AboutTLX = (props) => {
  const { pathname } = props.location;

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <Paragraph className="mt-0" title="About Nasa TLX">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dignissimos quis
              reiciendis molestiae, est iste dicta possimus delectus magnam nisi aspernatur dolores
              veniam nam unde laborum error? Nesciunt totam quo sequi aliquam ex sint nisi
              repudiandae tempore, impedit, fuga rem, nulla pariatur voluptatibus ipsum cumque modi!
              Quis dolorum, aliquid itaque, animi earum iusto rem maiores fuga est dignissimos
              dolores a expedita! Deserunt.
            </Paragraph>
            <Paragraph title="Procedure">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dignissimos quis
              reiciendis molestiae, est iste dicta possimus delectus magnam nisi aspernatur dolores
              veniam nam unde laborum error? Nesciunt totam quo sequi aliquam ex sint nisi
              repudiandae tempore, impedit, fuga rem, nulla pariatur voluptatibus ipsum cumque modi!
              Quis dolorum, aliquid itaque, animi earum iusto rem maiores fuga est dignissimos
              dolores a expedita! Deserunt, tenetur perspiciatis. Accusamus velit corrupti
              laudantium autem labore. Expedita reprehenderit mollitia voluptatum ipsum harum esse
              blanditiis enim suscipit aperiam. Cum est, ea vel distinctio odit expedita, veniam,
              fuga atque reiciendis quos corrupti beatae eius voluptatibus? Fugiat, numquam magnam?
            </Paragraph>
          </CardBody>
          <CardFooter className="text-right">
            <Button color="primary" tag={NavLink} to={pathname.replace('aboutTLX', 'definitions')}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

AboutTLX.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(AboutTLX);
