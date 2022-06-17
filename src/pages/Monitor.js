import axios from "axios";
import { useDropzone } from "react-dropzone";
import { RepeatIcon } from "@chakra-ui/icons";
import { useEffect, useState, useCallback } from "react";
import { Box, Button, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function Monitor() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: { "image/png": [".png", ".jpg"] }, maxFiles: 1 });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!acceptedFiles.length) return;

    const objectURL = URL.createObjectURL(acceptedFiles[0]);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [acceptedFiles]);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      console.log(event.code);
      if (event.code === "Escape") setResult(null);
    });
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const reader = new FileReader();
      console.log(acceptedFiles);
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = async () => {
        const image = reader.result;
        const res = await axios({
          method: "POST",
          url: "https://detect.roboflow.com/monument-monitoring-5qa2y/1",
          params: {
            api_key: "Tv2qHYjlxZuHqF63trqm",
          },
          data: image,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        console.log(res.data);
        setResult(res.data);
        alert("Analyzed");
      };
    } catch (e) {
      const error = e.response ? e.response.data.error : e.message;
      window.alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex direction="column" bg="background" w="full" h="full" pos="relative">
        <Box as="header" py="4">
          <Container maxW="container.lg">
            <Flex justifyContent="space-between">
              <Text fontFamily="brand" fontSize="2xl">
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
            <Box>
              <Box borderWidth={1} borderStyle="dashed" bg="gray.700">
                <Box p="8" {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <Text textAlign="center">Drag 'n' drop an image here, or click to select an image</Text>
                </Box>
              </Box>
              <Flex mt="8" gap="12">
                <Box flex={1}>
                  <Heading size="sm">Image</Heading>
                  {preview && <Image src={preview} w="full" h="auto" objectFit="contain" mt="8" />}
                </Box>
                <Box flex={1}>
                  <Heading size="sm">Result</Heading>
                  <Box pos="relative" zIndex={2}>
                    {result && <Image src={preview} top="0" left="0" pos="fixed" w="full" h="full" objectFit="cover" />}
                    {result && (
                      <Text
                        pos="fixed"
                        size="2xl"
                        top={window.innerHeight - result.predictions[0].y + 10}
                        left={window.innerWidth - result.predictions[0].x + 10}
                      >
                        {result.predictions[0].class}
                      </Text>
                    )}
                    {result && (
                      <Box
                        pos="fixed"
                        border="4px"
                        borderStart="solid"
                        borderColor="yellow.600"
                        top={window.innerHeight - result.predictions[0].y}
                        left={window.innerWidth - result.predictions[0].x}
                        height={result.predictions[0].height}
                        width={result.predictions[0].width}
                      ></Box>
                    )}
                  </Box>
                </Box>
              </Flex>
              <Box mt="8">
                <Button
                  isLoading={loading}
                  loadingText="Analysing The Image"
                  isDisabled={!acceptedFiles.length}
                  colorScheme="pink"
                  variant="solid"
                  onClick={handleSubmit}
                  rightIcon={<RepeatIcon />}
                >
                  Detect Monument from Image
                </Button>
              </Box>
            </Box>
          </Container>
        </Flex>
      </Flex>
    </>
  );
}
