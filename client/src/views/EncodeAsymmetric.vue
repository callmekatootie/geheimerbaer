<template>
  <div class="container">
    <div class="columns">
      <div class="column"></div>
    </div>
    <div class="columns">
      <div class="column">
        <h3 class="title">Encode Asymmetric</h3>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <form encType="multipart/form-data" @submit.prevent="encode">
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
                    placeholder="Enter public key"
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
                    placeholder="Enter private key"
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
                <p class="control">
                  <a class="button is-light" @click="copyToClipboard('nonce')">
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
                <div class="control is-expanded">
                  <input
                    type="text"
                    name="nonce"
                    id="nonce"
                    class="input"
                    v-model="nonce"
                    placeholder="Enter or generate nonce"
                    tabindex="3"
                  />
                </div>
                <p class="control">
                  <button
                    class="button is-black"
                    name="generateNonce"
                    id="generateNonce"
                    @click.prevent="generateNonce"
                  >
                    Generate
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="msg" class="label">Message</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea
                    name="msg"
                    id="msg"
                    class="textarea has-fixed-size"
                    v-model="msg"
                    placeholder="Enter the message to encode"
                    tabindex="4"
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
                    tabindex="5"
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
                    <span class="file-label">Image to encode</span>
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
                  <input
                    type="hidden"
                    name="encodeBase64"
                    id="encodeBase64"
                    :value="shouldEncodeBase64"
                  />
                  <button
                    type="submit"
                    class="button is-primary"
                    :class="{ 'is-loading': isEncoding }"
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
        <article class="message is-info" v-if="encodedImage.length">
          <div class="message-header">
            <p>Your encoded image</p>
          </div>
          <div class="message-body">
            <figure class="image">
              <img
                name="outputImg"
                id="outputImg"
                :src="encodedImage"
                alt="encoded image"
              />
            </figure>
          </div>
        </article>
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
      pubKey: "",
      priKey: "",
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
    async generateNonce() {
      const res = await axios.get("/api/nonce");

      this.nonce = res.data.nonce;
      // eslint-disable-next-line
      console.log(res.data);
    },
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
      form.append("pubKey", this.pubKey);
      form.append("priKey", this.priKey);
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
    },
    async copyToClipboard(type) {
      switch (type) {
        case "nonce":
          await navigator.clipboard.writeText(this.nonce);
          break;
        default:
          throw Error("Unknown type");
      }
    }
  }
};
</script>
