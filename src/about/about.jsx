import React from 'react';
import './about.css';

export function About(props) {
  const [imageUrl, setImageUrl] = React.useState('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  // We only want this to render the first time the component is created and so we provide an empty dependency list.

  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');

        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;
        const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        setImageUrl(apiUrl);
      })
      .catch();
    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);

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

      <div className="quote-box bg-light text-dark">
        <p className="quote">{quote}</p>
        <p className="author">{quoteAuthor}</p>
      </div>

    </main>
  );
}