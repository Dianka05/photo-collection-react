import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Collection from './components/Collection'

const category = [
  { "name": "All" },
  { "name": "Sea" },
  { "name": "Mountains" },
  { "name": "Architecture" },
  { "name": "Cities" },
]


function App() {
  const [collections, setCollections] = useState([])
  const [searchValue , setSearchValue] = useState('')
  const [categoryId, setCategoryId] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const category = categoryId ? `category=${categoryId}` : '';
    fetch(`https://66a51a585dc27a3c190aa98b.mockapi.io/photo_collections?page=${page}&limit=4&${category}`)
     .then(res => res.json())
     .then(json => {setCollections(json)}).catch(error => {console.error('Error:', error)
     }).finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {category.map((category, index) => <li className={categoryId === index ? 'active' : ''} key={index} onClick={() => setCategoryId(index)} >{category.name}</li>)}
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Search by name" />
      </div>
      <div className="content">
        { isLoading ? (<h2>Loading...</h2>) : (
          collections.filter(collection => collection.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map(collection => {
            return <Collection 
              key={collection.name}
              name={collection.name}
              images={collection.photos}
            />
          })
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, index) => (
          <li onClick={() => setPage(index + 1)} className={page === (index + 1) ? 'active' : ''} >{index + 1}</li>
        ))
        }
      </ul>
    </div>
  )
}

export default App
