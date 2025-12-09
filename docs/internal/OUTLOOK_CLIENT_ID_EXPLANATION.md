# Outlook Client ID = Application ID

## Quick Answer

**Yes! The Client ID is the same as the Application ID.**

In Azure Portal, it's called **"Application (client) ID"** - but in OAuth terms, it's just called the **"Client ID"**. They're the same thing!

---

## Where to Find It

### In Azure Portal:
1. Go to **App registrations** → Your app
2. Click **"Overview"** (should be default page)
3. Look for **"Application (client) ID"**
4. That's your `OUTLOOK_CLIENT_ID`!

### Visual Guide:
```
Overview Page
├── Application (client) ID  ← This is your Client ID!
│   └── 12345678-1234-1234-1234-123456789abc
│
└── Directory (tenant) ID    ← This is your Tenant ID!
    └── 87654321-4321-4321-4321-cba987654321
```

---

## Different Names, Same Thing

Azure Portal uses different terminology, but they mean the same:

| Azure Portal Name | OAuth Name | Your .env Variable |
|------------------|------------|-------------------|
| **Application (client) ID** | Client ID | `OUTLOOK_CLIENT_ID` |
| Directory (tenant) ID | Tenant ID | `OUTLOOK_TENANT_ID` |
| Client secret value | Client Secret | `OUTLOOK_CLIENT_SECRET` |

---

## Example

**In Azure Portal, you'll see:**
```
Application (client) ID: 12345678-1234-1234-1234-123456789abc
```

**In your .env file, you'll use:**
```bash
OUTLOOK_CLIENT_ID=12345678-1234-1234-1234-123456789abc
```

**They're the same value!**

---

## Summary

- ✅ **Application (client) ID** = **Client ID** = Same thing!
- ✅ Copy it from Azure Portal Overview page
- ✅ Use it as `OUTLOOK_CLIENT_ID` in your `.env` file

---

**Last Updated:** December 8, 2024

