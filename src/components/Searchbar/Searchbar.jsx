import { useState} from 'react';
import { FcSearch } from "react-icons/fc";
import s from "./Searchbar.module.css"
import PropTypes from 'prop-types';

export const Searchbar = ({isLoading,onSubmit}) => {
    const [queryInput,setQueryInput] = useState("");

    const changInput = (event) => {
        setQueryInput(event.target.value)
    }

    return (
        <header className={s.searchbar}>
            <form className={s.searchForm} onSubmit={(event) => {
                event.preventDefault()
                onSubmit(queryInput)
                setQueryInput("")
            }}>
                <input
                className={s.searchFormInput}
                type="text"
                value={queryInput}
                onChange = {changInput}
                autoFocus
                placeholder="Search images and photos"
                />
                 <button type="submit" 
                className={s.searchFormButton}
                disabled = {isLoading}>
                    <FcSearch/>
                </button>
            </form>
        </header>
    )
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading : PropTypes.bool.isRequired,
}