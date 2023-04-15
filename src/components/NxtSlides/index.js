import {Component} from 'react'
import {v4} from 'uuid'
import Header from '../Header'
import SlideItem from '../SlideItem'
import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class NxtSlides extends Component {
  state = {
    slidesList: initialSlidesList,
    activeSlideId: initialSlidesList[0].id,
    isHeadingEdit: false,
    isDescriptionEdit: false,
  }

  onClickChangeHeading = () =>
    this.setState(prevState => ({isHeadingEdit: !prevState.isHeadingEdit}))

  onClickChangeDescription = () =>
    this.setState(prevState => ({
      isDescriptionEdit: !prevState.isDescriptionEdit,
    }))

  onChangeHeading = event => {
    const {slidesList, activeSlideId} = this.state
    const updatedSlideList = slidesList.map(eachSlide => {
      if (eachSlide.id !== activeSlideId) {
        return eachSlide
      }
      const updatedSlide = {...eachSlide, heading: event.target.value}
      return updatedSlide
    })
    this.setState({slidesList: updatedSlideList})
  }

  onChangeDescription = event => {
    const {slidesList, activeSlideId} = this.state
    const updatedSlideList = slidesList.map(eachSlide => {
      if (eachSlide.id !== activeSlideId) {
        return eachSlide
      }
      const updatedSlide = {...eachSlide, description: event.target.value}
      return updatedSlide
    })
    this.setState({slidesList: updatedSlideList})
  }

  renderActiveSlide = () => {
    const {
      slidesList,
      activeSlideId,
      isHeadingEdit,
      isDescriptionEdit,
    } = this.state
    const activeSlideItem = slidesList.filter(
      eachSlide => eachSlide.id === activeSlideId,
    )
    return (
      <div className="active-slide-item">
        {isHeadingEdit === false ? (
          <h1
            className="active-slide-heading"
            onClick={this.onClickChangeHeading}
          >
            {activeSlideItem[0].heading}
          </h1>
        ) : (
          <input
            type="text"
            value={activeSlideItem[0].heading}
            onChange={this.onChangeHeading}
            onBlur={this.onClickChangeHeading}
            className="changing-input"
          />
        )}
        {isDescriptionEdit === false ? (
          <p
            className="active-slide-description"
            onClick={this.onClickChangeDescription}
          >
            {activeSlideItem[0].description}
          </p>
        ) : (
          <input
            type="text"
            value={activeSlideItem[0].description}
            onChange={this.onChangeDescription}
            onBlur={this.onClickChangeDescription}
            className="changing-input"
          />
        )}
      </div>
    )
  }

  changeActiveSlide = id => {
    this.setState({activeSlideId: id})
  }

  onAddNewSlide = () => {
    const {activeSlideId, slidesList} = this.state
    const newSlide = {
      id: v4(),
      heading: 'Heading',
      description: 'Description',
    }
    const indexOfActiveSlide = slidesList.findIndex(
      eachSlide => eachSlide.id === activeSlideId,
    )
    const newSlidesList = [...slidesList]
    newSlidesList.splice(indexOfActiveSlide + 1, 0, newSlide)
    this.setState({
      slidesList: newSlidesList,
      activeSlideId: newSlide.id,
    })
  }

  render() {
    const {slidesList, activeSlideId} = this.state
    return (
      <div className="content-container">
        <Header />
        <div className="btn-container">
          <button
            type="button"
            className="new-button"
            onClick={this.onAddNewSlide}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
              className="new-plus-icon"
            />
            New
          </button>
        </div>
        <div className="slides-container">
          <div className="slides-list-container">
            <ol className="slides-ordered-list">
              {slidesList.map(eachSlide => {
                const indexOfCurrentSlide = slidesList.findIndex(
                  searchSlide => searchSlide.id === eachSlide.id,
                )
                return (
                  <SlideItem
                    key={eachSlide.id}
                    slide={eachSlide}
                    activeSlideId={activeSlideId}
                    changeActiveSlide={this.changeActiveSlide}
                    index={indexOfCurrentSlide}
                  />
                )
              })}
            </ol>
          </div>
          <div className="active-slide-container">
            {this.renderActiveSlide()}
          </div>
        </div>
      </div>
    )
  }
}

export default NxtSlides
