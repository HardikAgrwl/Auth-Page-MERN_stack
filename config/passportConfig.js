import passport from "passport";
import passportJwt from "passport-jwt";
import User from "../models/User.js";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
// const User = mongoose.model("users");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

const passportConfig = () => {
  opts.secretOrKey = process.env.SECRET_KEY;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};

export default passportConfig;
