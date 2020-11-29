<template>
  <div id="pageBody" class="clearfix">
    <div id="formDiv">
      <form @submit.prevent="generateKey">
        <fieldset>
          <div class="formRow">
            <div>
              <label for="pubKey">pubKey: </label>
              <input
                type="text"
                name="pubKey"
                id="pubKey"
                class="inputBoxes"
                v-model="publicKey"
              />
            </div>
            <div>
              <label for="priKey">priKey: </label>
              <input
                type="text"
                name="priKey"
                id="priKey"
                class="inputBoxes"
                v-model="privateKey"
              />
            </div>
            <div>
              <input type="submit" value="generate keys" />
            </div>
          </div>
        </fieldset>
      </form>
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
    }
  }
};
</script>
