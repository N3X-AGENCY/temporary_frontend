<script>
	import { onMount } from 'svelte';

	const dropdownNavs = [
	  {
		label: "Products",
		navs: [
		  {
			title: "Analytics",
			desc: "Duis aute irure dolor in reprehenderit",
			path: "javascript:void(0)",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
			</svg>`,
		  },
		  {
			title: "Reports",
			desc: "Duis aute irure dolor in reprehenderit",
			path: "javascript:void(0)",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
			</svg>`,
		  },
		]
	  },
	  {
		label: "Resources",
		navs: [
		  {
			title: "Blog",
			desc: "Duis aute irure dolor in reprehenderit",
			path: "javascript:void(0)",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			  <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
			</svg>`,
		  },
		  {
			title: "Community",
			desc: "Duis aute irure dolor in reprehenderit",
			path: "javascript:void(0)",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			  <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
			</svg>`,
		  },
		]
	  },
	  {
		label: "Company",
		navs: [
		  {
			title: "About us",
			desc: "Duis aute irure dolor in reprehenderit",
			path: "javascript:void(0)",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
			</svg>`,
		  },
		  {
			title: "Careers",
			desc: "Duis aute irure dolor in reprehenderit",
			path: "javascript:void(0)",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			  <path fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
			  <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
			</svg>`,
		  },
		]
	  }
	];
	const navigation =[]
	const navigation_unused = [
	  { title: "Features", path: "javascript:void(0)", isDrapdown: true, navs: dropdownNavs },
	  { title: "Integrations", path: "javascript:void(0)", isDrapdown: false },
	  { title: "Customers", path: "javascript:void(0)", isDrapdown: false },
	  { title: "Pricing", path: "javascript:void(0)", isDrapdown: false }
	];
  
	let state = false;
	let drapdownState = { isActive: false, idx: null };
  
	onMount(() => {
	  document.onclick = (e) => {
		const target = e.target;
		if (!target.closest(".nav-menu")) drapdownState = { isActive: false, idx: null };
	  };
	});
  
	function toggleState() {
	  state = !state;
	}
  
	function toggleDropdown(idx) {
	  drapdownState = { 
		idx, 
		isActive: drapdownState.idx === idx ? !drapdownState.isActive : true 
	  };
	}
	import LogoSVG from '$lib/assets/logo.png?format=png&quality=1'
  </script>
  
  <nav class="relative z-20 bg-white w-full md:static md:text-sm md:border-none {state ? 'shadow-lg rounded-b-xl md:shadow-none' : ''}">
	<div class="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
	  <div class="flex items-center justify-between py-3 md:py-5 md:block">
		<a href="javascript:void(0)">
		  <img
			src="{LogoSVG}"
			width={120}
			height={50}
			alt="Float UI logo"
		  />
		</a>
		<div class="md:hidden">
		  <button class="text-gray-500 hover:text-gray-800"
			on:click={toggleState}
		  >
			{#if state}
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
			  </svg>
			{:else}
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
				<path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
			  </svg>
			{/if}
		  </button>
		</div>
	  </div>
	  <div class="nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 {state ? 'block' : 'hidden'}">
		<ul class="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
		  {#each navigation as item, idx}
			<li>
			  {#if item.isDrapdown}
				<button
				  class="w-full flex items-center justify-between gap-1 text-gray-700 hover:text-black"
				  on:click={() => toggleDropdown(idx)}
				>
				  {item.title}
				  {#if drapdownState.idx == idx && drapdownState.isActive}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
                  </svg>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                {/if}
              </button>
            {:else}
              <a href={item.path} class="block text-gray-700 hover:text-black">
                {item.title}
              </a>
            {/if}
            
            {#if item.isDrapdown && drapdownState.idx == idx && drapdownState.isActive}
              <div class="mt-6 inset-x-0 top-20 w-full md:absolute md:border-y border-gray-200 md:shadow-md md:mt-0 bg-white">
                <ul class='max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3'>
                  {#each item.navs as dropdownItem}
                    <li>
                      <p class="text-black text-sm">{dropdownItem.label}</p>
                      <ul class='mt-5 space-y-6'>
                        {#each dropdownItem.navs as navItem}
                          <li class="group">
                            <a href={navItem.path} class='flex gap-3 items-center'>
                              <div class='w-12 h-12 rounded-full bg-white text-black flex items-center justify-center duration-150 group-hover:bg-black group-hover:text-white md:w-14 md:h-14'>
                                {@html navItem.icon}
                              </div>
                              <div>
                                <span class="text-gray-800 duration-200 group-hover:text-black text-sm font-medium md:text-base">{navItem.title}</span>
                                <p class='text-sm text-gray-600 group-hover:text-gray-800 mt-1'>{navItem.desc}</p>
                              </div>
                            </a>
                          </li>
                        {/each}
                      </ul>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </li>
        {/each}
        <div class='flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0'>
         <!--  <li>
            <a href="javascript:void(0)" class="block py-3 text-center text-gray-700 hover:text-black border rounded-lg md:border-none">
            About Us
            </a>
          </li> -->
          <li>
            <a href="javascript:void(0)" class="block py-3 px-4 font-medium text-center text-white bg-black hover:bg-black/60 active:bg-black/60 active:shadow-none rounded-lg shadow ">
				 <span class="flex gap-2.5 items-center justify-center "> <svg class="h-5 w-5 " xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" >
					<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
						<rect width="18" height="14" x="3" y="5" stroke-dasharray="64" stroke-dashoffset="64" rx="1">
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
						</rect>
						<path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5L12 12L21 6.5">
							<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" values="24;0" />
						</path>
					</g>
				</svg> <span>Contact Us</span>
            </a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</nav>

{#if state}
  <div
    class="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
    on:click={toggleState}
  ></div>
{/if}