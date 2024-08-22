<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  let { 
    selectedTime = $bindable(''), 
    OnSelect, 
    allowPastHours = $bindable(false),
    selectedDate = $bindable(new Date()) // New prop for selected date
  } = $props();

  const hours = $state(Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')));
  const minutes = $state(['00', '15', '30', '45']);

  // Define blacklisted hours
  const blacklistedHours = $state(['18', '19', '20', '21', '22', '23', '00', '01', '02', '03', '04', '05']);

  let containerRef: HTMLDivElement;

  function selectTime(hour: string, minute: string) {
    selectedTime = `${hour}:${minute}`;
    OnSelect(selectedTime);
  }

  function isTimeBlacklisted(hour: string): boolean {
    return blacklistedHours.includes(hour);
  }

  function isPastTime(hour: string, minute: string): boolean {
    if (allowPastHours) return false;
    
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(parseInt(hour), parseInt(minute));

    // Only check for past times if the selected date is today
    if (selectedDateTime.toDateString() === now.toDateString()) {
      return selectedDateTime < now;
    }

    // For all other dates (past or future), allow all times
    return false;
  }

  function scrollToCurrentTime() {
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, '0');
    const currentMinute = now.getMinutes();
    const roundedMinute = Math.floor(currentMinute / 15) * 15;
    
    const targetTime = `${currentHour}:${roundedMinute.toString().padStart(2, '0')}`;
    const targetElement = containerRef.querySelector(`[data-time="${targetTime}"]`);
    
    if (targetElement && containerRef) {
      const containerRect = containerRef.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      
      containerRef.scrollTop = targetRect.top - containerRect.top - containerRef.clientHeight / 2 + targetElement.clientHeight / 2;
    }
  }

  onMount(() => {
    scrollToCurrentTime();
  });
</script>

<div bind:this={containerRef} class="bg-black bg-opacity-20 border border-white border-opacity-10 rounded-sm p-6 max-h-72 overflow-y-auto custom-scrollbar" in:fade={{duration: 200}}>
  {#each hours as hour}
    <div class="mb-4" in:slide={{duration: 200}}>
      <div class="font-semibold mb-2 text-white text-opacity-60">{hour}:00</div>
      <div class="grid grid-cols-4 gap-2">
        {#each minutes as minute}
          <button
            type="button"
            class="p-2 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 text-white transition-all duration-200"
            class:bg-white={selectedTime === `${hour}:${minute}`}
            class:bg-opacity-20={selectedTime === `${hour}:${minute}`}
            class:text-black={selectedTime === `${hour}:${minute}`}
            class:hover:bg-white={!isTimeBlacklisted(hour) && !isPastTime(hour, minute)}
            class:hover:bg-opacity-10={!isTimeBlacklisted(hour) && !isPastTime(hour, minute)}
            class:opacity-50={isTimeBlacklisted(hour) || isPastTime(hour, minute)}
            class:cursor-not-allowed={isTimeBlacklisted(hour) || isPastTime(hour, minute)}
            on:click={() => !isTimeBlacklisted(hour) && !isPastTime(hour, minute) && selectTime(hour, minute)}
            disabled={isTimeBlacklisted(hour) || isPastTime(hour, minute)}
            data-time={`${hour}:${minute}`}
          >
            {hour}:{minute}
          </button>
        {/each}
      </div>
    </div>
  {/each}
  <div class="text-white text-opacity-40 mt-5">NUI 1.2.8 - TimePicker</div>
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