import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserNavItem from './UserNavItem';
import { NavbarToggler } from './NavbarToggler';

import { NavItemsContainer } from './NavItemsContainer';
import { NavItem } from './NavItem';
import LogoutButton from './LogoutButton';

const Navbar = ({ loggedInUser, users }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {loggedInUser !== '' }
      <NavbarToggler />
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarsExample04"
      >
        {loggedInUser && <UserNavItem />}
        <NavItemsContainer>
          <NavItem route="/" text="Home" />
          <NavItem route="/add" text="Add Question" />
          <NavItem route="/leaderboard" text="Leaderboard" />
        </NavItemsContainer>
        {loggedInUser && <LogoutButton />}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  loggedInUser: PropTypes.string.isRequired,
  users: PropTypes.object,
};

const mapStateToProps = (state) => ({
  loggedInUser: state.auth,
  users: state.users,
});

export default connect(mapStateToProps)(Navbar);
