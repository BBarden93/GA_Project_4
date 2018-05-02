import React from 'react'
import './Modal.css'

/*
  <Modal
    modalTitle={String}
    modalBody={String}
    onClose={Function}
  />
*/

class Modal extends React.Component {

  constructor() {
    super()
    this.handleEscKey = (evt) => {
      if(evt.key === 'Escape') this.props.onClose()
    }
    this.state = {
      modalClass: ""
    }
  }
  
  componentDidMount() {
    document.addEventListener('keyup', this.handleEscKey)
    setTimeout(() => {
      this.setState({
        modalClass: "entered"
      })
    })
  }
  
  componentWillUnmount() {
    // remove escape key listener before modal unmounts
    document.removeEventListener('keyup', this.handleEscKey)
  }

  render() {
    const props = this.props
    return (
      <div className="Modal entered">
        <div className="container">
          <button onClick={props.onClose}>X</button>
          <div className="title">
            <h1>{props.modalTitle}</h1>
          </div>
          <div className="body">
            <p>{props.modalBody}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal