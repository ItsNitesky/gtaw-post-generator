import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { DISCORD_CONFIG } from "@/lib/auth/discord";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: DISCORD_CONFIG.clientId,
      clientSecret: DISCORD_CONFIG.clientSecret,
      authorization: {
        params: {
          scope: "identify guilds guilds.members.read",
          redirect_uri: undefined,
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider !== "discord") return false;

      try {
        // Fetch user's guild member data
        const response = await fetch(
          `https://discord.com/api/v10/users/@me/guilds/${DISCORD_CONFIG.serverId}/member`,
          {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
            },
          }
        );

        if (!response.ok) {
          // Silent fail for invalid Discord response
          return false;
        }

        const guildMember = await response.json();

        // Check if user has any of the allowed roles
        const hasAllowedRole = guildMember.roles.some((roleId: string) =>
          DISCORD_CONFIG.allowedRoleIds.includes(roleId)
        );

        return hasAllowedRole;
      } catch {
        return false;
      }
    },
  },
  debug: true,
  pages: {
    signIn: "/",
    error: "/",
  },
});

export { handler as GET, handler as POST };