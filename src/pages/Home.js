import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, chakra, Container, Flex, Heading, Image, Show, Text } from "@chakra-ui/react";

const Span = chakra("span");

export default function Home() {
  return (
    <Flex direction="column" bg="background" w="full" h="full" pos="relative">
      <Box as="header" py="4">
        <Container maxW="container.lg">
          <Flex justifyContent="space-between">
            <Text as={RouterLink} to="/" fontFamily="brand" fontSize="2xl">
              monument.ai
            </Text>
            <Text fontFamily="brand" fontSize="2xl" textTransform="uppercase">
              overnite
            </Text>
          </Flex>
        </Container>
      </Box>
      <Flex as="main" flex={1} pos="relative" zIndex={1}>
        <Container maxW="container.lg" mt="16" position="relative">
          <Show above="md">
            <Image src={require("assets/images/washington.jpg")} objectFit="cover" w={300} h={400} pos="absolute" top={0} right={180} />
            <Image src={require("assets/images/taj-mahal.jpg")} objectFit="cover" w={300} h={400} position="absolute" top="30%" right={4} />
          </Show>
          <Box mt="32" position="relative" zIndex={1}>
            <Heading size="2xl" lineHeight="short" maxW="xl">
              Real Time Monument Monitoring System
            </Heading>
            <Text color="text" maxW="md" lineHeight="tall" mt="4">
              AI based webapp that can track monuments from space. We present you our working prototype{" "}
              <Span fontFamily="brand" fontSize="xl">
                monument.ai
              </Span>
              &nbsp;for the competition -&nbsp;
              <Span fontFamily="brand" fontSize="xl">
                OVERNITE
              </Span>
            </Text>
            <Flex mt="8" gap="8">
              <Button as={RouterLink} to="/monitor" variant="solid" colorScheme="pink" borderRadius="none" rightIcon={<ArrowForwardIcon />}>
                See Demo
              </Button>
              <Button variant="link" colorScheme="white" borderRadius="none" rightIcon={<ArrowForwardIcon />}>
                Case Study
              </Button>
            </Flex>
          </Box>
        </Container>
      </Flex>
      <Heading fontSize="300" textTransform="uppercase" position="absolute" top="50%" opacity={0.02}>
        Overnite
      </Heading>
    </Flex>
  );
}
