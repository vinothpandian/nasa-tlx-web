import React from 'react';
import Paragraph from '../../components/Paragraph';
import content from '../../assets/homePage';

const About = () => (
  <div>
    <h1>Nasa TLX</h1>
    <hr />
    <Paragraph>
      {content.background.map(paragraph => <p key={paragraph.slice(1, 20)}> {paragraph} </p>)}

      <p className="small text-secondary">
        Credit: Sharek, D. (2009). NASA-TLX Online Tool (Version 0.06) [Internet Application].
        Research Triangle, NC. Retrieved from{' '}
        <a href="http://www.nasatlx.com">http://www.nasatlx.com</a>
      </p>
    </Paragraph>
    <Paragraph title="About this version">
      {content.aboutThisVersion.map(paragraph => <p key={paragraph.slice(1, 20)}> {paragraph} </p>)}
    </Paragraph>
  </div>
);

export default About;
