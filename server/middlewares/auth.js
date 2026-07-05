import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {

        console.log("AUTH START");

        const { userId, has } = await req.auth();

        console.log("USER ID:", userId);

        const hasPremiumPlan = await has({ plan: "premium" });

        console.log("PLAN:", hasPremiumPlan);

        const user = await clerkClient.users.getUser(userId);

        console.log("USER FOUND");

        if (!hasPremiumPlan && user.privateMetadata.free_usage) {
            req.free_usage = user.privateMetadata.free_usage;
        } else {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0,
                },
            });

            req.free_usage = 0;
        }

        req.plan = hasPremiumPlan ? "premium" : "free";

        console.log("AUTH SUCCESS");

        next();

    } catch (error) {

        console.log("AUTH ERROR");
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};