import axios from "axios";


export class PixabayApi {
    constructor () {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 20;
        this.total = 0;      
    }
  
    async fetchImages() {
        const url = 'https://pixabay.com/api/';
        const params = {
        key: '38328283-3432d4ee282ba2126186b7660',
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal'   ,
        safesearch: true,
        page: this.page,
        per_page: this.per_page
        }
        
        const { data } = await axios.get(url, { params })
         return data;
    };
    
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }

    getQuery() {
        return this.searchQuery
    }

    setQuery(newQuery) {
        this.searchQuery = newQuery;
    }

    setTotal(total) {
        this.total += total;
    }
    
    getTotal() {
        return this.total;
    }

    resetTotal() {
        this.total = 0;
    }
    }