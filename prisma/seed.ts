import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Début du script de seeding ---');
  
  const adminEmail = 'admin@example.com';
  const adminPassword = 'password';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  console.log(`Mot de passe hashé pour l'utilisateur admin.`);

  try {
    const user = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        // On peut s'assurer que le mdp est à jour si l'utilisateur existe déjà
        password: hashedPassword,
      },
      create: {
        email: adminEmail,
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log(`✅ Utilisateur admin créé ou mis à jour avec succès : ${user.email}`);

  } catch (error) {
    console.error("❌ Erreur durant l'upsert de l'utilisateur admin:", error);
  }

  console.log('--- Fin du script de seeding ---');
}

main()
  .catch((e) => {
    console.error("❌ Une erreur fatale est survenue durant le seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Déconnexion de la base de données.');
  }); 