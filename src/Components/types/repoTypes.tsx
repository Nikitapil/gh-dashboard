interface IRepoOwner {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string
}

export interface IRepo {
    id: number;
    name: string;
    private: boolean;
    owner : IRepoOwner;
    html_url: string;
    description: string;
    contributors_url: string;
    stargazers_count: number;
    languages_url: string;
    updated_at: string;
    languages?: string[];
    contributors: string[]
}