<template>
  <div v-if="currentArchive" class="edit-form">
    <h4>Archive</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentArchive.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentArchive.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentArchive.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentArchive.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteArchive"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateArchive"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Archive...</p>
  </div>
</template>

<script>
import ArchiveDataService from "../services/ArchiveDataService";

export default {
  name: "archive",
  data() {
    return {
      currentArchive: null,
      message: ''
    };
  },
  methods: {
    getArchive(id) {
      ArchiveDataService.get(id)
        .then(response => {
          this.currentArchive = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentArchive.id,
        title: this.currentArchive.title,
        description: this.currentArchive.description,
        historic_image: this.currentArchive.historic_image,
        recent_image: this.currentArchive.recent_image,
        published: status
      };

      ArchiveDataService.update(this.currentArchive.id, data)
        .then(response => {
          this.currentArchive.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateArchive() {
      ArchiveDataService.update(this.currentArchive.id, this.currentArchive)
        .then(response => {
          console.log(response.data);
          this.message = 'The archive was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteArchive() {
      ArchiveDataService.delete(this.currentArchive.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "archives" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getArchive(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
