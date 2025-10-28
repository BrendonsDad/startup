import React from 'react';
import './about.css';

export function About() {
  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect(() => {
    setImageUrl(`smilingfreinds.png`);
  })
  return (
    <main className="container-fluid bg-secondary text-center">
        <div id="picture" className="picture-box">
          <img src={imageUrl} alt="random" />
        </div>

      <div id="quote" className="quote-box bg-light text-dark">
        <p className="quote">
          Remember the excietment you felt when you met and hung out with your best friends while growing up? At Friendzie, 
          we try to capture that feeling. Unlike other social media platforms that try to keep you on them as long as possible, 
          we focuse on helping people with similar interests meet up. Meet people in your area that have a similar taste in music, 
          sports or anything else you could imagine. Invite people to "hang" and form groups. We focus on finding you new friends, 
          and you get to focus on your real social life.
        </p>
    </div>

    </main>
  );
}