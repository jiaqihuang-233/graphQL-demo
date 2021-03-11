import { Box, Image } from '@chakra-ui/react';
import { Game } from '../../../graphql/resolvers-types';
import { StarIcon } from '@chakra-ui/icons';
type GameBoxProps = {
  game: Game;
};
export default function GameBox({ game }: GameBoxProps) {
  const { imageUrl, averageRating, price, title } = game;
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" width='180px'>
      <Image
        boxSize="150px"
        p={1}
        objectFit="contain"
        src={imageUrl || undefined}
        alt={title}
        width='150px'
        margin='auto'
      />
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>

        <Box>${price}</Box>

        {averageRating && (
          <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < averageRating ? 'teal' : 'gray'}
                />
              ))}
          </Box>
        )}
      </Box>
    </Box>
    //</Box>
  );
}
