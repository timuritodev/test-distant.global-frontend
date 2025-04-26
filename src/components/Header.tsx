import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NotificationBell } from './NotificationBell';

export const Header: React.FC = () => {
	const { user, logout } = useAuth();

	return (
		<header className="header">
			<div className="header-container">
				<Link to="/" className="logo">
					Новости
				</Link>
				<nav className="nav">
					{user ? (
						<>
							<Link to="/create">Создать статью</Link>
							<NotificationBell />
							<button onClick={logout} className="logout-button">
								Выйти
							</button>
						</>
					) : (
						<>
							<Link to="/login">Войти</Link>
							<Link to="/register">Регистрация</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};
