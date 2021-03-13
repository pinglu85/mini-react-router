import { useContext } from 'react';

import { RouterContext } from './Router';

const Link = ({ to, children }) => {
  const { push } = useContext(RouterContext);

  const handleClick = (e) => {
    e.preventDefault();
    push(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;
