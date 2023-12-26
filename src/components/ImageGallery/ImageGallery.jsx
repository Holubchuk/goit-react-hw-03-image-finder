import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ photos, handleOpenModal }) => {
  return (
    <ul className={css.imageGallery}>
      {Array.isArray(photos) &&
        photos.map(({ id, webformatURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              handleOpenModal={handleOpenModal}
              id={id}
            />
          );
        })}
    </ul>
  );
};
