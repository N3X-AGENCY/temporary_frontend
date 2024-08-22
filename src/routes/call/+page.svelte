<script lang="ts">
  import { onMount } from 'svelte';
  import { createMachine } from 'xstate';
  import { useMachine } from '@xstate/svelte';
  import Calendar from './Calendar.svelte';
  import TimePicker from './TimePicker.svelte';
  import ReasonSelector from './ReasonSelector.svelte';
  import PhoneSelector from './PhoneSelector.svelte';
  import { fade } from 'svelte/transition';
  import confetti from 'canvas-confetti';
	import { enhance } from '$app/forms';
  import { gsap } from 'gsap';
  import { Flip } from 'gsap/Flip';

  let dateSelectionnee = $state<Date | null>(null);
  let heureSelectionnee = $state('');
  let prenom_nom = $state('');
  let email = $state('');
  let telephone = $state('');
  let raisonAppel = $state('');

  let defilementY = $state(0);
  let hauteurFormulaire = $state(0);

  let etatFormulaire = $state('remplissage');
  let erreurs = $state<Record<string, string>>({});

  const machineFormulaire = createMachine({
    id: 'formulaire',
    initial: 'remplissage',
    states: {
      remplissage: {
        on: { SOUMETTRE: 'chargement' }
      },
      chargement: {
        on: { 
          SUCCES: 'succes',
          ERREUR: 'remplissage'
        }
      },
      succes: {
        entry: 'lancerConfettis'
      }
    },
  }, {
    actions: {
      lancerConfettis: () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  });

  const { snapshot, send: envoyerAMachine } = useMachine(machineFormulaire);

  let titleElement: HTMLElement | null = $state(null);
  let titleContainer: HTMLElement | null = $state(null);

  gsap.registerPlugin(Flip);

  onMount(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    hauteurFormulaire = document.querySelector('form')?.offsetTop ?? 0;
  });

  $effect(() => {
    if (titleElement && titleContainer) {
      const state = Flip.getState(titleElement);
      
      if (estCollant) {
        titleContainer.appendChild(titleElement);
      } else {
        document.querySelector('form')?.insertAdjacentElement('afterbegin', titleElement);
      }

      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(titleElement, { 
            opacity: estCollant ? 1 : 0.7, 
            duration: 0.0,
            ease: 'power2.inOut'
          });
        }
      });
    }
  });

  const estCollant = $derived(defilementY > hauteurFormulaire);

  function gererSelectionRaison({
    category,
    subcategory
  }) {

    raisonAppel = subcategory ? `${category} - ${subcategory}` : category;

  }

  function validerFormulaire() {
    const nouvellesErreurs: Record<string, string> = {};
    if (!prenom_nom || prenom_nom.trim() === '') nouvellesErreurs.prenom_nom = 'Le nom est requis';
    if (!email || email.trim() === '') nouvellesErreurs.email = 'L\'email est requis';
    if (!telephone || telephone.trim().length <= 8) nouvellesErreurs.telephone = 'Le téléphone doit contenir plus de 8 caractères';
    if (!dateSelectionnee) nouvellesErreurs.date = 'La date est requise';
    if (!heureSelectionnee) nouvellesErreurs.heure = 'L\'heure est requise';
    if (!raisonAppel) nouvellesErreurs.raison = 'La raison est requise';
    
    erreurs = nouvellesErreurs;
    console.log(erreurs,'erreurs');
    if (Object.keys(nouvellesErreurs).length > 0) {
      // Scroll to the first error
      const firstErrorField = Object.keys(nouvellesErreurs)[0];
      scrollToElement(firstErrorField);
      return false;
    }

    return true;
  }

  function handlePhoneSelect(selectedPhone: string) {
    telephone = selectedPhone;
  }

  function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (element instanceof HTMLInputElement) {
        setTimeout(() => {
          element.focus();
        }, 100);
      }
    }
  }

</script>

<svelte:window bind:scrollY={defilementY} />

