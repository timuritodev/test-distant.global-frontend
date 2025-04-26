import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CreatePostPage } from './pages/CreatePostPage';
import { EditPostPage } from './pages/EditPostPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import './styles/main.scss';

function App() {
	return (
		<AuthProvider>
			<NotificationProvider>
				<BrowserRouter>
					<div className="app-container">
						<Header />
						<main>
							<Routes>
								<Route path="/" element={<HomePage />} />
								<Route path="/login" element={<LoginPage />} />
								<Route path="/register" element={<RegisterPage />} />
								<Route path="/create" element={<CreatePostPage />} />
								<Route path="/edit/:id" element={<EditPostPage />} />
							</Routes>
						</main>
					</div>
				</BrowserRouter>
			</NotificationProvider>
		</AuthProvider>
	);
}

export default App; 