import { clerkClient } from "@clerk/express";
import { decodeJwt } from "@clerk/backend/jwt";

/**
 * Extracts the userId from the request, handling the cross-origin JWT
 * expiration issue. First tries req.auth(), then falls back to manually
 * decoding the Bearer token from the Authorization header.
 */
export const getUserId = (req) => {
    // First try the standard req.auth() flow
    const authData = req.auth();
    let userId = authData?.userId;

    // If req.auth() didn't resolve a userId (e.g. expired short-lived JWT
    // in a cross-origin setup without refresh cookies), fall back to
    // manually decoding the Bearer token from the Authorization header.
    if (!userId) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            try {
                const decoded = decodeJwt(token);
                userId = decoded.payload.sub;
            } catch (decodeErr) {
                console.error("[getUserId] Failed to decode JWT:", decodeErr.message);
            }
        }
    }

    return userId || null;
};

export const protectAdmin = async (req, res, next) => {
    try {
        const userId = getUserId(req);

        if (!userId) {
            return res.json({ success: false, message: "not authorized" });
        }

        // Verify the user exists in Clerk and check admin role
        const user = await clerkClient.users.getUser(userId);

        if (user.privateMetadata.role !== "admin") {
            return res.json({ success: false, message: "not authorized" });
        }

        next();
    } catch (error) {
        console.error("[protectAdmin] Error:", error.message);
        return res.json({ success: false, message: "not authorized" });
    }
};