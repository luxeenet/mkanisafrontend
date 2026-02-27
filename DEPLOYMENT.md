# M-KANISA Frontend — Deployment Guide

## Live URLs

| Environment | URL |
|---|---|
| **Production (Vercel)** | https://mkanisafrontend.vercel.app |
| **Backend API** | https://mkanisaapi.pamtok.com/api/v1 |

---

## Tech Stack

- **Framework:** React 19 + Vite 7
- **Styling:** TailwindCSS v4
- **Routing:** React Router v7
- **Hosting:** Vercel
- **Backend:** Node.js/Express hosted on `mkanisaapi.pamtok.com`

---

## Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_URL=https://mkanisaapi.pamtok.com/api/v1
```

> On Vercel, set this under **Project → Settings → Environment Variables**.

---

## Local Development

```bash
npm install
npm run dev
```

App runs at: `http://localhost:5173`

---

## Deploy to Vercel

### First-time setup

```bash
npm install -g vercel
vercel login
```

### Deploy to production

```bash
npm run build       # verify build passes locally first
vercel --prod       # deploy to Vercel
```

### Subsequent deployments

```bash
vercel --prod
```

---

## SPA Routing

`vercel.json` is included to handle client-side routing. All routes redirect to `index.html`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Key Routes

| Route | Description |
|---|---|
| `/` | Landing / Home page |
| `/login` | Login (portal admins & super admin) |
| `/onboarding` | Church registration flow |
| `/setup-admin` | One-time Super Admin setup |
| `/admin` | Super Admin dashboard |
| `/admin/tenants` | Tenant management |
| `/member` | Member portal |

---

## Super Admin

To create the Super Admin (one-time only):

1. Visit `https://mkanisafrontend.vercel.app/setup-admin`
2. Click **Initialize Platform**
3. Save the credentials shown:
   - **Email:** `admin@mkanisa.com`
   - **Password:** `Password@123`

> ⚠️ Change the password after first login.
