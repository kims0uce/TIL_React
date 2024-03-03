import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p
        style={{
          textAlign: "center",
          color: "#a39191",
          margin: 0,
        }}
      >
        A community of artists and art-lovers.
      </p>
    </header>
  );
}
