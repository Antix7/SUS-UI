import Cross from "../../Cross";
import Checkmark from "../../Checkmark";
import AccordionRow from "../../AccordionRow";

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
function UsersRowCells({ object }) {
  return ( <>
    <td>{object.username}</td>
    <td>{object.czy_admin ? <Checkmark/> : <Cross/>}</td>
    <td>{new Date() < new Date(object.data_wygasniecia) || object.data_wygasniecia===null ? <Checkmark/> : <Cross/>}</td>
  </>)
}
export default function UsersTable({ array }) { // TODO add keys

  function Junk() {
    return <div>dsdfsddsfdfsdfsdfsdfsfdsdfsdffgdhdfgjhkjlkuyjhgffdggfdfsfsdfsdf</div>
  }

  return (
    <table id="usersTable">
      <UsersHeader/>
      <tbody>
      {array.map(row => <AccordionRow colSpan={3} triggerContent={<UsersRowCells object={row}/>} accordionContent={<Junk/>} />)}
      </tbody>
    </table>
  )
}