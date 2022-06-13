import React, { FC } from 'react'
import { IRepo } from '../types/repoTypes'
import { RepositoryRow } from './RepositoryRow'

interface RepositoryTableProps {
    repos: IRepo[]
}

export const RepositoryTable:FC<RepositoryTableProps> = ({repos}) => {
  return (
    <table className='repository-table'>
        <thead>
            <tr>
                <th className='repository-table__cell repository-table__cell_header'>Repository name</th>
                <th className='repository-table__cell repository-table__cell_header'>Stars</th>
                <th className='repository-table__cell repository-table__cell_header'>Last commit date</th>
                <th className='repository-table__cell repository-table__cell_header'>Github link</th>
            </tr>
        </thead>
        <tbody>
            {repos.map(repo => <RepositoryRow key={repo.id} repo={repo} />)}
        </tbody>
    </table>
  )
}
