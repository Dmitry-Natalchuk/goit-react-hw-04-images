import PropTypes from 'prop-types'
import s from "./ImageGalleryItem.module.css"


export const ImageGalleryItem = ({img,onClick}) => {
    const { largeImageURL, webformatURL} = img;
    return(<li className={s.imageGalleryItem}>
            <img className={s.imageGalleryItemImage} 
            src={webformatURL} 
            alt="" 
            onClick={() => onClick(largeImageURL)} />
        </li>)
}

ImageGalleryItem.propTypes = {
    items: PropTypes.exact({
        webformatURL: PropTypes.string,
        tag: PropTypes.string,
        largeImageURL: PropTypes.string,
    }),
    onClick: PropTypes.func,
};