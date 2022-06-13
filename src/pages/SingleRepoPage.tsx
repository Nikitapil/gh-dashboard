import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRepo } from "../Components/types/repoTypes";
import { AppLoader } from "../Components/UI/AppLoader";
import { useFetch } from "../hooks/useFetch";
import RepoService from "../services/repoService";
import { formatDate } from "../utils/dates";

export const SingleRepoPage = () => {
  const params = useParams();
  const [repo, setRepo] = useState<IRepo | null>(null);
  const [getRepo, isRepoLoading, isError] = useFetch(async () => {
    const rep = await RepoService.getSingleRepo(params.owner!, params.repo!);
    setRepo(rep);
  });

  useEffect(() => {
    (getRepo as () => void)();
  }, []);

  if (isRepoLoading) {
    return <AppLoader />;
  }

  if (isError) {
    return <p>Something went wrong, please try to reload the page</p>;
  }

  return (
    <div className="single-repo">
      <section className="single-repo__head">
        <h2 className="page-title capitalized">{repo?.name}</h2>
        <p>Stars count {repo?.stargazers_count}</p>
        <p>Last commit on {formatDate(repo?.updated_at!)}</p>
      </section>
      <section className="single-repo__body">
        <div className="single-repo__avatar">
          <img src={repo?.owner.avatar_url} alt="Owner avatar" />
        </div>
        <ul className="single-repo__info">
          <li>
            <span className="repo-info__title">Owner</span>:{" "}
            <a href={repo?.owner.html_url} target="_blank" rel="noreferrer">
              {repo?.owner.login}
            </a>
          </li>
          <li>
            <span className="repo-info__title">Languages</span>:{" "}
            {repo?.languages?.map((lang, idx) => (
              <span key={lang}>
                {lang}
                {idx !== repo?.languages!.length - 1 ? "," : ""}{" "}
              </span>
            ))}
          </li>
          <li>
            <span className="repo-info__title">Description</span>:{" "}
            {repo?.description}
          </li>
          <li>
            <span className="repo-info__title">Contributors</span>:{" "}
            {repo?.contributors?.map((contr, idx) => (
              <span key={contr}>
                {contr}
                {idx !== repo?.contributors!.length - 1 ? "," : ""}{" "}
              </span>
            ))}
          </li>
        </ul>
      </section>
    </div>
  );
};
