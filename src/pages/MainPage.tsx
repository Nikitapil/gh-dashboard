import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RepositoryTable } from "../Components/Repository/RepositoryTable";
import { AppLoader } from "../Components/UI/AppLoader";
import { Pagination } from "../Components/UI/Pagination";
import { useFetch } from "../hooks/useFetch";
import RepoService from "../services/repoService";

export const MainPage = () => {
  const [repos, setRepos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [getRepos, isLoading, isError] = useFetch(async () => {
    const q = query || undefined;
    const { items: repos, total: tot } = await RepoService.searchRepos(
      q,
      +currentPage
    );
    setTotal(tot);
    setRepos(repos);
  });

  useEffect(() => {
    (getRepos as () => void)();
    setSearchParams({
      page: currentPage.toString(),
      query: query || searchParams.get("query") || "",
    });
  }, [currentPage]);

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchParams({ page: "1", query });
    if (currentPage === 1) {
      (getRepos as () => void)();
    }
  };

  return (
    <div className="main-page">
      <h2 className="page-title">Repository search</h2>
      <form className="repository-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Repository name"
          className="repository-form__input"
          value={query}
          onChange={onInputHandler}
        />
        <button type="submit" className="repository-form__submit">
          Search
        </button>
      </form>
      {isError && !isLoading && (
        <p>Something went wrong, please try to reload the page</p>
      )}
      {isLoading ? <AppLoader /> : <RepositoryTable repos={repos} />}
      {total > 10 && (
        <Pagination
          currenPage={+currentPage}
          setCurrentPage={setCurrentPage}
          total={total}
        />
      )}
    </div>
  );
};
