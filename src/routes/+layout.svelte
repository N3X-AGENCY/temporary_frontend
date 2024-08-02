<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<div class="bg-black py-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold text-white text-center">
					Innovating Tomorrow's Technology, Transforming Today's Business
				</h2>
				<p class="mt-4 text-xl text-white/50 text-center">
					Empowering enterprises with cutting-edge solutions for a digital future, driving growth and efficiency
				</p>
			</div>
		</div>
		<div class="bg-gray-100">
			<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			  <div class="text-center">
			  
				<p class="mt-2 text-sm text-gray-600">
				  N3X AGENCY LLC
				</p>
				<p class="mt-1 text-sm text-gray-600">
				  #1132, 4 PEDDLERS ROW
				</p>
				<p class="mt-1 text-sm text-gray-600">
				  NEWARK, DE 19702
				</p>
			  </div>
			  <div class="mt-8 text-center text-xs text-gray-500">
				<p>&copy; 2023 N3X AGENCY LLC. All rights reserved.</p>
		
			  </div>
			</div>
		  </div>
	</footer>
</div>

<style>
	
</style>
