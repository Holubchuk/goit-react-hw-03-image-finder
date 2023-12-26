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
    photos: null,
    status: STATUSES.idle,
    error: null,
    page: 1,
    searchValue: '',
    isOpenModal: false,
    modalData: null,
  };

  featchPhotosByQuery = async (searchValue, page) => {
    try {
      this.setState({ status: STATUSES.pending });
      const photos = await requestPhotos(searchValue, page);
      const nextPage = this.state.page + 1;
      this.setState({ photos, status: STATUSES.success, page: nextPage });
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
      this.featchPhotosByQuery();
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const searchValue = e.currentTarget.elements.search.value;

    this.setState({ searchValue, page: 1 }, () => {
      e.target.reset();
    });
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

  handleLoadMoreClick = () => {
    this.featchPhotosByQuery(this.state.searchValue, this.state.page);
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar handleSubmit={this.handleSubmit} />
        {this.state.status === STATUSES.pending && <Loader />}
        {this.state.status === STATUSES.success && (
          <ImageGallery
            photos={this.state.photos}
            handleOpenModal={this.handleOpenModal}
          />
        )}
        <Button />

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
