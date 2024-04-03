import logo from "../assets/imgs/logo.jpg";
import "../styles/Header.css";

export const Header = () => {
  return (
    <div className="header-cnt">
      <img src={logo} alt="" />
    </div>
  );
};
