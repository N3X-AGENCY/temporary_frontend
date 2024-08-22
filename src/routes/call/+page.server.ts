import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { writeFile, readFile } from 'fs/promises';
import Airtable from 'airtable';

Airtable.configure({
	apiKey: 'patUG0ySG2nGZeFvh.f5dc276538c2b0f487786a36816f19c2b59af4bbf24332baed91447bb790e87b'
});

const base = Airtable.base('appgvq3yOej9zMBaL');
export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const prenom_nom = formData.get('prenom_nom');
		const email = formData.get('email');
		const telephone = formData.get('telephone');
		const date = formData.get('date');
		const heure = formData.get('heure');
		const raison = formData.get('raison');

		// Validation basique
		if (!prenom_nom || !email || !telephone || !date || !heure || !raison) {
			return fail(400, { error: 'Tous les champs sont requis' });
		}

		// Ici, vous pouvez ajouter la logique pour traiter les données
		// Par exemple, les enregistrer dans une base de données

		// Simuler un délai de traitement

		// Créer un objet avec les données du formulaire
		const formDataObject = {
			prenom_nom,
			email,
			telephone,
			date: new Date(date).toDateString(),
			heure,
			raison
		};

		// Read existing data from the file
		try {
			base('tblfagNL1RggcPFtH').create(
				[
					{
						fields: formDataObject
					}
				],
				function (err, records) {
					if (err) {
						console.error(err);
						return;
					}
					records.forEach(function (record) {
						console.log(record.getId());
					});
				}
			);
		} catch (error) {
			console.log(error);
			return fail(500, { error: 'Erreur lors de la sauvegarde des données' });
		}

		// Retourner une réponse de succès
		return { success: true };
	}
} satisfies Actions;
