# Database Connection Fix

## Issue
The database connection is failing with the error:
```
Can't reach database server at `ep-floral-recipe-ahrk4y1v-pooler.c-3.us-east-1.aws.neon.tech:5432`
```

## Root Cause
The `channel_binding=require` parameter in your DATABASE_URL can cause connection issues with some Neon database configurations.

## Solution

### Update your .env file

Replace this line in your `.env` file:
```
DATABASE_URL=postgresql://neondb_owner:npg_B6cTisxU8mhC@ep-floral-recipe-ahrk4y1v-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

With this (remove `&channel_binding=require`):
```
DATABASE_URL=postgresql://neondb_owner:npg_B6cTisxU8mhC@ep-floral-recipe-ahrk4y1v-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## Steps to Fix

1. **Open your `.env` file**

2. **Update the DATABASE_URL** - Remove `&channel_binding=require` from the end

3. **Regenerate Prisma Client**
   ```bash
   npx prisma generate
   ```

4. **Restart your development server**
   ```bash
   npm run dev
   ```

## Alternative: Use Direct Connection URL

If the pooler connection still doesn't work, try using the direct connection URL from Neon:

1. Go to your Neon dashboard
2. Navigate to your database
3. Copy the **Direct connection string** (not the pooled one)
4. Update your `.env` file with the direct URL

## Verify Connection

After making changes, test the connection:

```bash
npx prisma db pull
```

If successful, you should see:
```
✔ Introspected 2 models and wrote them into prisma/schema.prisma
```

## Common Issues

### Issue: Still can't connect
- **Solution**: Check if your IP is whitelisted in Neon dashboard
- Neon may require IP whitelisting for connections

### Issue: SSL/TLS errors
- **Solution**: Try changing `sslmode=require` to `sslmode=prefer`

### Issue: Authentication failed
- **Solution**: Verify your password doesn't have special characters that need URL encoding
- Use Neon dashboard to reset the password if needed

## Need More Help?

1. Check Neon status page: https://neon.tech/status
2. Verify your database is not paused (Neon auto-pauses inactive databases)
3. Check Neon dashboard for any alerts or notifications
