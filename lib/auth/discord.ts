export const DISCORD_CONFIG = {
  clientId: process.env.DISCORD_CLIENT_ID!,
  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  serverId: process.env.DISCORD_SERVER_ID!,
  allowedRoleIds: process.env.DISCORD_ALLOWED_ROLE_IDS?.split(',') || [],
};