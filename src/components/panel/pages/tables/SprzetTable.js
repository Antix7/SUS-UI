import Cross from "../../Cross";
import Checkmark from "../../Checkmark";
import TableAccordion from "../../../TableAccordion";

function SprzetHeader() {
  const headers = ["Nazwa", "Admin", "Aktywne"];
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
    <td key={object.username}>{object.username}</td>
    <td key={object.username + "_Admin"}>{object.czy_admin ? <Checkmark/> : <Cross/>}</td>
    <td key={object.username + "_Aktywne"}>{
      new Date() < new Date(object.data_wygasniecia) || object.data_wygasniecia===null ?
        <Checkmark/> :
        <Cross/>
    }</td>
  </>)
}
function SprzetRowAccordionContent({ object }) {
  return (<>
    <p>{`Adres e-mail: ${object.adres_email ? object.adres_email : "-"}`}</p>
    <p>{`Data wygaśnięcia: ${object.data_wygasniecia ?
      new Date(object.data_wygasniecia).toLocaleDateString('en-GB')
      : "-"}`}
    </p>
  </>)

}
export default function SprzetTable({ array }) {

  return (
    <table id="usersTable">
      <SprzetHeader/>
      <tbody>
      {array.map(row => <TableAccordion
        triggerContent={<SprzetRowCells object={row}/>}
        colSpan={3}
        Key={row.username}
        key={row.username}
      >
        <SprzetRowAccordionContent object={row}/>
      </TableAccordion>)}
      </tbody>
    </table>
  )
}