<div class="min-h-screen bg-black text-white p-12" in:fade={{duration: 300}}>
  {#if estCollant}
    <div class="fixed top-0 left-0 right-0 z-50 bg-black/20 border-b backdrop-blur-md border-white/20 transition-all duration-200 py-4 px-4">
      <div class="max-w-lg mx-auto" bind:this={titleContainer}>
        <!-- Title will be moved here when sticky -->
      </div>
    </div>
  {/if}

  {#if $snapshot.matches('remplissage')}
    <form method="POST" 	use:enhance={async({ formElement, formData, action, cancel, submitter }) => {
      // Prevent default form submission
      console.log('form',formData);
      cancel();

      // Validate form
      if (!validerFormulaire()) {
        return;
      }

      // Update machine state
      envoyerAMachine({ type: 'SOUMETTRE' });

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: formData
        });
        console.log(response,'response');
        if (!response.ok) {
          throw new Error('Erreur lors de la soumission du formulaire');
        }

        const result = await response.json();
        console.log(result,'result');
        if (result.type === 'failure') {
          throw new Error(result.data);
        }

        envoyerAMachine({ type: 'SUCCES' });
      } catch (erreur) {
        envoyerAMachine({ type: 'ERREUR' });
        erreurs = { ...erreurs, soumission: 'Une erreur s\'est produite lors de la soumission du formulaire. Veuillez réessayer.' };
      }

      // Don't call update() as we're handling the submission manually
    }} class="max-w-lg mx-auto space-y-8 relative pt-16">
      <h1 bind:this={titleElement} class="text-3xl font-bold text-white ">Réserver un Appel</h1>

      <div id="prenom_nom">
        <label for="prenom_nom" class="block mb-3 text-opacity-80 text-xl  font-semibold text-white">Prénom & Nom</label>
        <input name="prenom_nom" type="text" id="prenom_nom" bind:value={prenom_nom} 
          class="w-full bg-black bg-opacity-20 border border-white border-opacity-10 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 text-white transition-all duration-200">
        {#if erreurs.prenom_nom}
          <p class="text-red-500 mt-1">{erreurs.prenom_nom}</p>
        {/if}
      </div>

      <div id="email">
        <label for="email" class="block mb-3 text-opacity-80 text-xl  font-semibold text-white">Email</label>
        <input name="email" type="email" id="email" bind:value={email} 
          class="w-full bg-black bg-opacity-20 border border-white border-opacity-10 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 text-white transition-all duration-200">
        {#if erreurs.email}
          <p class="text-red-500 mt-1">{erreurs.email}</p>
        {/if}
      </div>

      <div class="" id="telephone">
        <label for="telephone" class="block mb-3 text-opacity-80 text-xl  font-semibold text-white">Téléphone</label>
        <input name="telephone" type="tel" id="telephone" bind:value={telephone} class="hidden">
        <PhoneSelector value={telephone} OnSelect={handlePhoneSelect} />
        {#if erreurs.telephone}
          <p class="text-red-500 mt-1">{erreurs.telephone}</p>
        {/if}
      </div>

      <div id="date">
        <label class="block mb-3 text-opacity-80 text-xl  font-semibold text-white">Date</label>
        <input name="date" type="text" class="hidden" bind:value={dateSelectionnee}>
        <Calendar bind:selectedDate={dateSelectionnee} />
        {#if erreurs.date}
          <p class="text-red-500 mt-1">{erreurs.date}</p>
        {/if}
      </div>

      <div id="heure">
        <label class="block mb-3 text-opacity-80 text-xl  font-semibold text-white">Heure</label>
        <input name="heure" type="text" class="hidden" bind:value={heureSelectionnee}>
        <TimePicker bind:selectedTime={heureSelectionnee} bind:selectedDate={dateSelectionnee} />
        {#if erreurs.heure}
          <p class="text-red-500 mt-1">{erreurs.heure}</p>
        {/if}
      </div>

      <div id="raison">
        <label for="raison" class="block mb-3 text-opacity-80 text-xl  font-semibold text-white">Raison de l'appel</label>
        <input name="raison" type="text" id="raison" class="hidden" bind:value={raisonAppel}>
        <ReasonSelector OnSelect={gererSelectionRaison} />
        {#if erreurs.raison}
          <p class="text-red-500 mt-1">{erreurs.raison}</p>
        {/if}
      </div>

      <div class="bg-black bg-opacity-20 border border-white border-opacity-10 rounded-sm p-6 mt-8 mb-8">
        <h2 class="text-2xl font-bold mb-6 text-white">Résumé</h2>
        <p class="mb-2"><strong class="text-opacity-80">Prénom & Nom :</strong> {prenom_nom}</p>
        <p class="mb-2"><strong class="text-opacity-80">Email :</strong> {email}</p>
        <p class="mb-2"><strong class="text-opacity-80">Téléphone :</strong> {telephone}</p>
        <p class="mb-2"><strong class="text-opacity-80">Date :</strong> {dateSelectionnee ? dateSelectionnee.toLocaleDateString() : 'Non sélectionnée'}</p>
        <p class="mb-2"><strong class="text-opacity-80">Heure :</strong> {heureSelectionnee || 'Non sélectionnée'}</p>
        <p><strong class="text-opacity-80">Raison :</strong> {raisonAppel || 'Non sélectionnée'}</p>
      </div>

      <button type="submit"
        class="submit-button relative w-full bg-white bg-opacity-5 hover:bg-opacity-10 text-white font-bold py-3 px-6 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition-all duration-200 overflow-hidden">
        <span class="beam-effect"></span>
        <span class="relative z-10">Réserver l'Appel</span>
      </button>

      {#if erreurs.soumission}
        <p class="text-red-500 mt-4">{erreurs.soumission}</p>
      {/if}
    </form>
  {:else if $snapshot.matches('chargement')}
    <div transition:fade={{duration: 200}} class="max-w-lg mx-auto text-center">
      <p class="text-2xl">Soumission de votre réservation...</p>
      <!-- Ajouter un spinner de chargement ici -->
    </div>
  {:else if $snapshot.matches('succes')}
    <div transition:fade={{duration: 200}} class="max-w-lg mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Réservation Réussie !</h2>
      <p class="text-xl">Merci d'avoir réservé un appel. Nous vous contacterons bientôt.</p>
    </div>
  {/if}
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: 70px; /* Ajuster en fonction de la hauteur de votre en-tête */
  }

  :global(body) {
    background-color: black;
  }

  .sticky {
    position: fixed;
    left: 0;
    right: 0;
  }

  .submit-button {
    position: relative;
    overflow: hidden;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>