import express from "express";
import passport from "passport";

const router = express.Router();

// Initial Google Login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.FRONTEND_URL}/payment?success=true`,
        failureRedirect: `${process.env.FRONTEND_URL}/login/failed`,
    })
);

// Get Current User (Frontend calls this)
router.get("/me", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Not Authorized",
        });
    }
});

// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect(process.env.FRONTEND_URL);
    });
});

export default router;
