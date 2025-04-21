import { Navigate, Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function AuthLayout() {
    const jwt = useSelector((s: RootState) => s.user.jwt);

    if (jwt) {
        return <Navigate to="/" replace />;
    }


    return (
        <div className={styles['layout']}>
            <div className={styles['logo']}>
                <img src="/logo.svg" alt="Логотип компании" />
            </div>
            <div className={styles['content']}>
                <Outlet />
            </div>
        </div>);
}