# Production Deployment Guide

## 🎯 Production URLs
- **Frontend**: https://personify2-0.vercel.app/
- **Backend**: https://personify2-0-1.onrender.com

---

## 🚀 Backend Deployment (Render)

### 1. Environment Variables on Render
Set these in your Render dashboard under "Environment":

```bash
SECRET_KEY=generate-a-strong-random-key-here
JWT_SECRET_KEY=generate-another-strong-random-key-here
DATABASE_URL=your-postgres-database-url  # Use Render's PostgreSQL add-on
ALLOWED_ORIGINS=https://personify2-0.vercel.app,https://personify2-0-git-main-valkyre312s-projects.vercel.app
FRONTEND_URL=https://personify2-0.vercel.app
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GEMINI_API_KEY=your-gemini-api-key
```

### 2. Add Wildcard CORS Support (Optional)
If you have multiple Vercel preview URLs, add to `ALLOWED_ORIGINS`:
```
https://personify2-0-*.vercel.app
```

### 3. Database Setup
- Use Render's PostgreSQL add-on
- Update `DATABASE_URL` with the provided connection string
- Tables will auto-create on first run via `db.create_all()`

---

## 🌐 Frontend Deployment (Vercel)

### 1. Environment Variables on Vercel
Set these in Vercel dashboard → Project Settings → Environment Variables:

```bash
VITE_API_BASE_URL=https://personify2-0-1.onrender.com
```

**Important**: Set for all environments (Production, Preview, Development)

### 2. Build Settings
Vercel should auto-detect these from `package.json`:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Redeploy After Adding Env Vars
After adding environment variables, trigger a new deployment:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

Or use Vercel's "Redeploy" button in the dashboard.

---

## ✅ Post-Deployment Checklist

### Backend (Render)
- [ ] Environment variables are set
- [ ] Database is connected
- [ ] App builds successfully
- [ ] Test endpoint: `https://personify2-0-1.onrender.com/`
- [ ] CORS headers allow your Vercel domain

### Frontend (Vercel)
- [ ] `VITE_API_BASE_URL` is set correctly
- [ ] Build completes without errors
- [ ] Test API calls from deployed site
- [ ] Google OAuth redirects work (if configured)

### Integration Testing
- [ ] Registration works
- [ ] Login works
- [ ] Quiz submission works
- [ ] Profile page loads
- [ ] API calls return data (not CORS errors)

---

## 🔧 Troubleshooting

### CORS Errors
1. Verify `ALLOWED_ORIGINS` on Render includes your Vercel URL
2. Ensure no trailing slashes in URLs
3. Check browser console for exact origin being blocked
4. Add that origin to `ALLOWED_ORIGINS`

### 404 Errors on API Calls
1. Verify `VITE_API_BASE_URL` doesn't include `/api` suffix
2. Check API routes have `/api` prefix in frontend code
3. Test backend endpoint directly: `https://personify2-0-1.onrender.com/`

### Google OAuth Not Working
1. Update Google Cloud Console with production URLs:
   - Authorized JavaScript origins: `https://personify2-0.vercel.app`
   - Authorized redirect URIs: `https://personify2-0-1.onrender.com/api/auth/google/callback`
2. Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` on Render
3. Ensure `FRONTEND_URL` is set correctly

### Database Connection Issues
1. Check `DATABASE_URL` format is correct
2. Ensure PostgreSQL add-on is active on Render
3. Verify database credentials in connection string
4. Check Render logs for connection errors

---

## 📝 Development vs Production

### Local Development
**Backend** (.env):
```bash
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173
FRONTEND_URL=http://localhost:5173
DATABASE_URL=sqlite:///personality.db
```

**Frontend** (.env):
```bash
VITE_API_BASE_URL=http://localhost:5000
```

### Production
**Backend** (Render environment variables):
```bash
ALLOWED_ORIGINS=https://personify2-0.vercel.app
FRONTEND_URL=https://personify2-0.vercel.app
DATABASE_URL=postgresql://...  # From Render PostgreSQL add-on
```

**Frontend** (Vercel environment variables):
```bash
VITE_API_BASE_URL=https://personify2-0-1.onrender.com
```

---

## 🔐 Security Notes

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Generate strong secrets** for production:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```
3. **Use HTTPS only** in production
4. **Rotate keys regularly** - especially after exposure
5. **Limit CORS origins** - Only add domains you control

---

## 🚦 Quick Deploy Commands

### Update Backend
```bash
cd backend
git add .
git commit -m "Update backend"
git push origin main  # Render auto-deploys
```

### Update Frontend
```bash
cd frontend
git add .
git commit -m "Update frontend"
git push origin main  # Vercel auto-deploys
```

---

## 📞 Support

If you encounter issues:
1. Check Render logs: Dashboard → Logs
2. Check Vercel logs: Dashboard → Deployments → Click deployment → View function logs
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
