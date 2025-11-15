<!-- src/routes/+page.svelte -->
<script>
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let errorMessage = '';
  let isLoading = false;

  async function handleLogin() {
    isLoading = true;
    errorMessage = '';

    // หน่วงเวลาเล็กน้อยเพื่อให้ดูเหมือนกำลัง "Connecting..."
    await new Promise(res => setTimeout(res, 500));

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    isLoading = false;

    if (response.ok) {
      goto('/dashboard');
    } else {
      const data = await response.json();
      errorMessage = data.message.replace('Invalid credentials.', 'ACCESS DENIED.');
    }
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<main>
  <div class="game-container">
    <header class="title">
      <h1>IT@KMITL Open-House</h1>
      <p class="subtitle">- Security Challenge -</p>
    </header>

    <div class="login-terminal">
      <h2>PLAYER LOGIN</h2>
      <form on:submit|preventDefault={handleLogin}>
        <div class="input-group">
          <label for="username">&gt; USERNAME:</label>
          <input id="username" type="text" bind:value={username} spellcheck="false" required />
        </div>
        <div class="input-group">
          <label for="password">&gt; PASSCODE:</label>
          <input id="password" type="password" bind:value={password} />
        </div>
        
        {#if errorMessage}
          <p class="error">{errorMessage}</p>
        {/if}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'CONNECTING...' : 'ENTER'}
        </button>
      </form>
    </div>
    <footer class="footer-text">
      <p>HINT: SQL INJECTION IS POSSIBLE</p>
    </footer>
  </div>
</main>

<style>
  :global(body) {
    background-color: #121212;
    color: #e0e0e0;
    font-family: 'Press Start 2P', cursive;
    margin: 0;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
    box-sizing: border-box;
  }

  .game-container {
    width: 100%;
    max-width: 480px;
    border: 4px solid #00ffff;
    background-color: #1a1a1a;
    box-shadow: 0 0 15px #00ffff77;
  }
  
  .title {
    text-align: center;
    background-color: #00ffff;
    color: #121212;
    padding: 1rem;
    font-size: 0.9rem;
  }
  .title p {
    margin: 0.5rem 0 0;
    font-size: 0.7rem;
  }

  .login-terminal {
    padding: 2rem;
  }

  h2 {
    text-align: center;
    color: #ffdd00;
    text-shadow: 2px 2px #000;
    margin-bottom: 2rem;
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    color: #00ff9f;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    background-color: #222;
    border: 2px solid #555;
    color: #e0e0e0;
    font-family: 'Press Start 2P', cursive;
    box-sizing: border-box;
    font-size: 0.8rem;
  }
  input:focus {
    outline: none;
    border-color: #ffdd00;
    box-shadow: 0 0 10px #ffdd0077;
  }

  button {
    width: 100%;
    padding: 1rem;
    border: none;
    background-color: #ff4136;
    color: white;
    font-family: 'Press Start 2P', cursive;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    text-shadow: 2px 2px #000;
  }
  button:hover:not(:disabled) {
    background-color: #e02a1e;
  }
  button:disabled {
    background-color: #555;
    cursor: not-allowed;
  }

  .error {
    color: #ff4136;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }

  .footer-text {
    text-align: center;
    font-size: 0.6rem;
    color: #777;
    padding: 1rem;
    border-top: 2px solid #555;
  }
</style>