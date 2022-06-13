import React, { FC } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dates";
import { IRepo } from "../types/repoTypes";

interface RepositoryRowProps {
  repo: IRepo;
}

export const RepositoryRow: FC<RepositoryRowProps> = ({ repo }) => {
  return (
    <tr>
      <td className="repository-table__cell">
        <Link
          className="repo-link"
          to={`repos/${repo.owner.login}/${repo.name}`}
        >
          {repo.name}
        </Link>
      </td>
      <td className="repository-table__cell">{repo.stargazers_count}</td>
      <td className="repository-table__cell">{formatDate(repo.updated_at)}</td>
      <td className="repository-table__cell">
        <a target="_blank" href={repo.html_url} rel="noreferrer">
          View on Github
        </a>
      </td>
    </tr>
  );
};
