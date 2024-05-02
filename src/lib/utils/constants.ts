/** Commonly referenced routes throughout the app */
export const commonRoutes = {
  login: "/auth/login",
  resetPassword: "/auth/reset-password",
  refreshSession: "/auth/session/refresh",
  emailExists: "/api/email-exists",
  logout: '/auth/logout',
  account: '/account',

  listing: '/listing',
  event: '/event',
  group: '/group',
  about: '/about',
  legal: '/legal',
  video: '/videos',

  register: '/register',
  registerListing: '/register/listing',
  registerEvent: '/register/event',
  registerGroup: '/register/group',
} as const;

/** Page routes related to authentication. */
export const authPages: string[] = [
  commonRoutes.login,
  commonRoutes.resetPassword,
  commonRoutes.refreshSession,
  commonRoutes.emailExists,
  commonRoutes.logout
];

interface NavPages {
  name: string,
  path: string,
  auth: boolean,
  enableHeader: boolean,
}

export const navPages: NavPages[] = [
  {name: 'Listing', path: commonRoutes.listing, auth: false, enableHeader: true},
  {name: 'Event', path: commonRoutes.event, auth: false, enableHeader: true},
  {name: 'Group', path: commonRoutes.group, auth: false, enableHeader: true},
  {name: 'Legal', path: commonRoutes.legal, auth: false, enableHeader: true},
  {name: 'Login', path: commonRoutes.login, auth: true, enableHeader: false},
  {name: 'Register', path: commonRoutes.register, auth: false, enableHeader: true},
  {name: 'Video', path: commonRoutes.video, auth: false, enableHeader: true},

] 
