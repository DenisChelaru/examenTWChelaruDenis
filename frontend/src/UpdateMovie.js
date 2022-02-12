import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function UpdateMovie() {
    const { id } = useParams()
    const [ defaults, setDefaults ] = useState({})
    const navigate = useNavigate()
    async function update() {
        const res = await fetch(`http://localhost:8080/movie/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: document.getElementById('title').value,
                category: document.getElementById('category').value,
                publication_date: document.getElementById('publication_date').value
            })
        })
        alert((await res.json()).message)
    }
    async function deleteMovie() {
        const res = await fetch(`http://localhost:8080/movie/${id}`, {method: "DELETE"})
        if(res.status !== 200)
            alert((await res.json()).message)
        else
            navigate('/movie')
    }
    
    useEffect(() => {
        async function load() {
            const res = await fetch(`http://localhost:8080/movie/${id}`)
            if(res.status !== 200)
                alert((await res.json()).message)
            else
                setDefaults(await res.json())
        }
        load()
    }, [id])
    return <div id='form'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' defaultValue={defaults.title}/>
        <label htmlFor='category'>Category</label>
        <select id="category" defaultValue={defaults.category}>
            <option value="action">Action</option>
            <option value="sf">SF</option>
            <option value="drama">Drama</option>
        </select>
        <label htmlFor='publication_date'>Publication date</label>
        <input type="date" id="publication_date"/>
        <button onClick={update}>Update</button>
        <button onClick={deleteMovie}>Delete</button>
    </div>
}