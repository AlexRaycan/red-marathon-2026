export const AUTH_CONTENT = {
  login: {
    title: 'Welcome Back!',
    submit: 'Log in',
    pending: 'Logging in...',
    footerText: `Don't have an account?`,
    footerAction: 'Sign up',
    footerHref: '/register'
  },
  register: {
    title: 'Create Account',
    submit: 'Sign up',
    pending: 'Signing up...',
    footerText: `Already have an account?`,
    footerAction: 'Log in',
    footerHref: '/login'
  }
} as const
