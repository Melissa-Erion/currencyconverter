import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <nav>
        <h2 id='logo'>CoinConvert</h2>

        <ul className="menu-items">
          <li id='logo'>
            <Link to="/"></Link>
          </li>
          <li>
          <a href="mailto:melissa.erion@hotmail.ca" target="_blank" rel="noopener noreferrer">
          <FaEnvelope size={30} />
        </a>
        </li>
        <li>
        <a href="https://www.linkedin.com/in/melissa-biddlecombe-54366a25b/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} />
        </a>
        </li>
        <li>
        <a href="https://github.com/Melissa-Erion" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
        </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


