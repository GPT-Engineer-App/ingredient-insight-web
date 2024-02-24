import React, { useRef, useState } from "react";
import { Box, Button, Container, Heading, Text, VStack, Image, List, ListItem, ListIcon, useToast } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
// Removed unused CheckCircleIcon import from @chakra-ui/icons

const Index = () => {
  const videoRef = useRef(null);
  const [streamStarted, setStreamStarted] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const toast = useToast();

  const getVideoStream = async () => {
    try {
      if (navigator && navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((error) => {
            console.error("Error attempting to play the video stream.", error);
            toast({
              title: "Error",
              description: "There was an issue playing the video stream.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
        } else {
          throw new Error("Video reference is not available.");
        }
      } else {
        throw new Error("MediaDevices not supported.");
      }
      setStreamStarted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access the camera.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const captureImage = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imageSrc = canvas.toDataURL("image/png");
    setCapturedImage(imageSrc);
    // Stop all video streams.
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setStreamStarted(false);
    // TODO: Send imageSrc to the backend and get ingredients.
    // Mocked response:
    setIngredients([
      { name: "Ingredient 1", risk: "High", reason: "Reason for risk 1" },
      { name: "Ingredient 2", risk: "Medium", reason: "Reason for risk 2" },
      { name: "Ingredient 3", risk: "Low", reason: "Reason for risk 3" },
    ]);
  };

  return (
    <Container centerContent>
      <VStack spacing={8} marginY={8}>
        <Heading>Detect Ingredients</Heading>
        <Text>Find out what's in your products!</Text>
        {!streamStarted && (
          <Button leftIcon={<FaCamera />} colorScheme="teal" onClick={getVideoStream}>
            Start Camera
          </Button>
        )}
        {streamStarted && (
          <Box position="relative" boxShadow="md" borderRadius="md" overflow="hidden">
            <video ref={videoRef} width="100%" style={{ borderRadius: "md" }} />
            <Button position="absolute" bottom="4" left="50%" transform="translateX(-50%)" onClick={captureImage}>
              Capture
            </Button>
          </Box>
        )}
        {capturedImage && <Image boxSize="100%" src={capturedImage} alt="Captured product" />}
        <Heading size="md">Ingredients Analysis</Heading>
        <List spacing={3}>
          {ingredients.map((ingredient, index) => (
            <ListItem key={index} paddingBottom={2} borderBottomWidth={1} borderBottomColor="gray.200">
              <Heading size="sm">{ingredient.name}</Heading>
              <Text color={ingredient.risk === "High" ? "red.500" : ingredient.risk === "Medium" ? "orange.300" : "green.500"}>{ingredient.risk} Risk</Text>
              <Text fontSize="sm">{ingredient.reason}</Text>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
