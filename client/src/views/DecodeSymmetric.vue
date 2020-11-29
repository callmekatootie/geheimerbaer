<template>
  <div id="pageBody" class="clearfix">
    <div id="formDiv">
      <form encType="multipart/form-data" @submit.prevent="decode">
        <fieldset>
          <div class="formRow">
            <div><label for="key">key: </label></div>
            <div>
              <input
                type="text"
                name="key"
                id="key"
                class="inputBoxes"
                v-model="key"
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
            </div>
          </div>
          <div class="formRow">
            <div><label for="">image to decode:</label></div>
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
            <input type="submit" value="submit" />
          </div>
        </fieldset>
      </form>
    </div>
    <div id="imgDiv">
      <div id="errMsg" v-if="errMsg.length">{{ errMsg }}</div>
      <div>
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
      key: "",
      nonce: "",
      msg: "",
      file: "",
      errMsg: ""
    };
  },
  methods: {
    validate() {
      if (this.key.length === 0) {
        alert("Enter a key");
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

      const form = new FormData();
      form.append("key", this.key);
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
