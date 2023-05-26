import "../../css/contentPage.css"

export default function Welcome({ username }) {

  return (
    <div className="contentDiv">
      <p className="contentTitle">{username}, witaj w SUS!</p>
    </div>
  );
}