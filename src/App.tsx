import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CreatePostPage } from './pages/CreatePostPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import './styles/main.scss';

function PrivateRoute({ children }: { children: React.ReactNode }) {
	const { user, token, loading } = useAuth();

	if (!token) {
		return <p>Требуется авторизация</p>;
		return;
	}

	// if (loading) {
	// 	return <div>Загрузка...</div>;
	// }

	return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div className="app-container">
					<Header />
					<main>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route
								path="/create"
								element={
									<PrivateRoute>
										<CreatePostPage />
									</PrivateRoute>
								}
							/>
						</Routes>
					</main>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App; 