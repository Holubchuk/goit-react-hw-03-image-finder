import css from './Searchbar.module.css'
import { FaSearch } from "react-icons/fa";



export const Searchbar = ({handleSubmit}) => {
  return (
    <header className={css.searchbar}>
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <button type="submit" className={css.searchFormButton}>
        <span><FaSearch /></span>
      </button>

      <input
        className={css.searchFormInput}
        name="search"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        required
      />
    </form>
  </header>
  )
}
