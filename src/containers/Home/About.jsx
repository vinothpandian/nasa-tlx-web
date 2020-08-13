import React from 'react';
import Paragraph from '../../components/Paragraph';
import content from '../../assets/homePage';

const About = () => (
  <div>
    <h1>Nasa TLX</h1>
    <hr />
    <Paragraph title="">
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
    <Paragraph title="Desktop version">
      You can also use the <a href="https://github.com/vinothpandian/nasa-tlx-desktop" target="_blank" rel="noopener noreferrer">NASA-TLX desktop application</a> if you prefer to keep your data local instead of using Firebase.
    </Paragraph>


  </div>
);

export default About;
