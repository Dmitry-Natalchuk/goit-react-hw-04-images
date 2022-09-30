import { Component } from 'react';
import { FcSearch } from "react-icons/fc";
import s from "./Searchbar.module.css"
import PropTypes from 'prop-types';

export class Searchbar extends Component {
    state = {
        queryInput: "",
    }

    changInput = (event) => {
        this.setState({ 
            queryInput: event.target.value,
        });
    }

    reset = () => {
        this.setState({ queryInput: "" });
      };

    render() {
    const {queryInput} = this.state
    const { isLoading,onSubmit } = this.props;
    return (
        <header className={s.searchbar}>
            <form className={s.searchForm} onSubmit={(event) => {
                event.preventDefault()
                onSubmit(queryInput)
                this.reset()
            }}>
                <input
                className={s.searchFormInput}
                type="text"
                value={queryInput}
                onChange = {this.changInput}
                autoFocus/* ={true} */
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
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading : PropTypes.bool.isRequired,
}