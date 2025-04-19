import api from '@/api/api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials } from '../types/api.types';

export const LoginPage: React.FC = () => {
	const [credentials, setCredentials] = useState<LoginCredentials>({
		email: '',
		password: '',
	});
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await api.auth.login(credentials);
			login(response.token, response.user);
			navigate('/');
		} catch (err) {
			setError('Ошибка при входе');
		}
	};

	return (
		<div className="auth-form">
			<h1>Вход</h1>
			{error && <div className="error">{error}</div>}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						value={credentials.email}
						onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Пароль</label>
					<input
						id="password"
						type="password"
						value={credentials.password}
						onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
					/>
				</div>
				<button type="submit">Войти</button>
			</form>
			<div className="auth-links">
				Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
			</div>
		</div>
	);
}; 