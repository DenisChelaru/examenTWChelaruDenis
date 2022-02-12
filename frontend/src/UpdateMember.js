import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function UpdateMember() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ defaults, setDefaults ] = useState({id: '', movie: '', name: '', role: ''})
    const [ movies, setMovies ] = useState([])

    async function update() {
        const res = await fetch(`http://localhost:8080/member/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                movie: document.getElementById('movie').value,
                name: document.getElementById('name').value,
                role: document.getElementById('role').value
            })
        })
        alert((await res.json()).message)
    }
    async function deleteMember() {
        const res = await fetch(`http://localhost:8080/member/${id}`, {method: "DELETE"})
        if(res.status !== 200)
            alert((await res.json()).message)
        else
            navigate('/member')
    }
    useEffect(() => {
        async function load() {
            const res = await fetch(`http://localhost:8080/member/${id}`)
            if(res.status !== 200)
                alert((await res.json()).message)
            else
                setDefaults(await res.json())
            const res2 = await fetch(`http://localhost:8080/movie`, {method: 'POST'})
            if(res2.status !== 200)
                alert((await res2.json()).message)
            else
                setMovies(await res2.json())
        }
        load()
    }, [id])
    return <div id='form'>
        <label htmlFor='id'>ID</label>
        <input type='number' id='id' readOnly value={defaults.id} />
        <label htmlFor='movie'>Movie</label>
        <select id="movie" defaultValue={defaults.movie}>
            {movies.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
        </select>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' defaultValue={defaults.name} />
        <label htmlFor='role'>Role</label>
        <select id="role" defaultValue={defaults.role}>
            <option value="director">Director</option>
            <option value="writer">Writer</option>
            <option value="actor">Actor</option>
        </select>
        <button onClick={update}>Update</button>
        <button onClick={deleteMember}>Delete</button>
    </div>
}