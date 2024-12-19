import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../Components'
import { useState, useEffect } from 'react'


function AllPosts() {  //These all post won't get to us so we will make query
  const [posts, setPosts] = useState([])
  useEffect(() => { }, [])
  appwriteService.getPosts([])
    .then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map(
            (post) => (
              <div key={post.$id} className='p-2 w-1/4'>
                <PostCard post={post} />
              </div>
            )
          )}
        </div>

      </Container>
    </div>
  )
}

export default AllPosts;