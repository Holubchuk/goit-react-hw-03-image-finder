import css from './App.module.css';
import Notiflix from 'notiflix';
import React, { Component } from 'react';

import { requestPhotos } from 'services/api';
import { STATUSES } from 'services/constants';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    photos: [],
    status: STATUSES.idle,
    error: null,
    page: 1,
    searchValue: '',
    isOpenModal: false,
    modalData: null,
    onLoad: false,
  };

  featchPhotosByQuery = async (searchValue, page) => {
    try {
      this.setState({ status: STATUSES.pending });
      const { hits, totalHits } = await requestPhotos(searchValue, page);
      this.setState(prevState => ({
        photos: [...prevState.photos, ...hits],
        status: STATUSES.success,
        onLoad: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ status: STATUSES.error, error: error.message });
      Notiflix.Notify.failure(
        'Oops! Something went wrong. Please try again later'
      );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.featchPhotosByQuery(this.state.searchValue, this.state.page);
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const searchValue = e.currentTarget.elements.search.value;

    this.setState({ searchValue: searchValue, page: 1, photos: [] }, () => {
      e.target.reset();
    });
  };

  handleLodeMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = photoId => {
    const selectedPhoto = this.state.photos.find(photo => photo.id === photoId);
    this.setState({
      isOpenModal: true,
      modalData: selectedPhoto,
    });
  };

  handleCloseModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery
          photos={this.state.photos}
          handleOpenModal={this.handleOpenModal}
        />
        {this.state.status === STATUSES.pending && <Loader />}
        {this.state.onLoad && <Button handleLodeMore={this.handleLodeMore} />}
        {this.state.isOpenModal && (
          <Modal
            modalData={this.state.modalData}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
