// Script pour générer un hash de mot de passe
// Usage: node generate-password-hash.js "VotreMotDePasse"

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.log('Usage: node generate-password-hash.js "VotreMotDePasse"');
  process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Erreur:', err);
    process.exit(1);
  }
  
  console.log('\n================================');
  console.log('MOT DE PASSE HACHÉ GÉNÉRÉ :');
  console.log('================================\n');
  console.log(hash);
  console.log('\n================================');
  console.log('INSTRUCTIONS :');
  console.log('================================\n');
  console.log('1. Copiez le hash ci-dessus');
  console.log('2. Collez-le dans lib/auth-options.ts');
  console.log('3. Remplacez la valeur de ADMIN_CREDENTIALS.passwordHash');
  console.log('\n================================\n');
});
