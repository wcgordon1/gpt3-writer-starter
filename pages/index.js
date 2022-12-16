import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Cover Letter by Will</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Cover Letter</h1>
          </div>
          <div className="header-subtitle">
            <h2>Are you tired of struggling to write the perfect cover letter for your job applications?</h2>
            <h2>Introducing Cover Letter Creator, the innovative app that helps you craft professional and personalized cover letters in just a few seconds.</h2>
            <h2>Imagine being able to apply for your dream job with confidence, knowing that you have a top-notch cover letter to accompany your resume. Cover Letter Creator makes it easy to stand out from the competition and increase your chances of landing the job.</h2>
            <h2>Don't waste any more time struggling to write the perfect cover letter. Start creating winning cover letters today.</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
      <div className="output-header">
        <h3>Job Description:</h3>
      </div>
          <textarea placeholder="Paste Job Description" className="prompt-box" value={userInput}
  onChange={onUserChangedText} />
  <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
  </a>
    </div>
    <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Cover Letter:</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
    </div>
        </div>


        <div className="badge-container grow">
        <a
          href="https://www.linkedin.com/in/will-gordon1/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>built by Will</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
