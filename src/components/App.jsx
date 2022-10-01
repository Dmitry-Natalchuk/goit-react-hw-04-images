import { useState,useEffect } from "react";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { galleryApi } from "../helpers/galleryAPI"
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button"; 
import { Searchbar } from "./Searchbar/Searchbar"; 


export const  App = () => {
  const [page,setPage] = useState(1);
  const [queryInput,setQueryInput] = useState("")
  const [gallery,setGallery] = useState([])
  const [modalGallery,setModalGallery] = useState("")
  const [isLoading,setIsLoading] = useState(false)


  useEffect(() => {
    if(setPage !== page || setQueryInput !== queryInput){
      itemImgGallery(queryInput,page)
    }
  },[queryInput,page])

 const onOpenModal = (img) => {
    setModalGallery(img)
  };

 const onModalClose = () => {
    setModalGallery("")
  };

 const formSubmit = (queryInput) => {
    if (queryInput.trim().length === 0) {
      return toast.warn('The search string cannot be empty. Please specify your search query.')
    }
    setQueryInput("");
    setPage(1);
    setGallery([]);
    }

 const itemImgGallery = async (query, page) => {
    try {
      setIsLoading(true);
      const list = await galleryApi(query,page)
      if(list.length === 0 ) {
        return toast.error('Sorry, there are no images matching your search query. Please try again.')
      }
      setGallery(prevGallery => [...prevGallery, ...list]);
      setIsLoading(false);
      }
      catch(error) {
      console.log(error.message)
    }
    finally {
      setIsLoading(false);
    };
  };

 const onLoadMore = () => {
  setPage(prevPage => prevPage + 1)
  }
  
    return  (
      <>
    <Searchbar  onSubmit={formSubmit} isLoading={isLoading}/>
    {gallery.length > 0 && <ImageGallery image={gallery} onClick={onOpenModal}/>}
    {isLoading && <Loader/>}
    {gallery.length > 0 && <Button onLoadMore= {onLoadMore} isLoading={isLoading}/>}
    {modalGallery && <Modal showModal={onModalClose} url={modalGallery}/>} 
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
};
