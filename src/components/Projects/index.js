import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ProjectItem from '../ProjectItem'

import ProjectItemOption from '../ProjectItemOption'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Projects extends Component {
  state = {
    id: categoriesList[0].id,
    projectsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProjectsData()
  }

  getProjectsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {id} = this.state
    const projectsApiUrl = `https://apis.ccbp.in/ps/projects?category=${id}`
    const options = {
      method: 'GET',
    }
    const projectsResponse = await fetch(projectsApiUrl, options)
    if (projectsResponse.ok === true) {
      const projectsData = await projectsResponse.json()
      const updatedData = projectsData.projects.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        imageUrl: eachData.image_url,
      }))
      this.setState({
        projectsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  retry = () => {
    this.getProjectsData()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <h1 className="error-message">Oops! Something Went Wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png "
        alt="failure view"
      />
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  changeSortBy = id => {
    this.setState({id}, this.getProjectsData)
  }

  renderProjectListView = () => {
    const {projectsData, id} = this.state
    return (
      <>
        <>
          <ProjectItemOption
            id={id}
            categoriesList={categoriesList}
            changeSortBy={this.changeSortBy}
          />
        </>
        <ul>
          {projectsData.map(eachProject => (
            <ProjectItem key={eachProject.id} projectDetails={eachProject} />
          ))}
        </ul>
      </>
    )
  }

  renderProjectDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjectListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png "
          alt="website logo"
        />

        {this.renderProjectDetails()}
      </div>
    )
  }
}

export default Projects
