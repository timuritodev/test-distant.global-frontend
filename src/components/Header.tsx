import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export const Header: React.FC = () => {
	const { user, token, logout } = useContext(AuthContext) as AuthContextType;
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<header>
			<nav>
				<Link to='/'>Главная</Link>
				<Link to='/create'>Создать пост</Link>
				{token ? (
					<>
						<div className='user-info'>
							<span>{user?.username}</span>
							<button onClick={handleLogout}>Выйти</button>
						</div>
					</>
				) : (
					<Link to='/login'>Войти</Link>
				)}
			</nav>
		</header>
	);
}
