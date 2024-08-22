<script lang="ts">
  import { onMount } from 'svelte';

  let { value = $bindable(), OnSelect } = $props();

  let countries = [
    { code: 'FR', name: 'France', dialCode: '+33' },
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41' },
    // Add more countries as needed
  ];

  let selectedCountry = $state(countries[0]);
  let phoneNumber = $state('');

  const formattedValue = $derived(formatPhoneNumber(phoneNumber, selectedCountry.dialCode));

  function formatPhoneNumber(number: string, dialCode: string): string {
    // Remove non-digit characters
    const digits = number.replace(/\D/g, '');
    
    // Format based on country
    if (dialCode === '+33') { // France
      return `${dialCode} ${digits.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5').trim()}`;
    } else if (dialCode === '+1') { // US
      return `${dialCode} ${digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3').trim()}`;
    } else if (dialCode === '+41') { // Switzerland
      return `${dialCode} ${digits.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4').trim()}`;
    }
    // Add more country-specific formatting as needed
    
    return `${dialCode} ${digits}`;
  }

</script>

<div class="flex ">
  <select
    bind:value={selectedCountry}
    on:change={() => OnSelect(formattedValue)}
    class="w-1/3 bg-black bg-opacity-20 border border-white border-opacity-10 rounded-l-sm px-2 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 text-white transition-all duration-200"
  >
    {#each countries as country}
      <option value={country}>
        {country.code} ({country.dialCode})
      </option>
    {/each}
  </select>
  <input
    type="tel"
    on:input={() => OnSelect(formattedValue)}
    bind:value={phoneNumber}
    placeholder="Phone number"
    class="w-2/3 bg-black bg-opacity-20 border border-white border-opacity-10 rounded-r-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 text-white transition-all duration-200"
  />
</div>