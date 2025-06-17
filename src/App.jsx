import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
   const [photos, setPhotos] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [fetching, setFetching] = useState(true);
   const [totalCount, setTotalCount] = useState(0);

   useEffect(() => {
      if (fetching) {
         axios(`https://jsonplaceholder.typicode.com/photos?_limit=10_page=${currentPage}`)
            .then(res => {
               setPhotos([...photos, ...res.data]);
               setCurrentPage(prev => prev + 1);
               setTotalCount(+res.headers['x-total-count']);
            })
            .finally(() => setFetching(false));
      }
   }, [fetching]);

   useEffect(() => {
      document.addEventListener('scroll', scrollHandler);

      return () => {
         document.removeEventListener('scroll', scrollHandler);
      };
   }, [totalCount]);

   const scrollHandler = e => {
      if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && photos.length < totalCount) {
         setFetching(true);
      }
   };

   return (
      <div className="photos">
         {photos.map(photo => (
            <div key={photo.id} className="photo">
               <div className="photo-name">
                  {photo.id}. {photo.title}
               </div>
               <img className="photo-image" src={photo.thumbnailUrl} alt="" />
            </div>
         ))}
      </div>
   );
}

export default App;
