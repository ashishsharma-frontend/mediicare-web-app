import React from 'react';
import { 
  Box, 
  Container, 
  Text, 
  VStack, 
  Heading,
  Divider,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

function PrivacyPolicy() {
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
                Privacy Policy
              </Heading>
              <Text
                fontSize="clamp(0.9rem, 2vw, 1rem)"
                color="#666"
                fontWeight="500"
              >
                Last Updated: August 26, 2025
              </Text>
            </Box>

            <Divider borderColor="#e5e5e5" />

            {/* Introduction */}
            <Box>
              <Text
                fontSize="clamp(1rem, 2.5vw, 1.1rem)"
                color="#555"
                lineHeight="1.6"
              >
                We at <Text as="span" fontWeight="600" color="#333">[Your Healthcare Platform Name]</Text> are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information.
              </Text>
            </Box>

            {/* Information Collection */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Information Collection
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
              >
                We collect personal data (e.g., name, contact details) and health-related information with your consent for appointment booking and treatment purposes.
              </Text>
            </Box>

            {/* Usage */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                How We Use Your Information
              </Heading>
              <List spacing={2}>
                <ListItem display="flex" alignItems="start" gap={2}>
                  <ListIcon as={MdCheckCircle} color="#4CAF50" mt={1} />
                  <Text
                    fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                    color="#555"
                    lineHeight="1.6"
                  >
                    Provide healthcare services and manage appointments
                  </Text>
                </ListItem>
                <ListItem display="flex" alignItems="start" gap={2}>
                  <ListIcon as={MdCheckCircle} color="#4CAF50" mt={1} />
                  <Text
                    fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                    color="#555"
                    lineHeight="1.6"
                  >
                    Improve our platform and user experience
                  </Text>
                </ListItem>
                <ListItem display="flex" alignItems="start" gap={2}>
                  <ListIcon as={MdCheckCircle} color="#4CAF50" mt={1} />
                  <Text
                    fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                    color="#555"
                    lineHeight="1.6"
                  >
                    Communicate important updates and information
                  </Text>
                </ListItem>
              </List>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
                mt={3}
              >
                <Text as="span" fontWeight="600" color="#333">Important:</Text> We do not sell your information to third parties.
              </Text>
            </Box>

            {/* Security */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Data Security
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
              >
                We employ industry-standard encryption and security measures to protect your data from unauthorized access, disclosure, or misuse.
              </Text>
            </Box>

            {/* Your Rights */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Your Rights
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
              >
                You can access, update, or request deletion of your data by contacting us at{" "}
                <Text as="span" color="#007acc" fontWeight="500">
                  support@yourplatform.com
                </Text>
              </Text>
            </Box>

            {/* Cookies */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Cookies Policy
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
              >
                We use cookies to enhance your experience, with options to manage preferences through your browser settings.
              </Text>
            </Box>

            <Divider borderColor="#e5e5e5" />

            {/* Contact */}
            <Box bg="#f8f8f8" p={4} borderRadius="8px" w="full">
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
                textAlign="center"
              >
                For more details or inquiries, reach out to our support team at{" "}
                <Text as="span" color="#007acc" fontWeight="500">
                  support@yourplatform.com
                </Text>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default PrivacyPolicy;