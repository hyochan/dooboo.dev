import app from 'firebase/app';
import 'firebase/auth';

// process.env is not destructurable
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

export default class Firebase {
  private auth: app.auth.Auth;

  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
  }

  /* Auth API */
  getCurrentUser = () => this.auth.currentUser;
  
  onAuthStateChanged = (cb: any) => this.auth.onAuthStateChanged(cb);

  createUserWithEmailAndPW = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPW = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  pwReset = (email: string) => this.auth.sendPasswordResetEmail(email);
}