<!-- src/routes/dashboard/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition'; 

  let showContent = false;

  onMount(() => {
    const timer = setTimeout(() => {
      showContent = true;
    }, 500);

    return () => clearTimeout(timer);
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<main>
  <div class="scanline-overlay"></div>

  <div class="mainframe-container">
    <header class="title glitch" data-text="ACCESS GRANTED">
      <h1>ACCESS GRANTED</h1>
    </header>
    
    {#if showContent}
      <div class="content" transition:fade|global={{duration: 500}}>
        <p class="line1">Welcome to the IT@KMITL Mainframe.</p>
        <p class="line2">You have bypassed the primary security layer.</p>
        <p class="congrats line3">CONGRATULATIONS!</p>
        <a href="/" class="line4">QUIT GAME</a>
      </div>
    {/if}
  </div>
</main>

<style>
  /* --- GLOBAL STYLES --- */
  :global(body) {
    background-color: #000;
    color: #e0e0e0;
    font-family: 'Press Start 2P', cursive;
    margin: 0;
    overflow: hidden;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
  }

  .mainframe-container {
    width: 100%;
    max-width: 650px;
    border: 4px solid #00ff9f;
    background-color: #0d0d0d;
    box-shadow: 0 0 20px #00ff9f99, inset 0 0 15px #00ff9f55;
    text-align: center;
    animation: fadeInContainer 1s ease-out;
  }

  @keyframes fadeInContainer {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  /* --- SCANLINE EFFECT --- */
  .scanline-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%);
    background-size: 100% 4px;
    animation: scan 10s linear infinite;
    pointer-events: none;
  }

  @keyframes scan {
    from { background-position-y: 0; }
    to { background-position-y: 100vh; }
  }

  /* --- HEADER GLITCH EFFECT --- */
  .title {
    background-color: #00ff9f;
    color: #121212;
    padding: 1rem;
    font-size: 1.2rem;
    position: relative;
  }
  
  .glitch {
    position: relative;
    animation: glitch-anim 2.5s infinite;
  }
  .glitch h1 {
    margin: 0;
  }
  .glitch::before, .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00ff9f;
    overflow: hidden;
  }
  .glitch::before {
    left: 2px;
    text-shadow: -2px 0 #ff4136;
    animation: glitch-anim-1 2.5s infinite reverse;
  }
  .glitch::after {
    left: -2px;
    text-shadow: -2px 0 #007bff, 2px 2px #ff4136;
    animation: glitch-anim-2 2.5s infinite reverse;
  }

  @keyframes glitch-anim { 0%, 100% { clip-path: inset(50% 0 30% 0); } 20% { clip-path: inset(20% 0 70% 0); } 40% { clip-path: inset(80% 0 5% 0); } 60% { clip-path: inset(40% 0 45% 0); } 80% { clip-path: inset(90% 0 2% 0); } }
  @keyframes glitch-anim-1 { 0%, 100% { clip-path: inset(30% 0 50% 0); } 20% { clip-path: inset(0 0 90% 0); } 40% { clip-path: inset(60% 0 20% 0); } 60% { clip-path: inset(10% 0 75% 0); } 80% { clip-path: inset(40% 0 33% 0); } }
  @keyframes glitch-anim-2 { 0%, 100% { clip-path: inset(80% 0 5% 0); } 20% { clip-path: inset(30% 0 60% 0); } 40% { clip-path: inset(0 0 95% 0); } 60% { clip-path: inset(55% 0 25% 0); } 80% { clip-path: inset(20% 0 70% 0); } }

  /* --- CONTENT TEXT TYPING EFFECT --- */
  .content {
    padding: 2.5rem;
  }
  .content p, .content a {
    line-height: 1.8;
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    width: 0;
    animation: typing 2s steps(40, end) forwards,
               blink-caret .75s step-end infinite;
    border-right: .15em solid #00ff9f;
  }

  .line2 { animation-delay: 2s; }
  .line3 { animation-delay: 4s; }
  .line4 { animation-delay: 6s; }

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }

  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #00ff9f; }
  }
  
  .congrats {
    margin-top: 2rem;
    font-size: 1rem;
    color: #ffdd00;
  }
  
  a {
    display: block; 
    box-sizing: border-box; 
    margin-top: 2rem;
    padding: 1rem 1.5rem;
    background-color: #ff4136;
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    text-shadow: 2px 2px #000;
  }
</style>