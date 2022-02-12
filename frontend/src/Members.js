import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';


export default function Members() {
    const [members, setMembers] = useState([])
    useEffect(() => {
        async function refresh() {
            const res = await fetch("http://localhost:8080/member", { method: "POST" })
            setMembers(await res.json())
        }
        refresh()
    }, [])
    return <>
        <table><tbody>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Movie</th>
            </tr>
            {members.map(crewMember => <tr key={crewMember.id}>
                <td>{crewMember.id}</td>
                <td><Link to={`/movie/${crewMember.movie}/member/${crewMember.id}`}>{crewMember.name}</Link></td>
                <td>{crewMember.role}</td>
                <td>{crewMember.movie}</td>
            </tr>)}
        </tbody></table>
    </>
}