import http from "../http-common";

class ArchiveDataService {
  getAll() {
    return http.get("/archive");
  }

  get(id) {
    return http.get(`/archive/${id}`);
  }

  create(data) {
    return http.post("/archive", data);
  }

  update(id, data) {
    return http.put(`/archive/${id}`, data);
  }

  delete(id) {
    return http.delete(`/archive/${id}`);
  }

  deleteAll() {
    return http.delete(`/archive`);
  }

  findByTitle(title) {
    return http.get(`/archive?title=${title}`);
  }
}

export default new ArchiveDataService();
