import css from './ImageGalleryItem.module.css'


export const ImageGalleryItem = ({webformatURL, tags}) => {
  return (
    <li className={css.imageGalleryItem} >
    <img className={css.imageGalleryItemImage} src={webformatURL} alt={tags} />
  </li>
  )
}
