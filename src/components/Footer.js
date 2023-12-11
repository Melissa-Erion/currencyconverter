import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2023 CoinConvert</p>
      <div id="contact">
        <a href="mailto:melissa.erion@hotmail.ca" target="_blank" rel="noopener noreferrer">
          <FaEnvelope size={30} />
        </a>
        <a href="https://www.linkedin.com/in/melissa-biddlecombe-54366a25b/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} />
        </a>
        <a href="https://github.com/Melissa-Erion" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
