# Seyda Zeynab Academy — Application des Paiements (PWA)

## Contenu du dossier
- `index.html` — l'application complète
- `manifest.json` — la carte d'identité de l'app (nom, couleurs, icônes)
- `sw.js` — le service worker qui permet le fonctionnement hors ligne
- `icons/` — les icônes (192px, 512px, iOS, favicon) — **provisoires**, à remplacer par votre vrai logo

## Publier sur GitHub Pages (gratuit)
1. Créez un dépôt GitHub (ex : `sza-paiements`).
2. Déposez-y **tous les fichiers de ce dossier**, en gardant la même structure (le dossier `icons/` doit rester un sous-dossier).
3. Allez dans **Settings → Pages**, choisissez la branche `main` et le dossier `/ (root)`.
4. Votre app sera disponible à une adresse du type :
   `https://votre-nom.github.io/sza-paiements/`

⚠️ Important : les PWA nécessitent **HTTPS** pour s'installer — GitHub Pages le fournit automatiquement.

## Remplacer les icônes par votre vrai logo
Remplacez les fichiers dans `icons/` en gardant exactement les mêmes noms :
- `icon-192.png` (192×192 px)
- `icon-512.png` (512×512 px)
- `apple-touch-icon.png` (180×180 px)
- `favicon-32.png` (32×32 px)

Vous pouvez aussi ajouter votre logo directement dans l'app via **Paramètres → Logos** (cela s'affiche dans l'app elle-même, séparément des icônes du téléphone).

## Installer l'application sur le téléphone
- **Android / Chrome** : ouvrez le lien, un bouton ⬇️ apparaît en haut de l'app — appuyez dessus, ou utilisez le menu ⋮ → « Installer l'application » / « Ajouter à l'écran d'accueil ».
- **iPhone / iPad (Safari)** : ouvrez le lien, appuyez sur le bouton ⬇️ (ou le bouton Partager de Safari) → « Sur l'écran d'accueil » → « Ajouter ».
- **Ordinateur (Chrome/Edge)** : une icône d'installation apparaît dans la barre d'adresse.

Une fois installée, l'app s'ouvre en plein écran comme une vraie application, avec sa propre icône — et fonctionne hors ligne après la première ouverture.

## Mettre à jour l'application plus tard
Si vous modifiez `index.html`, changez aussi le numéro de version dans `sw.js` (ligne `CACHE_NAME`), par exemple `sza-paiements-cache-v2`, pour que les téléphones téléchargent bien la nouvelle version.
