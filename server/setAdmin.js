import 'dotenv/config';
import { clerkClient } from "@clerk/express";

const identifier = process.argv[2];

if (!identifier) {
  console.log("Usage: node setAdmin.js <user_email_or_clerk_user_id>");
  process.exit(1);
}

async function makeAdmin() {
  try {
    let user;
    if (identifier.startsWith("user_")) {
      user = await clerkClient.users.getUser(identifier);
    } else {
      const usersList = await clerkClient.users.getUserList({
        emailAddress: [identifier],
      });
      if (usersList.data.length === 0) {
        throw new Error("No user found with email " + identifier);
      }
      user = usersList.data[0];
    }

    console.log(`Found user: ${user.firstName || ''} ${user.lastName || ''} (${user.id})`);
    
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        role: "admin",
      },
    });

    console.log("Success! Role 'admin' set in privateMetadata.");
  } catch (error) {
    console.error("Error setting admin role:", error.message || error);
  }
}

makeAdmin();
