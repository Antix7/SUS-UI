import Cross from "../../Cross";
import Checkmark from "../../Checkmark";
import TableAccordion from "../../../TableAccordion";
import Mid from "../../Mid";

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
function UsersRowAccordionContent({ object, handleUsun }) {
  return (<>
    <p>{`Adres e-mail: ${object.adres_email ? object.adres_email : "-"}`}</p>
    <p>{`Data wygaśnięcia: ${object.data_wygasniecia ? 
      new Date(object.data_wygasniecia).toLocaleDateString('en-GB')
      : "-"}`}
    </p>
    <button type="button" className="smallButton" onClick={()=>handleUsun(object["username"])}>Usuń</button>
  </>)

}
export default function UsersTable({ array, handleUsun }) {

  return (
    <table id="usersTable">
      <UsersHeader/>
      <tbody>
      {array.map(row => <TableAccordion
        triggerContent={<UsersRowCells object={row}/>}
        colSpan={3}
        Key={row.username}
        key={row.username}
      >
        <UsersRowAccordionContent object={row} handleUsun={handleUsun}/>
      </TableAccordion>)}
      </tbody>
    </table>
  )
}