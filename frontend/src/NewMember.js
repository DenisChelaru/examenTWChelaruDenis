import { useEffect, useState } from "react"

export default function NewMember() {
    const [movies, setMovies] = useState([])
    async function add() {
        const res = await fetch("http://localhost:8080/newmember", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                role: document.getElementById('role').value,
                movie: document.getElementById('movie').value
            })
        })
        alert((await res.json()).message)
    }
    useEffect(() => {
        async function refresh() {
            const res = await fetch("http://localhost:8080/movie", { method: "POST" })
            setMovies(await res.json())
        }
        refresh()
    }, [])
    return <div id='form'>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' />
        <label htmlFor='role'>Role</label>
        <select id="role">
            <option value="director">Director</option>
            <option value="writer">Writer</option>
            <option value="actor">Actor</option>
        </select>
        <label htmlFor='movie'>Movie</label>
        <select id="movie">
            {movies.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
        </select>
        <button onClick={add}>Add</button>
    </div>
}