import 'dotenv/config';
import { clerkClient } from "@clerk/express";

async function listUsers() {
  try {
    const users = await clerkClient.users.getUserList();
    console.log("Registered Clerk Users:");
    users.data.forEach(user => {
      console.log(`- Name: ${user.firstName || ''} ${user.lastName || ''}`);
      console.log(`  Email: ${user.emailAddresses.map(e => e.emailAddress).join(', ')}`);
      console.log(`  ID: ${user.id}`);
      console.log(`  Metadata: ${JSON.stringify(user.privateMetadata)}`);
      console.log('---');
    });
  } catch (error) {
    console.error("Error listing users:", error.message || error);
  }
  process.exit(0);
}

listUsers();
