import { Suspense } from 'react';
import LoginPage from '../templates/LoginPage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginPage />
    </Suspense>
  );
}
