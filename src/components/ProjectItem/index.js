const ProjectItem = props => {
  const {projectDetails} = props
  const {imageUrl, name} = projectDetails
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default ProjectItem
