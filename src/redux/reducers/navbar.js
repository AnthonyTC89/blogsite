const defaultNavbar = [
  { name: 'Posts', link: 'posts', active: true },
  { name: 'Profile', link: 'profile', active: false },
  { name: 'Friends', link: 'friends', active: false },
  { name: 'Logout', link: 'logout', active: false },
];

const navbar = (state = defaultNavbar, { type, nav }) => {
  switch (type) {
    case 'UPDATE_NAVBAR':
      if (nav === 'default') {
        return defaultNavbar;
      }
      return nav;
    default:
      return state;
  }
};

export default navbar;
