import PropTypes from 'prop-types'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import s from "./ImageGallery.module.css"

export const ImageGallery = ({image,onClick}) => {
    return (<ul className={s.imageGallery}>
        {image.map(img => {
           return <ImageGalleryItem key={img.id} img={img} onClick={onClick} />
        })}

    </ul>)
}
ImageGallery.propTypes = {
    image: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
};