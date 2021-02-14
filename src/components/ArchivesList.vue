<template>

  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Archives List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(archive, index) in archives"
          :key="index"
          @click="setActiveArchive(archive, index)"
        >
          {{ archive.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllArchives">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentArchive">
        <h4>Archive</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentArchive.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentArchive.description }}
        </div>
         <div >
          <img v-if="currentArchive.historic_image" class="img-thumbnail img-fluid" alt v-bind:src="currentArchive.historic_image" />
        </div>
        <div >
          <img v-if="currentArchive.recent_image" class="img-thumbnail img-fluid" alt v-bind:src="currentArchive.recent_image" />
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentArchive.published ? "Published" : "Pending" }}
        </div>
        <router-link :to="{name: 'archive-details' , params : { id: currentArchive.id  } } " class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Archive...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ArchiveDataService from "../services/ArchiveDataService";
0
export default {
  name: "archives-list",
  data() {
    return {
      archives: [],
      currentArchive: null,
      currentIndex: -1,
      title: "",
      historic_image: null,
      recent_image: null
    };
  },
  methods: {
    retrieveArchives() {
      ArchiveDataService.getAll()
        .then(response => {
          this.archives = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveArchives();
      this.currentArchive = null;
      this.currentIndex = -1;
    },

    setActiveArchive(archive, index) {
      this.currentArchive = archive;
      this.currentIndex = index;
    },

    removeAllArchives() {
      ArchiveDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      ArchiveDataService.findByTitle(this.title)
        .then(response => {
          this.archives = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveArchives();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
