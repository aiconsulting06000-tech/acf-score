@echo off
echo ========================================
echo ACF SCORE - INSTALLATION COMPLETE
echo ========================================
echo.

cd C:\Users\vdora\Downloads\acf-score-FINAL-GEO\acf-score

echo [1/6] Creation des dossiers...
mkdir app\pourquoi 2>nul
mkdir app\admin\contacts 2>nul
mkdir app\admin\diagnostics 2>nul
mkdir app\admin\stats 2>nul
mkdir app\api\sitemap 2>nul
mkdir tests\e2e 2>nul

echo [2/6] Copie des pages...
copy pourquoi-page.tsx app\pourquoi\page.tsx
copy faq-page.tsx app\faq\page.tsx
copy contact-page.tsx app\contact\page.tsx

echo [3/6] Copie du dashboard admin...
copy admin-contacts-page.tsx app\admin\contacts\page.tsx
copy admin-diagnostics-page.tsx app\admin\diagnostics\page.tsx
copy admin-stats-page.tsx app\admin\stats\page.tsx

echo [4/6] Copie des API routes et lib...
copy route-sitemap.ts app\api\sitemap\route.ts
copy route-contact-FIXED.ts app\api\contact\route.ts
copy metadata.ts lib\metadata.ts
copy structured-data.tsx lib\structured-data.tsx

echo [5/6] Copie des composants et assets...
copy OptimizedImage.tsx components\OptimizedImage.tsx
copy logo-acf.svg public\logo-acf.svg
copy robots.txt public\robots.txt

echo [6/6] Copie des configs et tests...
copy next.config.js next.config.js
copy layout-root.tsx app\layout.tsx
copy playwright.config.ts playwright.config.ts
copy diagnostic.spec.ts tests\e2e\diagnostic.spec.ts

echo.
echo ========================================
echo INSTALLATION TERMINEE !
echo ========================================
echo.
echo Prochaines etapes :
echo 1. npm install @playwright/test --save-dev
echo 2. Configurer Google Analytics ID dans app/layout.tsx
echo 3. npm run build
echo 4. git add . ^&^& git commit -m "feat: SEO + Admin + Tests" ^&^& git push
echo.
echo Documentation complete : README-FINAL-COMPLET.md
echo ========================================

pause
