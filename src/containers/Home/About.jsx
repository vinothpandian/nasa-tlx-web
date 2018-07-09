import React from 'react';
import Paragraph from '../../components/Paragraph';
import content from '../../assets/homePage';

const About = () => (
  <div>
    <h1>Nasa TLX</h1>
    <hr />
    <Paragraph title="Background">
      {content.background.map(paragraph => <p key={paragraph.slice(1, 20)}> {paragraph} </p>)}
    </Paragraph>
    <Paragraph title="About this version">
      {content.aboutThisVersion.map(paragraph => <p key={paragraph.slice(1, 20)}> {paragraph} </p>)}
    </Paragraph>
  </div>
);

export default About;
