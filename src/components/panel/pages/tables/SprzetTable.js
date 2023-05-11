import Cross from "../../Cross";
import Checkmark from "../../Checkmark";
import TableAccordion from "../../../TableAccordion";

function SprzetHeader() {
  const headers =
    ["ID", "Nazwa", "Ilość", "Status", "Kategoria", "Stan", "Lokalizacja",
      "Właściciel", "Użytkownik", "Opis", "Zdjęcie", "OG ID"];
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

    {Object.entries(object).map(([key, value]) =>
      <td key={object["przedmiot_id"] + key}>
        {value}
      </td>)}

  </>)
}
function SprzetRowAccordionContent({ object }) {
  return (<>
    {/*<p>{`Adres e-mail: ${object.adres_email ? object.adres_email : "-"}`}</p>*/}
  </>)

}
export default function SprzetTable({ array }) {

  return (
    <table id="sprzetTable">
      <SprzetHeader/>
      <tbody>
      {array.map(row => <TableAccordion
        triggerContent={<SprzetRowCells object={row}/>}
        colSpan={12}
        Key={row.username}
        key={row.username}
      >
        <SprzetRowAccordionContent object={row}/>
      </TableAccordion>)}
      </tbody>
    </table>
  )
}