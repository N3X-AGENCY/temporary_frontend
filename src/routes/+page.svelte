<script>
  import { onMount } from 'svelte';

  import { animate, inView, stagger } from 'motion';



  onMount(async () => {
	const gsap = (await import('gsap')).default;
	const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
	gsap.registerPlugin(ScrollTrigger);
    // Hero section animation
    gsap.from('.hero-content', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });

    // Staggered animation for process steps
    gsap.from('.process-step', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.process-section',
		start: 'top 50%',
        end: 'bottom 70%',
		 scrub: 0.5,
        toggleActions: 'play none none reverse'
      },
    });

    // Tech stack animation
    inView('.tech-stack-item', ({ target }) => {
      animate(target, { opacity: [0, 1], y: [50, 0] }, { duration: 0.5, delay: stagger(0.1) });
    });

     // TypeScript paradigms animation
	 gsap.from('.paradigm-item', {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: '.paradigms-section',
        start: 'top 50%',
        end: 'bottom 70%',
        scrub: 0.5,
        toggleActions: 'play none none reverse'
      },
    });


    // Contact section animation
    gsap.from('.contact-content', {
      opacity: 0,
      x: -50,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
      },
    });
  });
</script>

<svelte:head>
  <title>N3X Agency - Innovative Software and Design Solutions</title>
  <meta name="description" content="N3X Agency crafts cutting-edge software and stunning designs to elevate your business. Our expert team brings your vision to life with precision and creativity." />
</svelte:head>

<section class="overflow-hidden">
  <div class="bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="text-center hero-content">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block">Innovative Solutions for</span>
          <span class="block text-black">Software and Design</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          We craft cutting-edge software and stunning designs to elevate your business. Our expert team brings your vision to life with precision and creativity.
        </p>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div class="rounded-md shadow">
            <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-black/80 transition duration-300 ease-in-out md:py-4 md:text-lg md:px-10">
				<span class="flex gap-2.5 items-center justify-center "> <svg class="h-8 w-8 " xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" >
					<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
						<rect width="18" height="14" x="3" y="5" stroke-dasharray="64" stroke-dashoffset="64" rx="1">
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
						</rect>
						<path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5L12 12L21 6.5">
							<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" values="24;0" />
						</path>
					</g>
				</svg> <span>Get In Touch</span>
            </a>
          </div>
         
        </div>
      </div>
    </div>
    
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div class="transform hover:scale-105 transition duration-300 ease-in-out">
            <h2 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">Software Development</h2>
            <p class="mt-4 text-lg text-gray-500">From web applications to mobile apps, we deliver robust and scalable software solutions tailored to your needs.</p>
          </div>
          <div class="transform hover:scale-105 transition duration-300 ease-in-out">
            <h2 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">Design Services</h2>
            <p class="mt-4 text-lg text-gray-500">Our creative team crafts visually appealing and user-friendly designs that make your brand stand out.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-100 process-section">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-8">Our Design & Development Process</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white p-6 rounded-lg shadow-md process-step ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">1. Consultation</h3>
          <p class="text-gray-600">We start by understanding your vision and requirements to tailor our approach.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md process-step ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">2. Planning</h3>
          <p class="text-gray-600">Our team creates a detailed roadmap and selects the most suitable technologies.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md process-step ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">3. Design & Development</h3>
          <p class="text-gray-600">We bring your ideas to life using cutting-edge design tools and development frameworks.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md process-step ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">4. Testing & Launch</h3>
          <p class="text-gray-600">Rigorous testing ensures a flawless product before we assist with the launch.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-8">Our Cutting-Edge Tech Stack</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div class="text-center tech-stack-item">
          <img src="https://svelte.dev/svelte-logo-horizontal.svg" alt="Svelte" class="h-16 mx-auto mb-4">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Svelte</h3>
          <p class="text-gray-600">A radical new approach to building user interfaces</p>
        </div>
        <div class="text-center tech-stack-item">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" class="h-16 mx-auto mb-4">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">TypeScript</h3>
          <p class="text-gray-600">JavaScript that scales with static typing</p>
        </div>
        <div class="text-center tech-stack-item">
          <img src="https://surrealdb.com/_astro/dark.BHuUqs0-_Z18oSav.png" alt="SurrealDB" class="h-16 mx-auto mb-4">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">SurrealDB</h3>
          <p class="text-gray-600">Next-generation multi-model database</p>
        </div>
        <div class="text-center tech-stack-item">
          <img src="https://bun.sh/logo.svg" alt="Bun" class="h-16 mx-auto mb-4">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Bun</h3>
          <p class="text-gray-600">All-in-one JavaScript runtime & toolkit</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-100 paradigms-section">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-8">Mastering TypeScript Paradigms and Conventions</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white p-6 rounded-lg shadow-md paradigm-item ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Strong Typing</h3>
          <p class="text-gray-600">We leverage TypeScript's strong typing system to catch errors early and improve code quality.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md paradigm-item ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Object-Oriented Programming</h3>
          <p class="text-gray-600">Utilizing classes, interfaces, and inheritance for clean, modular, and reusable code structures.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md paradigm-item ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Functional Programming</h3>
          <p class="text-gray-600">Embracing functional programming concepts for more predictable and easier-to-test code.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md paradigm-item ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Advanced Types</h3>
          <p class="text-gray-600">Mastering union types, intersection types, and generics for flexible and robust type definitions.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md paradigm-item ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Best Practices</h3>
          <p class="text-gray-600">Following industry-standard conventions for naming, file organization, and code documentation.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md paradigm-item ">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Continuous Learning</h3>
          <p class="text-gray-600">Staying updated with the latest TypeScript features and ecosystem developments.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white contact-section">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
        <div class="contact-content">
          <h2 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Contact Us
          </h2>
          <div class="mt-3">
            <p class="text-lg text-gray-500">
              Have questions or want to learn more about our services? We'd love to hear from you!
            </p>
          </div>
          <div class="mt-9">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-3 text-base text-gray-500">
                <p>contact@n3x.agency</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 sm:mt-16 md:mt-0 contact-content">
          <h2 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Get in Touch
          </h2>
          <div class="mt-3">
            <p class="text-lg text-gray-500">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>
          <div class="mt-9">
            <div class="mt-6 sm:mt-8 sm:flex">
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a href="mailto:contact@n3x.agency" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-black/80 md:py-4 md:text-lg md:px-10">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>
