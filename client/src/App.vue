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
          <div class="navbar-end">
            <div
              class="navbar-item"
              :class="{
                'has-dropdown': isLoggedIn,
                'is-hoverable': isLoggedIn
              }"
            >
              <a class="navbar-link is-arrowless" v-if="isLoggedIn">
                <figure class="image is-24x24 mr-2">
                  <img
                    class="is-rounded"
                    :src="profilePicture"
                    alt="profile-picture"
                  />
                </figure>
                {{ displayName }}
              </a>

              <div class="navbar-dropdown is-right" v-if="isLoggedIn">
                <a href="/auth/logout" class="navbar-item">Logout</a>
              </div>
              <button
                class="button is-loading is-primary"
                v-if="checkingLogInStatus"
              >
                Loading
              </button>
              <div class="buttons" v-if="!isLoggedIn && !checkingLogInStatus">
                <a href="/auth/twitter/login" class="button is-link">
                  <span>Sign in with Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      checkingLogInStatus: true,
      isLoggedIn: false,
      profilePicture: null,
      displayName: ""
    };
  },
  async mounted() {
    let res;

    try {
      res = await axios.get("/auth/profile");
    } catch (err) {
      console.log(err);
      this.checkingLogInStatus = false;
      return;
    }

    if (res.data.isLoggedIn) {
      this.isLoggedIn = true;
      this.profilePicture = res.data.photos[0].value;
      this.displayName = res.data.displayName;
    }

    this.checkingLogInStatus = false;
  }
};
</script>
