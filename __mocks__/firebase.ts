import app from 'firebase/app';
import 'firebase/auth';

interface User {
  email: string,
  password: string
}

export default class Firebase {
  private user: User
  private currentUser: () => User;
  private createUserWithEmailAndPassword: (email: string, password: string) => Promise<{ user: User }>;
  private signInWithEmailAndPassword: (email: string, password: string) => Promise<{ user: User }>;
  private innerSignOut: () => void;
  private sendPasswordResetEmail: (email: string) => Promise<boolean>;

  constructor() {
    this.user = {
      email: '',
      password: ''
    }
    this.currentUser = () => this.user;

    this.createUserWithEmailAndPassword = (email: string, password: string) => {
      this.user.email = email;
      this.user.password = password;
      return new Promise(resolve => resolve({ user: this.user }));
    };
    this.signInWithEmailAndPassword = (email: string, password: string) => {
      this.user.email = email;
      this.user.password = password;
      return new Promise(resolve => resolve({ user: this.user }));
    };
    this.innerSignOut = () => {
      this.user.email = '';
      this.user.password = '';
    }
    this.sendPasswordResetEmail = (email: string) => new Promise(resolve => resolve(true));
  }

  /* Auth API */
  getCurrentUser = () => this.currentUser;
  
  onAuthStateChanged = (cb: any) => { 
    if (typeof cb === 'function') {
      cb();
    }
  };

  createUserWithEmailAndPW = (email: string, password: string) =>
    this.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPW = (email: string, password: string) =>
    this.signInWithEmailAndPassword(email, password);

  signOut = () => this.innerSignOut();

  pwReset = (email: string) => this.sendPasswordResetEmail(email);
}