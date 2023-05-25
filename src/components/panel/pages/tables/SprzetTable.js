import Cross from "../../Cross";
import Checkmark from "../../Checkmark";
import TableAccordion from "../../../TableAccordion";

function SprzetHeader() {
  const headers = ["Nazwa", "Ilość", "Status", "Stan"];
  return (
    <thead>
    <tr id="tableHeaderRow" className="disableSelect">
      {headers.map(header => <th key={header}>{header}</th>)}
    </tr>
    </thead>
  )
}
function SprzetRowCells({ object }) {
  return (<>
    <td>{object["nazwa"]}</td>
    <td>{object["ilosc"]}</td>
    <td>{object["status"] === "Dostępny" ? <Checkmark/> : <Cross/>}</td>
    <td>{object["stan"] === "Dobry" || object["stan"] === "Nowy" ? <Checkmark/> : <Cross/>}</td>
  </>)
}
function SprzetRowAccordionContent({ object, handleUsun, handleEdytuj, handleZabierz, handleOdloz, handleZapomnij, handleShowZdjecie }) {
  return (<>
    <p><strong>Status: </strong>{object["status"]}</p>
    <p><strong>Kategoria: </strong>{object["kategoria"]}</p>
    <p><strong>Stan: </strong>{object["stan"]}</p>
    <p><strong>Lokalizacja: </strong>{object["lokalizacja"]}</p>
    {object["box_id"] && <p><strong>Numer pudła: </strong>{object["box_id"]}</p>}
    <p><strong>Właściciel: </strong>{object["wlasciciel"]}</p>
    <p><strong>Użytkownik: </strong>{object["uzytkownik"]}</p>
    {object["opis"] && <p><strong>Opis: </strong>{object["opis"]}</p>}
    {object["zdjecie_path"] && <p><strong>Zdjęcie: </strong>{object["zdjecie_path"]}</p>}
    <button type="button" className="smallButton" onClick={()=>handleShowZdjecie(object["ID"])}>
      Zdjęcie
    </button>
    <button type="button" className="smallButton" onClick={()=>handleEdytuj(object["ID"])}>Edytuj</button>
    <button type="button" className="smallButton" onClick={()=>handleUsun(object["ID"])}>
      {object["czy_usuniete"] ? "Przywróć" : "Usuń"}
    </button>

    <p>OG ID</p>
    {object["og_id"] && <p><strong>OG ID: </strong>{object["og_id"]}</p>}
    <button type="button" className="smallButton" disabled={!!object["og_id"]} onClick={()=>handleZabierz(object["ID"])}>Zabier</button>
    <button type="button" className="smallButton" disabled={!object["og_id"]} onClick={()=>handleOdloz(object["ID"])}>Oddej</button>
    <button type="button" className="smallButton" disabled={!object["og_id"]} onClick={()=>handleZapomnij(object["ID"])}>Zapomnir</button>
  </>)

}

export default function SprzetTable({ array, handleUsun, handleEdytuj, handleZabierz, handleOdloz, handleZapomnij, handleShowZdjecie }) {
  return (
    <table id="sprzetTable">
      <SprzetHeader/>
      <tbody>
      {array.map(row => <TableAccordion
        triggerContent={<SprzetRowCells object={row}/>}
        colSpan={4}
        Key={row["ID"]}
        key={row["ID"]+"_element"} // f u React
      >
        <SprzetRowAccordionContent
            object={row}
            handleUsun={handleUsun}
            handleEdytuj={handleEdytuj}
            handleZabierz={handleZabierz}
            handleZapomnij={handleZapomnij}
            handleOdloz={handleOdloz}
            handleShowZdjecie={handleShowZdjecie}
        />
      </TableAccordion>)}
      </tbody>
    </table>
  )
}