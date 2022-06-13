import axios from "axios";

export default class RepoService {
    static async searchRepos(query = 'stars%3A%3E0', page = 1) {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`, {
            params: {
                sort: 'stars',
                order: 'desc',
                per_page: 10,
                page
            }   
        })
        return {items: response.data.items, total: response.data.total_count}
    }

    static async getSingleRepo(owner:string, repo: string) {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`)
        const langs = await axios.get(response.data.languages_url)
        const contributorsResponse = await axios.get(response.data.contributors_url)
        const contributors = contributorsResponse.data.map((contr: {login: string}) => contr.login)
        return {...response.data, languages: Object.keys(langs.data), contributors}
    }
}