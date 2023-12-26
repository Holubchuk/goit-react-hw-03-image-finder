import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {

    
  handleOverlayClick = (event) => {
    if(event.target === event.currentTarget) {
      this.props.handleCloseModal();
    }
  }

  handleKeyPress = (event) => {
    if(event.code === "Escape") {
      this.props.handleCloseModal();
    }
  }

  componentDidMount() {
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";

    window.removeEventListener("keydown", this.handleKeyPress)
  }


  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img src={this.props.modalData.largeImageURL} alt={this.props.modalData.tags} />
        </div>
      </div>
    );
  }
}
