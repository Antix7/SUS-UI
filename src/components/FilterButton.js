import filterIcon from "../img/filter-icon.png";

export default function FilterButton({ onClick }) {
  return(
    <img
      className="filterButton"
      src={filterIcon}
      alt="filter"
      height={30} width={30}
      onClick={onClick}
    />
  )
}