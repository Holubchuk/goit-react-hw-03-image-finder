import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  handleOpenModal,
}) => {
  return (
    <li className={css.imageGalleryItem} onClick={() => handleOpenModal(id)}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};
