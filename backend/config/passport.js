import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/userSchema.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    const displayName = profile.displayName || "";
                    const nameParts = displayName.split(" ");

                    const firstName = profile.name?.givenName || nameParts[0] || "User";
                    const lastName = profile.name?.familyName || (nameParts.length > 1 ? nameParts.slice(1).join(" ") : "User");

                    user = await User.create({
                        googleId: profile.id,
                        firstName,
                        lastName,
                        email: profile.emails?.[0]?.value,
                        photo: profile.photos?.[0]?.value,
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
