import Cross from "../../Cross";
import Checkmark from "../../Checkmark";

function UsersHeader() {
  const headers = ["Nazwa", "Admin", "Aktywne"];
  return (
    <thead>
      <tr id="tableHeaderRow">
        {headers.map(header => <th>{header}</th>)}
      </tr>
    </thead>
  )
}
function UsersRow({ object }) {
  return (
    <tr>
      <td>{object.username}</td>
      <td>{object.czy_admin ? <Checkmark/> : <Cross/>}</td>
      <td>{new Date() < new Date(object.data_wygasniecia) || object.data_wygasniecia===null ? <Checkmark/> : <Cross/>}</td>
    </tr>
  )
}
export default function UsersTable({ array }) { // TODO add keys
  return (
    <table id="usersTable">
      <UsersHeader/>
      <tbody>
      {array.map(row => <UsersRow object={row}/>)}
      </tbody>
    </table>
  )
}