const projectItemOption = props => {
  const {changeSortBy, id, categoriesList} = props

  const onChangeSortBy = event => {
    changeSortBy(event.target.value)
  }

  return (
    <select
      className="sort-by-select"
      id={id}
      value={id}
      onChange={onChangeSortBy}
    >
      {categoriesList.map(eachOption => (
        <option
          key={eachOption.id}
          value={eachOption.id}
          className="select-option"
        >
          {eachOption.displayText}
        </option>
      ))}
    </select>
  )
}

export default projectItemOption
