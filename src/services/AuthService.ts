import {useRouter} from "vue-router";

export function isAuthenticated() {
  return !!localStorage.getItem('access_token');
}

export function isAdmin() {
  return localStorage.getItem('user_type') === 'admin';
}

export const redirectToLogin = () => {
  const router = useRouter();
  console.log('Attempting to redirect to login');
  if (router) {
    router.push('/login').catch(err => console.error('Redirect failed:', err));
  } else {
    console.error('Router is not available.');
  }

  console.log('Redirecting to login');

  router.push('/login');
};
