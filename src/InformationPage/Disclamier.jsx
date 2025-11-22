import React from 'react';
import { 
  Box, 
  Container, 
  Text, 
  VStack, 
  Heading,
  Divider,
  Alert,
  AlertIcon,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import { MdWarning, MdInfo } from "react-icons/md";

function Disclaimer() {
  return (
    <Box bg="#fafafa" minH="100vh" py={8}>
      <Container maxW="800px" px={{ base: 4, md: 6 }}>
        <Box bg="white" borderRadius="12px" p={{ base: 6, md: 8 }} boxShadow="0 2px 8px rgba(0,0,0,0.06)">
          <VStack spacing={6} align="start" w="full">
            {/* Header */}
            <Box>
              <Heading
                fontSize="clamp(1.8rem, 4vw, 2.2rem)"
                fontWeight="600"
                color="#333"
                mb={2}
              >
                Medical Disclaimer
              </Heading>
              <Text
                fontSize="clamp(0.9rem, 2vw, 1rem)"
                color="#666"
                fontWeight="500"
              >
                Important Health Information Notice
              </Text>
            </Box>

            <Divider borderColor="#e5e5e5" />

            {/* Warning Alert */}
            <Alert status="warning" borderRadius="10px" bg="#fff8e1" borderColor="#ffcc02" p={4}>
              <AlertIcon as={MdWarning} color="#f57c00" />
              <Box>
                <Text
                  fontSize="clamp(0.95rem, 2vw, 1.05rem)"
                  color="#e65100"
                  fontWeight="600"
                  mb={2}
                >
                  Medical Advice Disclaimer
                </Text>
                <Text
                  fontSize="clamp(0.9rem, 2vw, 1rem)"
                  color="#ef6c00"
                  lineHeight="1.5"
                >
                  The information provided on this platform is for informational purposes only and should not replace professional medical advice.
                </Text>
              </Box>
            </Alert>

            {/* General Information */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                General Information
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
                mb={4}
              >
                Our healthcare platform serves as a bridge between patients and healthcare providers. While we strive to provide accurate and up-to-date information, this content is not intended as a substitute for professional medical consultation, diagnosis, or treatment.
              </Text>
            </Box>

            {/* Professional Consultation */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Professional Medical Consultation
              </Heading>
              <List spacing={3}>
                <ListItem display="flex" alignItems="start" gap={2}>
                  <ListIcon as={MdInfo} color="#2196F3" mt={1} />
                  <Text
                    fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                    color="#555"
                    lineHeight="1.6"
                  >
                    Always consult with qualified healthcare professionals for medical advice
                  </Text>
                </ListItem>
                <ListItem display="flex" alignItems="start" gap={2}>
                  <ListIcon as={MdInfo} color="#2196F3" mt={1} />
                  <Text
                    fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                    color="#555"
                    lineHeight="1.6"
                  >
                    Never disregard professional medical advice based on information from this platform
                  </Text>
                </ListItem>
                <ListItem display="flex" alignItems="start" gap={2}>
                  <ListIcon as={MdInfo} color="#2196F3" mt={1} />
                  <Text
                    fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                    color="#555"
                    lineHeight="1.6"
                  >
                    Seek immediate medical attention for urgent health concerns
                  </Text>
                </ListItem>
              </List>
            </Box>

            {/* Platform Limitations */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Platform Limitations
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
                mb={3}
              >
                While our platform facilitates connections with healthcare providers and offers various health-related services:
              </Text>
              <List spacing={3}>
                <ListItem display="flex" alignItems="start" gap={2}>
                  <Text fontSize="16px" color="#666">•</Text>
                  <Text
                    fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                    color="#555"
                    lineHeight="1.6"
                  >
                    We do not provide direct medical diagnosis or treatment
                  </Text>
                </ListItem>
                <ListItem display="flex" alignItems="start" gap={2}>
                  <Text fontSize="16px" color="#666">•</Text>
                  <Text
                    fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                    color="#555"
                    lineHeight="1.6"
                  >
                    Information accuracy depends on healthcare providers and users
                  </Text>
                </ListItem>
                <ListItem display="flex" alignItems="start" gap={2}>
                  <Text fontSize="16px" color="#666">•</Text>
                  <Text
                    fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                    color="#555"
                    lineHeight="1.6"
                  >
                    Technical issues may occasionally affect service availability
                  </Text>
                </ListItem>
              </List>
            </Box>

            {/* Emergency Notice */}
            <Alert status="error" borderRadius="10px" bg="#ffebee" borderColor="#f8bbd9" p={4}>
              <AlertIcon color="#c62828" />
              <Box>
                <Text
                  fontSize="clamp(0.95rem, 2vw, 1.05rem)"
                  color="#c62828"
                  fontWeight="600"
                  mb={1}
                >
                  Emergency Situations
                </Text>
                <Text
                  fontSize="clamp(0.9rem, 2vw, 1rem)"
                  color="#c62828"
                  lineHeight="1.5"
                >
                  For medical emergencies, immediately contact local emergency services or visit the nearest hospital. Do not rely on this platform for emergency care.
                </Text>
              </Box>
            </Alert>

            {/* User Responsibility */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                User Responsibility
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
              >
                Users are responsible for verifying healthcare provider credentials, making informed decisions about their care, and maintaining the confidentiality of their health information when using our platform.
              </Text>
            </Box>

            <Divider borderColor="#e5e5e5" />

            {/* Footer */}
            <Box bg="#f8f8f8" p={4} borderRadius="8px" w="full">
              <Text
                fontSize="clamp(0.9rem, 2vw, 1rem)"
                color="#555"
                lineHeight="1.6"
                textAlign="center"
                fontStyle="italic"
              >
                By using this platform, you acknowledge that you have read and understood this disclaimer and agree to use the services responsibly.
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default Disclaimer;