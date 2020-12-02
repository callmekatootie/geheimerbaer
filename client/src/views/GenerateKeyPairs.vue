<template>
  <div class="container">
    <div class="columns">
      <div class="column"></div>
    </div>
    <div class="columns">
      <div class="column is-one-quarter"></div>
      <div class="column is-half">
        <h3 class="title">Generate Keypairs</h3>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-quarter"></div>
      <div class="column is-half">
        <form @submit.prevent="generateKey">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="pubKey" class="label">Public Key</label>
            </div>
            <div class="field-body">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    type="text"
                    name="pubKey"
                    id="pubKey"
                    class="input"
                    v-model="publicKey"
                    disabled
                  />
                </div>
                <p class="control">
                  <a
                    class="button is-light"
                    @click.prevent="copyToClipboard('publicKey')"
                  >
                    <span class="icon is-small">
                      <img
                        src="@/assets/images/icons/copy.svg"
                        alt="copy"
                        width="16"
                        height="16"
                      />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="priKey" class="label">Private Key</label>
            </div>
            <div class="field-body">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    type="text"
                    name="priKey"
                    id="priKey"
                    class="input"
                    v-model="privateKey"
                    disabled
                  />
                </div>
                <p class="control">
                  <a
                    class="button is-light"
                    @click.prevent="copyToClipboard('privateKey')"
                  >
                    <span class="icon is-small">
                      <img
                        src="@/assets/images/icons/copy.svg"
                        alt="copy"
                        width="16"
                        height="16"
                      />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    type="submit"
                    value="Generate keys"
                    class="button is-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GenerateKeyPairs",
  data() {
    return {
      publicKey: "",
      privateKey: ""
    };
  },
  methods: {
    async generateKey() {
      const res = await axios.get("/api/keypair");
      const { publicKey, privateKey } = res.data;
      this.publicKey = publicKey;
      this.privateKey = privateKey;
      // eslint-disable-next-line
      console.log(res.data);
    },
    async copyToClipboard(type) {
      switch (type) {
        case "publicKey":
          await navigator.clipboard.writeText(this.publicKey);
          break;
        case "privateKey":
          await navigator.clipboard.writeText(this.privateKey);
          break;
        default:
          throw Error("Unknown type");
      }
    }
  }
};
</script>
