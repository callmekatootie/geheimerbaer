<template>
  <div class="container">
    <div class="columns">
      <div class="column"></div>
    </div>
    <div class="columns">
      <div class="column">
        <h3 class="title">Decode Asymmetric</h3>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <form encType="multipart/form-data" @submit.prevent="decode">
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
                    v-model="pubKey"
                    placeholder="Enter the public key"
                    tabindex="1"
                  />
                </div>
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
                    v-model="priKey"
                    placeholder="Enter the private key"
                    tabindex="2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="nonce" class="label">Nonce</label>
            </div>
            <div class="field-body">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    type="text"
                    name="nonce"
                    id="nonce"
                    class="input"
                    v-model="nonce"
                    placeholder="Enter the nonce"
                    tabindex="3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body">
              <div class="file has-name">
                <label class="file-label">
                  <input
                    type="file"
                    name="imagefile"
                    id="imagefile"
                    accept="image/png"
                    @change="setFile"
                    class="file-input"
                    tabindex="4"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <img
                        src="@/assets/images/icons/upload.svg"
                        alt="upload file"
                        width="16"
                        height="16"
                      />
                    </span>
                    <span class="file-label">Image to decode</span>
                  </span>
                  <span class="file-name" v-if="file">{{ file.name }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button
                    type="submit"
                    class="button is-primary"
                    :class="{ 'is-loading': isDecoding }"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="column is-half">
        <article class="message is-danger" v-if="errMsg.length">
          <div class="message-header">
            <p>Error</p>
          </div>
          <div class="message-body">{{ errMsg }}</div>
        </article>
        <article class="message is-info" v-if="msg.length">
          <div class="message-header">
            <p>Your decoded message</p>
          </div>
          <div class="message-body">{{ msg }}</div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DecodeSymmetric",
  data() {
    return {
      pubKey: "",
      priKey: "",
      nonce: "",
      msg: "",
      file: "",
      errMsg: "",
      isDecoding: false
    };
  },
  methods: {
    validate() {
      if (this.pubKey.length === 0) {
        alert("Enter a public key");
        return true;
      } else if (this.priKey.length === 0) {
        alert("Enter a private key");
        return true;
      } else if (this.nonce.length === 0) {
        alert("Enter a nonce");
        return true;
      } else if (!this.file) {
        alert("Upload an image file");
        return true;
      }

      return false;
    },
    async decode() {
      const validationFailure = this.validate();

      if (validationFailure) {
        return;
      }

      this.msg = "";
      this.errMsg = "";
      this.isDecoding = true;

      const form = new FormData();
      form.append("pubKey", this.pubKey);
      form.append("priKey", this.priKey);
      form.append("nonce", this.nonce);
      form.append("imagefile", this.file, this.file.name);

      try {
        const res = await axios.post("/api/decode", form);

        this.msg = res.data.message;
        // eslint-disable-next-line
        console.log("great success", res.data);
      } catch (err) {
        this.errMsg = err.message;
        // eslint-disable-next-line
        console.log("all is lost");
        // eslint-disable-next-line
        console.log(err);
      } finally {
        this.isDecoding = false;
        // eslint-disable-next-line
        console.log("done");
      }
    },
    setFile(e) {
      this.file = e.target.files[0];
    }
  }
};
</script>
