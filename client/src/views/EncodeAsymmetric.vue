<template>
  <div id="pageBody" class="clearfix">
    <div id="formDiv">
      <form encType="multipart/form-data" @submit.prevent="encode">
        <fieldset>
          <div class="formRow">
            <div><label for="pubkey">public key: </label></div>
            <div>
              <input
                type="text"
                name="pubkey"
                id="pubkey"
                class="inputBoxes"
                v-model="pubkey"
              />
            </div>
          </div>
          <div class="formRow">
            <div><label for="prikey">private key: </label></div>
            <div>
              <input
                type="text"
                name="prikey"
                id="prikey"
                class="inputBoxes"
                v-model="prikey"
              />
            </div>
          </div>
          <div class="formRow">
            <div><label for="nonce">nonce: </label></div>
            <div>
              <input
                type="text"
                name="nonce"
                id="nonce"
                class="inputBoxes"
                v-model="nonce"
              />
              <button
                name="generateNonce"
                id="generateNonce"
                @click.prevent="generateNonce"
              >
                generate nonce
              </button>
            </div>
          </div>
          <div class="formRow">
            <div><label for="msg">msg: </label></div>
            <div>
              <textarea
                name="msg"
                id="msg"
                class="inputBoxes"
                v-model="msg"
              ></textarea>
            </div>
          </div>
          <div class="formRow">
            <div><label for="">image to encode:</label></div>
            <div>
              <input
                type="file"
                name="imagefile"
                id="imagefile"
                accept="image/png"
                @change="setFile"
              />
            </div>
          </div>
          <div class="formRow">
            <input
              type="hidden"
              name="encodeBase64"
              id="encodeBase64"
              :value="shouldEncodeBase64"
            />
            <input type="submit" value="submit" />
          </div>
        </fieldset>
      </form>
    </div>
    <div id="imgDiv">
      <div id="errMsg" v-if="errMsg.length">{{ errMsg }}</div>
      <div>
        <img src="../assets/images/spinner-icon-gif-24.gif" v-if="isEncoding" />
        <img
          name="outputImg"
          id="outputImg"
          :src="encodedImage"
          alt="encoded image"
          v-if="encodedImage.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EncodeSymmetric",
  data() {
    return {
      key: "",
      nonce: "",
      msg: "",
      shouldEncodeBase64: "true",
      isEncoding: false,
      file: null,
      encodedImage: "",
      errMsg: ""
    };
  },
  methods: {
    async generateKey() {
      const res = await axios.get("/api/random-key");

      this.key = res.data.randomKey;
      // eslint-disable-next-line
      console.log(res.data);
    },
    async generateNonce() {
      const res = await axios.get("/api/nonce");

      this.nonce = res.data.nonce;
      // eslint-disable-next-line
      console.log(res.data);
    },
    validate() {
      if (this.key.length === 0) {
        alert("Enter a key");
        return true;
      } else if (this.nonce.length === 0) {
        alert("Enter a nonce");
        return true;
      } else if (this.msg.length === 0) {
        alert("Enter a message");
        return true;
      } else if (!this.file) {
        alert("Upload an image file");
        return true;
      }

      return false;
    },
    async encode() {
      const validationFailure = this.validate();

      if (validationFailure) {
        return;
      }

      this.isEncoding = true;
      this.encodedImage = "";
      this.errMsg = "";

      const form = new FormData();
      form.append("key", this.key);
      form.append("nonce", this.nonce);
      form.append("msg", this.msg);
      form.append("imagefile", this.file, this.file.name);
      form.append("encodeBase64", this.shouldEncodeBase64);

      try {
        const res = await axios.post("/api/encode", form);

        this.encodedImage = `data:image/png;base64, ${res.data}`;
        // eslint-disable-next-line
        console.log("great success");
      } catch (err) {
        this.errMsg = err.message;
        // eslint-disable-next-line
        console.log("all is lost");
        // eslint-disable-next-line
        console.log(err);
      } finally {
        // eslint-disable-next-line
        console.log("done");
      }

      this.isEncoding = false;
    },
    setFile(e) {
      this.file = e.target.files[0];
    }
  }
};
</script>
