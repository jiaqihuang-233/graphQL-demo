import { Box, Image, Flex } from '@chakra-ui/react';
import { Review } from '../../../graphql/resolvers-types';
import { StarIcon } from '@chakra-ui/icons';

type ReviewBoxProps = {
  review: Review;
  showReviewer: boolean;
  truncate?: boolean;
};
export default function ReviewBox({ review, showReviewer, truncate }: ReviewBoxProps) {
  const { game, rating, comment, dateCreated, reviewer } = review;

  const date = new Date(dateCreated);
  if (!game) return null;
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      flexDirection="column"
      alignItems="center"
      shadow="md"
      m={2}
    >
      <Box>
        <Flex>
          <Box m={2}>
            <Image
              src={game.imageUrl || undefined}
              alt={game.title}
              boxSize="100px"
              objectFit="contain"
              width="100px"
              margin="auto"
            />
            <Box
              m={2}
              fontWeight="semibold"
              fontSize="md"
              lineHeight="tight"
              isTruncated
              textAlign="center"
            >
              {game.title}
            </Box>
          </Box>

          <Box p={2}>
            {rating && (
              <Box d="flex" mt="2" alignItems="center" p={2}>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon key={i} color={i < rating ? 'teal' : 'gray'} />
                  ))}
              </Box>
            )}
            {showReviewer && (
              <Box
                p={2}
                fontWeight="semibold"
                fontSize="sm"
                lineHeight="tight"
                isTruncated
              >
                {reviewer.name}
              </Box>
            )}
            <Box p={2} fontSize="sm">
              {date.toDateString()}
            </Box>
          </Box>
        </Flex>
        <Box p={2}>{ truncate ? (comment.substring(0, 150) + '...') : comment}</Box>
      </Box>
    </Flex>
  );
}
