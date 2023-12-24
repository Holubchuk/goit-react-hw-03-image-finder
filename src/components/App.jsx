import css from './App.module.css'
import { requestPhotos } from 'services/api';


import React, { Component } from 'react'

export class App extends Component {

  componentDidMount() {
    requestPhotos()
  }

  render() {
    return (
      <div>App</div>
    )
  }
}
