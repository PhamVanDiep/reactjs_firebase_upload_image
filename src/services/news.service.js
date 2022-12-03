import http from "../http-common";

class NewsService {
    getAll() {
        return http.get("/news/");
    }

    get(id) {
        return http.get(`/news/${id}`);
    }

    create(data) {
        return http.post("/news/", data);
    }
}

export default new NewsService();