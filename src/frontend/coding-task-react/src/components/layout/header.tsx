import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h2>EEBK99</h2>
        </Link>
      </div>
    </header>
  );
};

export default Header;
