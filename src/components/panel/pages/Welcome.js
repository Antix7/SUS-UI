import "../../css/contentPage.css"

export default function Welcome({ username }) {

  return (
    <div className="contentDiv">
      <p className="contentTitle">{username}, witamy Cię w SUSie!</p>
      <p>
        Najpewniej jesteś tu, żeby dowiedzieć się czegoś na temat sprzętu,
        zatem otwórz menu hamburgerowe i wybierz opcję 'Wyświetl sprzęt'.
      </p>
      <p>
        Miłego przeglądania!
      </p>
    </div>
  );
}