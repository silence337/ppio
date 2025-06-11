import React from 'react';
import { Link, NavLink } from 'react-router-dom';
interface HeaderProps {
  pathClassName?: string;
}

const Header: React.FC<HeaderProps> = ({ pathClassName = '' }) => {
  return (
    <header className={`pageHeader navigation ${pathClassName}`}>
      <h1>
        <Link to="/">
          <strong>
            <em>Work</em>
          </strong>{' '}
          <span>
            <em>done so far</em>
          </span>
        </Link>
      </h1>
      <p>- PORTFOLIO -</p>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/work"
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              WORK
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              HISTORY
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;