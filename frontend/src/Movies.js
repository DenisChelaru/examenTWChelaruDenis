import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';

export default function Movies() {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(0)
    async function refresh() {
        const res = await fetch("http://localhost:8080/movie", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sortBy: document.getElementById('sortby').value,
                filterBy: [
                    ["title", document.getElementById('filterTitle') ? document.getElementById('filterTitle').value : ""],
                    ["category", document.getElementById('filterCategory') ? document.getElementById('filterCategory').value : ""]
                ],
                page
            })
        })
        setMovies(await res.json())
    }
    useEffect(() => {
        refresh()
    }, [page])
    return <>
        <div id="searchOptions">
            <label htmlFor="sortby">Order by title</label>
            <select id="sortby" defaultValue={'ASC'} onChange={refresh}>
                <option value={'ASC'}>ASC</option>
                <option value={'DESC'}>DESC</option>
            </select>
            <label htmlFor="filterTitle">Filter title</label>
            <input type='text' id="filterTitle" onChange={refresh}/>
            <label htmlFor="filterCategory">Filter category</label>
            <input type='text' id="filterCategory" onChange={refresh}/>
        </div>
        <div id="page">
            <button onClick={() => setPage(page-1)}>{'<'}</button>
            <span>{page}</span>
            <button onClick={() => setPage(page+1)}>{'>'}</button>
        </div>
        <table><tbody>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Publication date</th>
            </tr>
            {movies.map(movie => <tr key={movie.id}>
                <td>{movie.id}</td>
                <td><Link to={'/movie/' + movie.id}>{movie.title}</Link></td>
                <td>{movie.category}</td>
                <td>{(new Date(movie.publication_date)).toDateString()}</td>
            </tr>)}
        </tbody></table>
    </>
}