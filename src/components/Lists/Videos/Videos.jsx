import { v4 } from 'uuid';

// Icons
import { CgRemove } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';

// Hooks
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

const Videos = ({ setActive, setVideo, darkMode }) => {
  // Fetch de todos os videos
  const { documents: videos, loading } = useFetchDocuments('videos');
  const { documents: categories } = useFetchDocuments('categories');

  // Função de deletar documentos
  const { deleteVideo } = useDeleteDocument('videos');

  const handleEdit = (video) => {
    setActive(true);
    setVideo(video);
  };

  if (loading) {
    return <p> carregando ...</p>;
  }

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8'>
      {videos && videos.length > 0 && (
        <div>
          {categories &&
            categories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <div key={v4()} className='mb-8'>
                  <h1
                    className={`text-2xl pl-2 uppercase font-bold mb-2 ${
                      darkMode ? 'text-cWhite' : 'text-cGreen'
                    }`}>
                    {category.name}
                  </h1>
                  {videos &&
                    videos.map((video) => {
                      if (video.category === category.name.toLowerCase()) {
                        return (
                          <div
                            key={v4()}
                            className={`flex justify-between items-center p-4 mb-2 rounded-md ${
                              darkMode ? 'bg-cLtBlack' : 'bg-cDkWhite'
                            }`}>
                            <p
                              className={`max-w-4/5 ${
                                darkMode ? 'text-cWhite' : 'text-cDkBlack'
                              }`}>
                              {video.title}
                            </p>
                            <div className='flex gap-4 w-1/5 justify-end'>
                              <button
                                type='button'
                                className=' text-cGreen text-lg'>
                                <HiOutlinePencilAlt
                                  onClick={() => handleEdit(video)}
                                />
                              </button>
                              <button
                                type='button'
                                className='text-cRed'
                                onClick={() => {
                                  deleteVideo(
                                    video.id,
                                    video.videoname,
                                    video.filename
                                  );
                                }}>
                                <CgRemove />
                              </button>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              ))}
        </div>
      )}
      {videos && videos.length === 0 && (
        <p className='w-full  text-center text-lg mt-20'>
          Nenhum vídeo cadastrado.
        </p>
      )}
    </div>
  );
};

export default Videos;
