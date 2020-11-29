<template>
  <div>
    <div class="clearfix">
      <div class="navItem">
        <span>
          <router-link to="/encode-symmetric">Encode Symmetric</router-link>
        </span>
      </div>
      <div class="navItem">
        <span>
          <router-link to="/decode-symmetric">Decode Symmetric</router-link>
        </span>
      </div>
      <div class="navItem">
        <span>
          <router-link to="/generate-keypairs">Generate Keypairs</router-link>
        </span>
      </div>
    </div>
    <hr class="clearfix" />
    <router-view />
  </div>
</template>
