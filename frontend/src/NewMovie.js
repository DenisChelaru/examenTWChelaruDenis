export default function NewMovie() {
    async function add() {
        const res = await fetch("http://localhost:8080/newmovie", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: document.getElementById('title').value,
                category: document.getElementById('category').value,
                publication_date: document.getElementById('publication_date').value
            })
        })
        alert((await res.json()).message)
    }
    return <div id='form'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' />
        <label htmlFor='category'>Category</label>
        <select id="category">
            <option value="action">Action</option>
            <option value="sf">SF</option>
            <option value="drama">Drama</option>
        </select>
        <label htmlFor='publication_date'>Publication date</label>
        <input type="date" id="publication_date" />
        <button onClick={add}>Add</button>
    </div>
}