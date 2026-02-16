@echo off
echo ================================================
echo INSTALLATION AUTHENTIFICATION ADMIN - URGENT
echo ================================================
echo.
echo ATTENTION : Le dashboard admin est actuellement NON PROTEGE !
echo Cette installation est CRITIQUE pour la securite.
echo.
pause

cd C:\Users\vdora\Downloads\acf-score-FINAL-GEO\acf-score

echo [1/7] Installation des dependances...
call npm install next-auth bcryptjs
call npm install --save-dev @types/bcryptjs

echo.
echo [2/7] Creation des dossiers...
mkdir lib 2>nul
mkdir app\api\auth\[...nextauth] 2>nul
mkdir app\admin\login 2>nul
mkdir scripts 2>nul

echo.
echo [3/7] Copie des fichiers d'authentification...
copy auth-options.ts lib\auth-options.ts
copy route-nextauth.ts app\api\auth\[...nextauth]\route.ts
copy login-page.tsx app\admin\login\page.tsx
copy middleware.ts middleware.ts
copy AdminHeader.tsx components\AdminHeader.tsx
copy generate-password-hash.js scripts\generate-password-hash.js

echo.
echo ================================================
echo [4/7] CONFIGURATION REQUISE
echo ================================================
echo.
echo ETAPE CRITIQUE : Generer votre mot de passe
echo.
echo 1. Choisissez un mot de passe FORT (12+ caracteres)
echo 2. Executez : node scripts/generate-password-hash.js "VotreMotDePasse"
echo 3. Copiez le hash genere
echo 4. Modifiez lib/auth-options.ts avec vos credentials
echo.
pause

echo.
echo ================================================
echo [5/7] VARIABLES D'ENVIRONNEMENT
echo ================================================
echo.
echo AJOUTEZ dans .env.local :
echo.
echo NEXTAUTH_URL=http://localhost:3000
echo NEXTAUTH_SECRET=[generer sur https://generate-secret.vercel.app/32]
echo.
echo SUR VERCEL :
echo 1. Settings -^> Environment Variables
echo 2. NEXTAUTH_URL=https://acf-score.com
echo 3. NEXTAUTH_SECRET=[meme secret que local]
echo.
pause

echo.
echo ================================================
echo [6/7] MODIFICATIONS DES PAGES ADMIN
echo ================================================
echo.
echo IMPORTANT : Modifiez manuellement :
echo - app/admin/contacts/page.tsx
echo - app/admin/diagnostics/page.tsx
echo - app/admin/stats/page.tsx
echo.
echo Remplacez Header par AdminHeader
echo Ajoutez verification session (voir README-AUTH.md)
echo.
pause

echo.
echo ================================================
echo [7/7] TEST ET DEPLOIEMENT
echo ================================================
echo.
echo 1. Testez en local : npm run dev
echo 2. Verifiez /admin/contacts redirige vers login
echo 3. Testez connexion/deconnexion
echo 4. Deployez : git add . ^&^& git commit -m "feat: auth" ^&^& git push
echo.
echo ================================================
echo INSTALLATION TERMINEE
echo ================================================
echo.
echo PROCHAINES ETAPES :
echo 1. Generer le hash du mot de passe
echo 2. Configurer lib/auth-options.ts
echo 3. Ajouter variables d'env (.env.local + Vercel)
echo 4. Modifier les pages admin
echo 5. Tester et deployer
echo.
echo Documentation complete : README-AUTH.md
echo ================================================

pause
