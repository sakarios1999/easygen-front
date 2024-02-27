/**
 * This interface is for the initial state of the feature slice
 */
export interface Login {
  /** User's email or phone number */
  username: string | undefined;

  /** User's Json Web Token used to authenticate session */
  token: string | undefined;

  /** User's Refresh Token used to request a new access token if expired */

  /** Login status */
  isLoggedIn: boolean;


  email: string | undefined;
}

export interface SignIn {
  /** User's email or phone number */
  email: string;

  /** User's password */
  password: string;
}

export interface SignUp {
  //** User's name */
  name: string;

  /** User's email or phone number */
  email: string;

  /** User's password */
  password: string;
}
