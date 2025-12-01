

export interface Station {
  id: string;
  name: string;
  translationKey?: string;
  distance: string;
  line?: string;
  isFavorite: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  translationKey?: string;
  type: AmenityType;
  distance: string;
  status: 'Open Now' | 'Closed';
  rating: number;
  reviews: number;
  description?: string;
  image?: string;
  coordinates: { x: number; y: number };
}

export enum AmenityType {
  FOOD = 'Food & Dining',
  RESTROOM = 'Restroom',
  ATM = 'ATM',
  SHOP = 'Retail & Shops',
  WAITING = 'Waiting Room',
  TICKET = 'Ticket Counter',
  INFO = 'Information',
}

export type ScreenName = 
  | 'language-init'
  | 'onboarding' 
  | 'login' 
  | 'otp' 
  | 'permissions' 
  | 'home' 
  | 'map' 
  | 'favorites' 
  | 'settings'
  | 'profile'
  | 'feedback'
  | 'about'
  | 'facility-detail'
  | 'navigation'
  | 'facility-list-view'
  | 'chat'
  | 'notifications'
  | 'station-list';

export interface User {
  name: string;
  id: string;
  mobile: string;
  email: string;
  avatarUrl: string;
}

export interface AppSettings {
  language: string;
  theme: 'light' | 'dark' | 'system';
  accessibilityEnabled: boolean;
  voiceAssistant: boolean;
}

export interface Translation {
  // General
  goodMorning: string;
  whereTo: string;
  searchPlaceholder: string;
  nearby: string;
  seeAll: string;
  recent: string;
  favorites: string;
  home: string;
  map: string;
  saved: string;
  settings: string;
  aiHelp: string;
  navigate: string;
  findFacility: string;
  stationFacilities: string;
  preferences: string;
  language: string;
  appTheme: string;
  support: string;
  sendFeedback: string;
  helpAbout: string;
  account: string;
  logout: string;
  chooseLanguage: string;
  appearance: string;
  savedLocations: string;
  allSaved: string;
  stations: string;
  amenities: string;
  noSaved: string;
  tryFilters: string;
  recommendations: string;
  noStationsFound: string;
  lightMode: string;
  darkMode: string;
  systemDefault: string;
  allStationsTitle: string;
  
  // Categories
  catAll: string;
  catFood: string;
  catRestroom: string;
  catShop: string;
  catATM: string;
  catInfo: string;
  catCharging: string;
  catFoodStalls: string;
  catWaiting: string;
  catTicket: string;

  // Facility Detail
  facilityDetailTitle: string;
  openNow: string;
  closed: string;
  away: string;
  ratingsReviews: string;
  navigateButton: string;

  // Navigation
  navTitle: string;
  stepsTitle: string;
  navStep1: string;
  navStep1Desc: string;
  navStep2: string;
  navStep2Desc: string;
  navStep3: string;
  navStep3Desc: string;
  navHeavyCrowd: string;
  startNavigation: string;
  stopNavigation: string;
  navigationActive: string;

  // Onboarding
  onboardingTitle1: string;
  onboardingTitle2: string;
  onboardingSubtitle2: string;
  onboardingTitle3: string;
  onboardingSubtitle3: string;
  onboardingTitle4: string;
  onboardingSubtitle4: string;
  getStarted: string;
  next: string;

  // Auth
  secureLogin: string;
  enterMobileDesc: string;
  sendOtp: string;
  verifyOtp: string;
  enterCode: string;
  resendOtpIn: string;
  verifyAndProceed: string;
  enableNotif: string;
  enableNotifDesc: string;
  enableLoc: string;
  enableLocDesc: string;
  notNow: string;
  allowAccess: string;

  // Chat
  chatGreeting: string;
  chatPlaceholder: string;
  chatTrainResponse: string;
  chatFoodResponse: string;
  chatRestroomResponse: string;
  chatDefaultResponse: string;

  // Feedback
  feedbackTitle: string;
  feedbackIssue: string;
  tagBug: string;
  tagFeature: string;
  tagNav: string;
  tagAmenity: string;
  tagGeneral: string;
  tagOther: string;
  feedbackSubject: string;
  feedbackSubjectPlaceholder: string;
  feedbackDesc: string;
  feedbackDescPlaceholder: string;
  feedbackPhoto: string;
  feedbackContact: string;
  feedbackEmailPlaceholder: string;
  submitFeedback: string;
  feedbackSuccess: string;
  feedbackSuccessMsg: string;

  // Notifications
  notificationsTitle: string;
  markAllRead: string;
  today: string;
  yesterday: string;
  notifTrainDelayed: string;
  notifTrainDelayedMsg: string;
  notifPlatformChange: string;
  notifPlatformChangeMsg: string;
  notifWelcome: string;
  notifWelcomeMsg: string;
  notifTicketConfirmed: string;
  notifTicketConfirmedMsg: string;

  [key: string]: string;
}