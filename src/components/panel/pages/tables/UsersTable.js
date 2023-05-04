function UsersHeader() {
  const headers = ["Nazwa", "Admin", "Aktywne"];
  return (
    <thead>
      <tr>
        {headers.map(header => <th>{header}</th>)}
      </tr>
    </thead>
  )
}
function UsersRow({ object }) {
  return (
    <tr>
      <td>{object.username}</td>
      <td>{object.czy_admin ? "\u2714" : "\u2717"}</td>
      <td>{new Date() < new Date(object.data_wygasniecia) || object.data_wygasniecia===null ? "\u2714" : "\u2717"}</td>
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