<!-- src/routes/+page.svelte -->
<script>
  import { goto } from '$app/navigation'; 

  let username = '';
  let password = '';
  let errorMessage = ''; 

  async function handleLogin() {
    errorMessage = ''; 

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });


    if (response.ok) {
      goto('/dashboard');
    } else {
      const data = await response.json();
      errorMessage = data.message;
    }
  }
</script>

<main>
  <div class="login-box">
    <h1>Member Login</h1>
    <form on:submit|preventDefault={handleLogin}>
      <div class="input-group">
        <label for="username">Username</label>
        <input id="username" type="text" bind:value={username} required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input id="password" type="password" bind:value={password} />
      </div>
      
      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}

      <button type="submit">Log In</button>
    </form>
  </div>
</main>

<style>
  main {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
  }
  .login-box {
    width: 360px;
    padding: 2.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }
  .input-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
  }
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  button:hover {
    background-color: #0056b3;
  }
  .error {
    color: #dc3545; /* สีแดง */
    text-align: center;
    margin-bottom: 1rem;
  }
</style>