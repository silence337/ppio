import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ pathClassName }) => {
  return (
    <header className={'pageHeader navigation ' + pathClassName}>
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
      <ul>
        <li>
          <NavLink to="/work" className={({ isActive }) => (isActive ? 'selected' : '')}>
            WORK
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={({ isActive }) => (isActive ? 'selected' : '')}>
            HISTORY
          </NavLink>
        </li>
      </ul>
    </header>
  );
};
export default Header;
