# Outlook OAuth Redirect URI Type: Web vs SPA vs Public

## Answer: Use **"Web"**

For your MCP server, choose **"Web"** as the redirect URI platform type.

---

## Why "Web"?

Your MCP server is a **server-side application** that:
- Runs on Node.js/Express
- Handles OAuth callbacks on the server
- Processes the authorization code server-side
- Exchanges the code for tokens server-side

This is a **Web** application, not a Single Page Application (SPA) or Public client.

---

## Platform Types Explained

### ✅ Web (Correct for MCP Server)
- **Use for**: Server-side applications (Node.js, Python, PHP, etc.)
- **How it works**: Server handles the OAuth callback
- **Redirect URI**: `http://localhost:4000/auth/outlook/callback`
- **Token storage**: Server-side (secure)
- **Your case**: ✅ This is what you need!

### ❌ SPA (Single Page Application)
- **Use for**: Client-side JavaScript apps (React, Vue, Angular)
- **How it works**: Browser handles OAuth callback
- **Redirect URI**: Usually `http://localhost:3000` or similar
- **Token storage**: Browser (less secure)
- **Your case**: ❌ Not this - your server handles callbacks

### ❌ Public Client (Mobile/Desktop)
- **Use for**: Mobile apps, desktop apps
- **How it works**: App handles OAuth callback
- **Redirect URI**: Custom URI scheme (e.g., `myapp://callback`)
- **Token storage**: Device
- **Your case**: ❌ Not this - you're building a web server

---

## How to Set It Up in Azure Portal

1. Go to **App registrations** → Your app
2. Click **"Authentication"** in the left sidebar
3. Under **"Platform configurations"**, click **"+ Add a platform"**
4. Select **"Web"**
5. Enter redirect URI: `http://localhost:4000/auth/outlook/callback`
6. Click **"Configure"**

---

## Visual Guide

**In Azure Portal:**
```
Platform configurations
└── Web
    └── Redirect URIs:
        └── http://localhost:4000/auth/outlook/callback
```

**NOT:**
- ❌ Single-page application
- ❌ Public client/native
- ❌ Mobile

---

## Summary

- **Platform Type**: **Web** ✅
- **Redirect URI**: `http://localhost:4000/auth/outlook/callback`
- **Why**: Your MCP server is a server-side application

---

**Last Updated:** December 8, 2024

