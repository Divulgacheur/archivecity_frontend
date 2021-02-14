<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="archive.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="archive.description"
          name="description"
        />
      </div>


      <div class="form-group">
        <label for="historic_image">Historic Image URL</label>
        <input
            class="form-control"
            id="historic_image"
            v-model="archive.historic_image"
            name="historic_image"
        />
      </div>


      <div class="form-group">
        <label for="recent_image">Recent image URL</label>
        <input
            class="form-control"
            id="recent_image"
            v-model="archive.recent_image"
            name="recent_image"
        />
      </div>

      <button @click="saveArchive" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newArchive">Add</button>
    </div>
  </div>
</template>

<script>
import ArchiveDataService from "../services/ArchiveDataService";

export default {
  name: "add-archive",
  data() {
    return {
      archive: {
        id: null,
        title: "",
        description: "",
        historic_image: "",
        recent_image: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveArchive() {
      var data = {
        title: this.archive.title,
        description: this.archive.description,
        historic_image: this.archive.historic_image,
        recent_image: this.archive.recent_image,
      };
      console.log(data)

      ArchiveDataService.create(data)
        .then(response => {
          this.archive.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newArchive() {
      this.submitted = false;
      this.archive = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
