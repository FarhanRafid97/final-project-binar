import { useEffect, useState } from 'react';
import { Image, Flex } from '@chakra-ui/react';

import ReactPlayer from 'react-player';

const VideoPlayer = ({ vidTrailer, noVideo }) => {
  const sources = vidTrailer?.results[0]?.data?.max;

  // An hacky way to make react-player render only on client
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Flex>
      {isMounted && vidTrailer?.results[0]?.data?.max ? (
        <ReactPlayer
          url={sources}
          className="react-player"
          width="100%"
          height="100%"
          controls={true}
        />
      ) : (
        <Image
          w="500px"
          src={noVideo?.background_image}
          alt="thumnail from detail game"
        />
      )}
    </Flex>
  );
};

export default VideoPlayer;
