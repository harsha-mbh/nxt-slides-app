import './index.css'

const SlideItem = props => {
  const {slide, changeActiveSlide, activeSlideId, index} = props
  const {heading, description, id} = slide
  console.log(activeSlideId)
  const activeTab = activeSlideId === id ? 'active' : ''
  const onChangeActiveSlide = () => {
    changeActiveSlide(id)
  }
  return (
    <li
      testid={`slideTab${index + 1}`}
      className={`slide-item ${activeTab}`}
      onClick={onChangeActiveSlide}
    >
      <p>{index + 1}</p>
      <div className="slide-card">
        <h1 className="slide-heading">{heading}</h1>
        <p className="slide-description">{description}</p>
      </div>
    </li>
  )
}

export default SlideItem
