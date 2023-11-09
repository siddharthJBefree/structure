export const APP_ROUTES = Object.freeze({
  login: '/auth',
  logout: '/auth/logout',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  termsAndCondition: '/auth/terms-and-condition',

  adminDashboard: '/admin',
  profile: '/admin/profile',
  designation: '/admin/designation',
  editDesignation: '/admin/designation/edit',
  signatureEmail: 'admin/signature-email-config/',
  addSignatureEmail: 'admin/signature-email-config/add-email-signature-configuration',
  manageUser: '/admin/manage-user',
  accountType: '/admin/account-type',
  bankInformation: '/admin/bank-information',
  befreeComments: '/admin/befree-comments',
  particularType: '/admin/particular-type',
  quoteGroup: '/admin/quote-group',
  quoteQuestion: '/admin/quote-question',
  addUser: '/admin/manage-user/add',
  updateUser: '/admin/manage-user/update',

  releaseNotes: '/release-notes',

  error401: '/error/401',
  error403: '/error/403',
  error404: '/error/404',
  error405: '/error/405',
  error408: '/error/408',
  error500: '/error/500'
});
