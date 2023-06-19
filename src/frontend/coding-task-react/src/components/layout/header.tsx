import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">EEBK99</Link>
      </div>
    </header>
  );
};

export default Header;
