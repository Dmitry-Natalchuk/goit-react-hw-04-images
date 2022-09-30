import PropTypes from 'prop-types';
import s from "./Button.module.css"


export const Button = ({onLoadMore, isLoading}) => {

    return(
        <button className={s.button}
        type='button' 
        onClick={onLoadMore} 
        disabled={isLoading}>
           Load more
        </button>
    )
}
Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };