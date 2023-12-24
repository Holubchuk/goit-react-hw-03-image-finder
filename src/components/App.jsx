import css from './App.module.css';
import Notiflix from 'notiflix';
import React, { Component } from 'react';

import { requestPhotos } from 'services/api';
import { STATUSES } from 'services/constants';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    photos: null,
    status: STATUSES.idle,
    error: null,
    page: 1,
    searchValue: '',
    selectedImage: null,
  };

  featchPhotosByQuery = async searchValue => {
    try {
      this.setState({ status: STATUSES.pending });
      const photos = await requestPhotos(searchValue);
      this.setState({ photos, status: STATUSES.success });
    } catch (error) {
      this.setState({ status: STATUSES.error, error: error.message });
      Notiflix.Notify.failure(
        'Oops! Something went wrong. Please try again later'
      );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.featchPhotosByQuery(this.state.searchValue);
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const searchValue = e.currentTarget.elements.search.value;

    this.setState({ searchValue }, () => {
      e.target.reset();
    });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar handleSubmit={this.handleSubmit} />
        {this.state.status === STATUSES.pending && <Loader />}
        {this.state.status === STATUSES.success && (
          <ImageGallery photos={this.state.photos} />
        )}
      </div>
    );
  }
}
