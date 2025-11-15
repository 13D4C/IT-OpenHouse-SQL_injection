<!-- src/routes/dashboard/+page.svelte -->
<main>
  <div class="dashboard-box">
    <h1>✅ Login Successful!</h1>
    <p>Welcome to the protected dashboard.</p>
    <a href="/">Log Out</a>
  </div>
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
  }
  .dashboard-box {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  h1 {
    color: #28a745; /* สีเขียว */
  }
  a {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
</style>