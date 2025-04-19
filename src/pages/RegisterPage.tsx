import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { RegisterData } from '../types/api.types';

export const RegisterPage: React.FC = () => {
	const [formData, setFormData] = useState<RegisterData>({
		username: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await api.auth.register(formData);
			login(response.token, response.user);
			navigate('/');
		} catch (err) {
			setError('Ошибка при регистрации');
		}
	};

	return (
		<div className="auth-form">
			<h1>Регистрация</h1>
			{error && <div className="error">{error}</div>}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Имя пользователя</label>
					<input
						id="username"
						type="text"
						value={formData.username}
						onChange={(e) => setFormData({ ...formData, username: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Пароль</label>
					<input
						id="password"
						type="password"
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					/>
				</div>
				<button type="submit">Зарегистрироваться</button>
			</form>
			<div className="auth-links">
				Уже есть аккаунт? <Link to="/login">Войти</Link>
			</div>
		</div>
	);
}; 