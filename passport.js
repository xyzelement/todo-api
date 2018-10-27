const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const LocalStrategy = require("passport-local").Strategy;

const { JWT_SECRET } = require("./configuration");
const User = require("./models/user");

//Note this file doesn't just define a class but rather teaches
//passport this instance of the jwt authentication strategy.
//Then in routes we will simply protect our resources with
//passport.authenticate('jwt') and that will leverage this code.
passport.use(
  new JwtStrategy(
    {
      /* strategy is basically:
          1. where do we find the token? in this case from
          the authorization part of the header, prefixed w. "jwt"
          2. Our Secret that's used to decode it */
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      // I guess this gets called if the strategy
      // succeeds in extracting the token. Token
      // gets passed into here as payload
      try {
        // find the user formthe token
        // TODO: for now that's email, later ID
        // TODO: may want to check token's expiration
        const email = payload.sub;
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false); //no error but no user
        }
        done(null, user); //no error and user
      } catch (error) {
        done(error, false); //error and no user
      }
    }
  )
);

//This is for the local strategy stuff
passport.use(
  new LocalStrategy(
    {
      // Now want to figure out - what's our user name?
      // By default this assumes we want userName and Passport
      // so change to our names:
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // find user by email
        const user = await User.findOne({ email });

        // Handle if not
        if (!user) {
          return done(null, false); // no error but no user
        }

        // Check if the password matches
        const match = await user.checkPassword(password);

        // Handle if not
        if (!match) {
          return done(null, false); // no error but no user
        }
        // Return the user
        done(null, user); // no error, yes user
      } catch (error) {
        done(error, false);
      }
    }
  )
);
