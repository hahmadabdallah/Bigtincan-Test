import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <React.Fragment>
            <div className="header">
                <h1>Bigtincan Test</h1>
            </div>
            <div className="container">
                <nav className="mt-3 ">
                    <ul className="nav ">
                        <li>
                            <Link to={'/'}>Files </Link>
                        </li>
                        <li>
                            <Link to={'/add'}>Add File</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>

    );
}

export default Header;




