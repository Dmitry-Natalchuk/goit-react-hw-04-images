import { Component } from "react";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {galleryApi} from "../helpers/galleryAPI"
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button"; 
import { Searchbar } from "./Searchbar/Searchbar"; 


export class App extends Component {
  state = {
    page : 1,
    queryInput: "",
    gallery : [],
    modalGallery : "",
    isLoading : false,
  }

  componentDidUpdate(_,prevState) {
    const {page,queryInput} = this.state
    if(prevState.page !== page || prevState.queryInput !== queryInput) {
      this.itemImgGallery(queryInput,page)
    }
  };

  onOpenModal = (img) => {
    this.setState({
      modalGallery : img,
    })
  };

  onModalClose = () => {
    this.setState({
      modalGallery : "",
    })
  };

  formSubmit = (queryInput) => {
    if (queryInput.trim().length === 0) {
      return toast.warn('The search string cannot be empty. Please specify your search query.')
    }
      this.setState({
        queryInput,
        page: 1,
        gallery: [],
      })
    }

  itemImgGallery = async (query, page) => {
    try {
      this.setState({
        isLoading : true,
      })
      const list = await galleryApi(query,page)
      if(list.length === 0 ) {
          return toast.error('Sorry, there are no images matching your search query. Please try again.')
      }
      this.setState(prevState => ({
        gallery : [...prevState.gallery, ...list],
        isLoading: false,
      }))
    }
    catch(error) {
      console.log(error.message)
    }
    finally {
      this.setState({
        isLoading : false,
      })
    }
  };
  onLoadMore = () => {
    this.setState(prevState => ({
      page : prevState.page + 1

    }))
  }
  

  render() {
    const {isLoading,gallery,modalGallery} = this.state
    return  (
      <>
    <Searchbar  onSubmit = {this.formSubmit} isLoading={isLoading}/>
    {gallery.length > 0 && <ImageGallery image={gallery} onClick={this.onOpenModal}/>}
    {isLoading && <Loader/>}
    {gallery.length > 0 && <Button onLoadMore= {this.onLoadMore} isLoading={isLoading}/>}
    {modalGallery && <Modal showModal = {this.onModalClose} url ={modalGallery}/>} 
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
    />
    </>
    )
   }
};
