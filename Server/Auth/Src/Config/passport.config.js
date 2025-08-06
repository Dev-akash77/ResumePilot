// ! config and basic setup of passport js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

export const passport_config = () => {
  //! GOOGLE STRATEGY
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}${process.env.GOOGLE_CALLBACK_URL}`,
      },
      (_, __, profile, callback) => {
        callback(null, profile);
      }
    )
  );

  //! GITHUB STRATEGY
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}${process.env.GITHUB_CALLBACK_URL}`,
      },
      (accessToken, __, profile, callback) => {
        profile.accessToken = accessToken;
        callback(null, profile);
      }
    )
  );
};
