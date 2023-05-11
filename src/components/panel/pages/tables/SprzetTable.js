import Cross from "../../Cross";
import Checkmark from "../../Checkmark";
import TableAccordion from "../../../TableAccordion";

function SprzetHeader() {
  const headers = ["Nazwa", "Ilość", "Status", "Stan"];
  return (
    <thead>
    <tr id="tableHeaderRow">
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
function SprzetRowAccordionContent({ object }) {
  return (<>
    <p>{`Status: ${object["status"]}`}</p>
    <p>{`Kategoria: ${object["kategoria"]}`}</p>
    <p>{`Stan: ${object["stan"]}`}</p>
    <p>{`Lokalizacja: ${object["lokalizacja"]}`}</p>
    <p>{`Właściciel: ${object["wlasciciel"]}`}</p>
    <p>{`Użytkownik: ${object["uzytkownik"]}`}</p>
    <p>{`Opis: ${object["opis"]}`}</p>
    <p>{`Zdjęcie: ${object["zdjecie_path"]}`}</p>
    <p>{`OG ID: ${object["og_id"]}`}</p>
  </>)

}
export default function SprzetTable({ array }) {

  return (
    <table id="sprzetTable">
      <SprzetHeader/>
      <tbody>
      {array.map(row => <TableAccordion
        triggerContent={<SprzetRowCells object={row}/>}
        colSpan={4}
        Key={row.username}
        key={row.username}
      >
        <SprzetRowAccordionContent object={row}/>
      </TableAccordion>)}
      </tbody>
    </table>
  )
}