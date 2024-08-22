<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let { 
    selectedDate = $bindable<Date | null>(null), 
    OnSelect,
    allowPastDates = $bindable(false)
  } = $props<{
    selectedDate?: Date | null;
    OnSelect: (date: Date) => void;
    allowPastDates?: boolean;
  }>();

  let currentMonth = $state(new Date());
  let direction = $state(0); // -1 for prev, 1 for next

  const monthYear = $derived(currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' }));

  const blacklistedDays = $state([0, 6]); // 0 is Sunday, 6 is Saturday
  const blacklistedDates = $state([
    new Date(2024,7, 23),
    new Date(2024,7, 28) 
  ]);

  function getDaysInMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysArray = [];

    // Add days from previous month to start on Monday
    const startDay = firstDay.getDay() || 7; // Convert Sunday (0) to 7
    for (let i = 1; i < startDay; i++) {
      daysArray.push(new Date(year, month, 1 - i));
    }
    daysArray.reverse();

    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(year, month, i));
    }

    // Add days from next month to complete the grid
    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        daysArray.push(new Date(year, month + 1, i));
      }
    }

    return daysArray;
  }

  function prevMonth() {
    direction = -1;
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
  }

  function nextMonth() {
    direction = 1;
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
  }

  function selectDate(date: Date) {
    if (!isDateBlacklisted(date)) {
      selectedDate = date;
      OnSelect(date);
    }
  }

  function isDateBlacklisted(date: Date): boolean {
    const isPastDate = !allowPastDates && date < new Date(new Date().setHours(0, 0, 0, 0));
    return isPastDate ||
           blacklistedDays.includes(date.getDay()) ||
           blacklistedDates.some(blacklistedDate => 
             blacklistedDate.getDate() === date.getDate() &&
             blacklistedDate.getMonth() === date.getMonth() &&
             blacklistedDate.getFullYear() === date.getFullYear()
           );
  }

  const days = $derived(getDaysInMonth(currentMonth));

  let years = $derived(Array.from({length: 10}, (_, i) => currentMonth.getFullYear() + i - 5));
  let months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  function handleMonthYearChange(event: Event) {
    const [year, month] = (event.target as HTMLSelectElement).value.split('-');
    currentMonth = new Date(parseInt(year), parseInt(month));
  }
</script>

<div class="bg-black bg-opacity-20 border border-white border-opacity-10 rounded-sm p-6" in:fade={{duration: 200}}>
  <div class="flex justify-between mb-6 text-white">
    <button type="button" on:click={prevMonth} class="text-white text-opacity-60 hover:text-opacity-100 transition-opacity duration-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <select
      on:change={handleMonthYearChange}
      class="bg-black bg-opacity-20 border border-white border-opacity-10 rounded-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 text-white transition-all duration-200"
    >
      {#each years as year}
        {#each months as month, index}
          <option value={`${year}-${index}`} selected={year === currentMonth.getFullYear() && index === currentMonth.getMonth()}>
            {month} {year}
          </option>
        {/each}
      {/each}
    </select>
    <button type="button" on:click={nextMonth} class="text-white text-opacity-60 hover:text-opacity-100 transition-opacity duration-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
  <div class="relative overflow-hidden" style="height: {7 * 40}px;">
    {#key currentMonth}
      <div 
        class="absolute w-full"
        in:fly={{x: direction * 100, duration: 300, easing: quintOut}}
        out:fly={{x: direction * -100, duration: 300, easing: quintOut}}
      >
        <div class="grid grid-cols-7 gap-2">
          {#each ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'] as day}
            <div class="text-center text-sm text-white text-opacity-40">{day}</div>
          {/each}
          {#each days as day}
            <button
              type="button"
              class={`
                p-2 text-center rounded-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition-all duration-200 relative
                ${selectedDate?.toDateString() === day.toDateString() ? 'bg-white text-black' : 'text-white  hover:bg-white/40 '}
                ${day.getMonth() !== currentMonth.getMonth() ? 'text-opacity-50' : ''}
                ${day.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500' : ''}
                ${isDateBlacklisted(day) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              on:click={() => selectDate(day)}
              disabled={isDateBlacklisted(day)}
            >
              {day.getDate()}
              {#if day.toDateString() === new Date().toDateString()}
                <span class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/key}
  </div>
  <div class="text-white text-opacity-40 mt-5">NUI 1.2.8 - Calendar</div>
</div>