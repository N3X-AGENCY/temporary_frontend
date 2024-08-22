<script lang="ts">
  import { fade, slide } from 'svelte/transition';

  let { OnSelect }: { OnSelect: (event: { category: string | null; subcategory: string | null }) => void } = $props();

  let selectedCategory = $state<string | null>(null);
  let selectedSubcategory = $state<string | null>(null);

  const categories = $state({
    Technologie: ['Mentorat', 'Proposition de projet', 'Embauche'],
    Développement: ['Développement Web', 'Applications Mobiles',' Backend','Frontend','Svelte',"Typescript",'Bun',"SurrealDB"],
    Bangkok: ['Vie d\'expatrié', 'Culture locale', 'Réseautage', 'Opportunités d\'affaires']
  });

  function selectCategory(category: string) {
    selectedCategory = category;
    selectedSubcategory = null;
    OnSelect({ category, subcategory: null });
  }

  function selectSubcategory(subcategory: string) {
    selectedSubcategory = subcategory;
    OnSelect({  category: selectedCategory, subcategory });
  }
</script>

<div class="bg-black bg-opacity-20 border border-white border-opacity-10 rounded-sm p-6" in:fade={{duration: 200}}>
  <h3 class="text-lg font-semibold mb-4 text-white">À quel sujet ?</h3>
  <div class="grid grid-cols-3 gap-3 mb-6">
    {#each Object.keys(categories) as category}
      <button
        type="button"
        class= "{selectedCategory === category ? 'bg-white/40 text-black' : 'bg-white/10'} rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 text-white transition-all duration-200"
        class:bg-white={selectedCategory === category}
        class:bg-opacity-20={selectedCategory === category}
        class:text-black={selectedCategory === category}
        class:hover:bg-white={selectedCategory !== category}
        class:hover:bg-opacity-10={selectedCategory !== category}
        on:click={() => selectCategory(category)}
      >
        {category}
      </button>
    {/each}
  </div>
  
  {#if selectedCategory}
    <div class="mt-6" in:slide={{duration: 200}}>
      <h4 class="text-md font-semibold mb-3 text-white text-opacity-80">Dit moi en plus</h4>
      <div class="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {#each categories[selectedCategory as keyof typeof categories] as subcategory}
          <button
            type="button"
            class=" rounded-lg p-3 text-sm {selectedSubcategory === subcategory ? 'bg-white/40 text-black' : 'bg-white/10'} focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 text-white transition-all duration-200"
           
            class:text-black={selectedSubcategory === subcategory}
            class:hover:bg-white={selectedSubcategory !== subcategory}
            class:hover:bg-opacity-10={selectedSubcategory !== subcategory}
            on:click={() => selectSubcategory(subcategory)}
          >
            {subcategory}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
</style>