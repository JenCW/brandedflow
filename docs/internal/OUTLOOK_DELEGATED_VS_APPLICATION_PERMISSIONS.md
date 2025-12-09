# Outlook API: Delegated vs Application Permissions

## Answer: Use **"Delegated Permissions"**

For Outlook email automation where you're sending emails from your own account, use **Delegated permissions**.

---

## Quick Answer

- **Delegated permissions** ✅ - App acts on behalf of the signed-in user (YOU)
- **Application permissions** ❌ - App acts as itself (not what you need)

---

## Delegated Permissions (What You Need)

### What It Means
- The app acts **on behalf of the signed-in user** (you)
- When you authenticate, the app uses YOUR Outlook account
- The app can send emails FROM your email address
- The app can read emails FROM your inbox

### When to Use
- ✅ Sending emails from your personal/work Outlook account
- ✅ Reading emails from your inbox
- ✅ Managing your calendar
- ✅ Any user-specific actions

### Your Use Case
- ✅ **You're sending emails to clients/leads**
- ✅ **Emails come from YOUR Outlook account**
- ✅ **You need user context** (which mailbox to use)

### Required Permissions
- `Mail.Read` - Read emails
- `Mail.Send` - Send emails
- `Mail.ReadWrite` - Read and write emails
- `User.Read` - Read your profile

---

## Application Permissions (NOT What You Need)

### What It Means
- The app acts **as itself** (not on behalf of a user)
- No user context - the app is the "user"
- Typically used for service-to-service scenarios
- Requires admin consent (more complex)

### When to Use
- ❌ Service accounts
- ❌ Background processes with no user
- ❌ App-specific mailboxes
- ❌ System-level operations

### Your Use Case
- ❌ **You're not building a service account**
- ❌ **You need to send from YOUR account**
- ❌ **You need user context**

---

## Visual Comparison

### Delegated Permissions Flow
```
You (User) → Authenticate → App gets YOUR token → Sends email FROM you
```

### Application Permissions Flow
```
App → Authenticates as itself → App gets ITS OWN token → Sends email FROM app
```

---

## How to Set It Up in Azure Portal

1. Go to **App registrations** → Your app
2. Click **"API permissions"**
3. Click **"+ Add a permission"**
4. Select **"Microsoft Graph"**
5. **Choose "Delegated permissions"** ← Select this!
6. Search for and add:
   - `Mail.Read`
   - `Mail.Send`
   - `Mail.ReadWrite`
   - `User.Read`
7. Click **"Add permissions"**
8. **IMPORTANT**: Click **"Grant admin consent"** button

---

## Summary

| Permission Type | Use For | Your Case |
|----------------|---------|-----------|
| **Delegated** ✅ | Acting on behalf of a user | ✅ **YES - Use this!** |
| **Application** ❌ | Acting as the app itself | ❌ No - Not what you need |

**For your email automation:**
- ✅ **Delegated permissions**
- ✅ App acts on YOUR behalf
- ✅ Sends emails FROM your Outlook account

---

## Common Mistakes

### ❌ Choosing "Application permissions"
- **Problem**: App can't access your mailbox
- **Why**: No user context
- **Fix**: Use Delegated permissions

### ❌ Not granting admin consent
- **Problem**: Permissions won't work
- **Why**: Need admin approval
- **Fix**: Click "Grant admin consent" button

### ❌ Missing `offline_access` scope
- **Problem**: Can't get refresh token
- **Why**: Need offline access for refresh tokens
- **Fix**: Include `offline_access` in OAuth scope

---

## OAuth Scope Example

When building the OAuth URL, include:
```
scope=Mail.Read Mail.Send Mail.ReadWrite User.Read offline_access
```

The `offline_access` is important for getting refresh tokens!

---

**Last Updated:** December 8, 2024

