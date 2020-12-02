<template>
  <div>
    <nav class="navbar is-dark">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/">Geheimerbaer</router-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/encode-symmetric">
              Encode Symmetric
            </router-link>
            <router-link class="navbar-item" to="/decode-symmetric">
              Decode Symmetric
            </router-link>
            <router-link class="navbar-item" to="/encode-asymmetric">
              Encode Asymmetric
            </router-link>
            <router-link class="navbar-item" to="/decode-asymmetric">
              Decode Asymmetric
            </router-link>
            <router-link class="navbar-item" to="/generate-keypairs">
              Generate Keypairs
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>
