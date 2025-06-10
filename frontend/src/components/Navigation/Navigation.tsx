import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaHeart, FaSearch } from "react-icons/fa";

function Navigation(): JSX.Element {
  return (
    <nav className="navbar">

      <div id="left">

        <NavLink to="/">
          <img id="devsyhome" src="/devsyBackgroundRemoved.png" alt="Devsy Logo" width='120px' height={'120x'} />
        </NavLink>

        <button id='categories'>
          <FaBars id="bars" />
          Categories
        </button>

      </div>
      <div id="center">
        <div id="search-bar">
          <input type="text" placeholder="Search for anything" />
          <button type="submit">
            <FaSearch />
          </button>
        </div>

      </div>

      <div id="right">


        <button id="heart">
          <FaHeart />
        </button>


        <ProfileButton />
        <button id="cart">

          <FaCartShopping />
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
