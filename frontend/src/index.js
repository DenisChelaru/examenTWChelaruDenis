import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import NewMovie from './NewMovie'
import Movies from './Movies'
import UpdateMovie from './UpdateMovie'
import Members from './Members'
import UpdateMember from './UpdateMember'
import NewMember from './NewMember'

ReactDOM.render(
    <React.StrictMode>
    	<BrowserRouter>
			<nav>
				<Link to={'/movie'}>Movies</Link>
				<Link to={'/movie/new'}>New movie</Link>
				<Link to={'/member'}>Members</Link>
				<Link to={'/member/new'}>New member</Link>
			</nav>
			<main>
				<Routes>
					<Route path='/' element={'Default page'} />
					<Route path='/movie' element={<Movies />} />
					<Route path='/movie/new' element={<NewMovie />} />
					<Route path='/movie/:id' element={<UpdateMovie />} />
					<Route path='/member' element={<Members />} />
					<Route path='/member/new' element={<NewMember />} />
					<Route path='/movie/:movie/member/:id' element={<UpdateMember />} />
				</Routes>
			</main>
		</BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
