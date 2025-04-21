import styles from './Search.module.css';
import { forwardRef } from 'react';
import cn from 'classnames';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({ className, isValid = true, id = 'search', ...props }, ref) {
    return (
        <div className={styles['input-wrapper']}>
            <input
                {...props}
                id={id}
                ref={ref}
                className={cn(styles['input'], className, { [styles['invalid']]: isValid })}
            />
            <label htmlFor={id}>
                <img
                    className={styles['icon']}
                    src="/search-icon.svg"
                    alt="Иконка лупы" />
            </label>
        </div>
    );
});

export default Search;   