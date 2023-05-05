import Cross from "../../Cross";
import Checkmark from "../../Checkmark";
import TableAccordion from "../../TableAccordion";

function UsersHeader() {
  const headers = ["Nazwa", "Admin", "Aktywne"];
  return (
    <thead>
      <tr id="tableHeaderRow">
        {headers.map(header => <th key={header}>{header}</th>)}
      </tr>
    </thead>
  )
}
function UsersRowCells({ object }) {
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
function UsersRowAccordionContent({ object }) {
  return (<>
    <p>{`Adres e-mail: ${object.adres_email ? object.adres_email : "-"}`}</p>
    <p>{`Data wygaśnięcia: ${object.data_wygasniecia ? 
      new Date(object.data_wygasniecia).toLocaleDateString() 
      : "-"}`}
    </p>
  </>)

}
export default function UsersTable({ array }) { // TODO add keys

  return (
    <table id="usersTable">
      <UsersHeader/>
      <tbody>
      {array.map(row => <TableAccordion
        triggerContent={<UsersRowCells object={row}/>}
        panelContent={<UsersRowAccordionContent object={row}/>}
        colSpan={3}
        Key={row.username}
        key={row.username}
      />)}
      </tbody>
    </table>
  )
}