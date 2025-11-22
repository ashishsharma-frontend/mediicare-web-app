import { Box, Heading, Text, Button, Image, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";

export function NotFoundPage() {
  return (
    <Box
      minH="100vh"
      bg="#fafbfc"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="'Inter', sans-serif"
      px={4}
    >
      <VStack
        spacing={8}
        textAlign="center"
        maxW="600px"
        w="100%"
        py={10}
      >
        {/* Error Code */}
        <Box position="relative">
          <Text
            fontSize={{ base: "120px", md: "180px" }}
            fontWeight="800"
            color="#f1f5f9"
            lineHeight="1"
            letterSpacing="-0.02em"
            fontFamily="var(--font-primary)"
          >
            404
          </Text>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="#2563eb"
            p={4}
            borderRadius="12px"
            boxShadow="0 4px 12px rgba(37, 99, 235, 0.2)"
          >
            <FaSearch size="24px" color="#ffffff" />
          </Box>
        </Box>

        {/* Main Message */}
        <VStack spacing={4}>
          <Heading
            as="h1"
            fontSize={{ base: "24px", md: "32px" }}
            fontWeight="700"
            color="#0f172a"
            lineHeight="1.2"
            fontFamily="var(--font-primary)"
          >
            Page Not Found
          </Heading>
          
          <Text
            color="#475569"
            fontSize={{ base: "16px", md: "18px" }}
            lineHeight="1.6"
            maxW="480px"
            fontFamily="var(--font-primary)"
          >
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to where you need to be.
          </Text>
        </VStack>

        {/* Action Buttons */}
        <HStack spacing={4} flexWrap="wrap" justify="center">
          <Button
            as={Link}
            to="/"
            bg="#2563eb"
            color="#ffffff"
            _hover={{ bg: "#1d4ed8", transform: "translateY(-1px)" }}
            _active={{ bg: "#1e40af" }}
            size="lg"
            borderRadius="8px"
            fontWeight="600"
            fontFamily="var(--font-button)"
            leftIcon={<FaHome size="16px" />}
            boxShadow="0 1px 3px rgba(0,0,0,0.1)"
            transition="all 0.2s ease"
          >
            Go Home
          </Button>
          
          <Button
            onClick={() => window.history.back()}
            bg="#ffffff"
            color="#475569"
            border="1px solid #e2e8f0"
            _hover={{ 
              bg: "#f8fafc", 
              borderColor: "#cbd5e1",
              transform: "translateY(-1px)"
            }}
            _active={{ bg: "#f1f5f9" }}
            size="lg"
            borderRadius="8px"
            fontWeight="600"
            fontFamily="var(--font-button)"
            leftIcon={<FaArrowLeft size="14px" />}
            transition="all 0.2s ease"
          >
            Go Back
          </Button>
        </HStack>

        {/* Additional Help */}
        <Box
          mt={8}
          p={6}
          bg="#ffffff"
          borderRadius="12px"
          border="1px solid #f1f5f9"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          w="100%"
        >
          <VStack spacing={3}>
            <Text
              fontSize="14px"
              fontWeight="600"
              color="#0f172a"
              fontFamily="var(--font-primary)"
            >
              Need Help?
            </Text>
            <Text
              fontSize="13px"
              color="#64748b"
              lineHeight="1.5"
              textAlign="center"
              fontFamily="var(--font-primary)"
            >
              If you believe this is an error or need assistance finding what you're looking for, 
              please contact our support team.
            </Text>
            <HStack spacing={6} mt={2}>
              <Button
                as={Link}
                to="/doctors"
                variant="ghost"
                size="sm"
                color="#2563eb"
                fontWeight="500"
                fontFamily="var(--font-button)"
                _hover={{ bg: "rgba(37, 99, 235, 0.08)" }}
              >
                Find Doctors
              </Button>
              <Button
                as={Link}
                to="/clinics"
                variant="ghost"
                size="sm"
                color="#2563eb"
                fontWeight="500"
                fontFamily="var(--font-button)"
                _hover={{ bg: "rgba(37, 99, 235, 0.08)" }}
              >
                View Clinics
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Decorative Elements */}
        <Box position="absolute" top="10%" left="10%" opacity={0.1} zIndex={-1}>
          <Box
            w="200px"
            h="200px"
            borderRadius="50%"
            bg="linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
            filter="blur(60px)"
          />
        </Box>
        <Box position="absolute" bottom="20%" right="15%" opacity={0.1} zIndex={-1}>
          <Box
            w="150px"
            h="150px"
            borderRadius="50%"
            bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            filter="blur(40px)"
          />
        </Box>
      </VStack>
    </Box>
  );
}