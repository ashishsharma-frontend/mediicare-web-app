import React from 'react';
import { 
  Box, 
  Container, 
  Text, 
  VStack, 
  Heading,
  Divider,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

function TermCondition() {
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
                Terms & Conditions
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
                Welcome to <Text as="span" fontWeight="600" color="#333">[Your Healthcare Platform Name]</Text>. By using our services, you agree to the following terms:
              </Text>
            </Box>

            {/* Eligibility */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Eligibility
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
              >
                Users must be at least 18 years old or have parental consent to use our platform and services.
              </Text>
            </Box>

            {/* Service Use */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Service Usage
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
                mb={3}
              >
                Our platform is designed for healthcare consultations and product purchases. Any misuse of the platform is strictly prohibited.
              </Text>
              <Alert status="warning" borderRadius="8px" bg="#fff3cd" borderColor="#ffeaa7" mb={3}>
                <AlertIcon color="#856404" />
                <Text
                  fontSize="clamp(0.9rem, 2vw, 1rem)"
                  color="#856404"
                  fontWeight="500"
                >
                  Unauthorized use may result in account suspension or termination.
                </Text>
              </Alert>
            </Box>

            {/* Payments */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Payment Terms
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
                mb={2}
              >
                All transactions are final unless otherwise stated in our refund policy.
              </Text>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
              >
                Payment details are handled securely through encrypted channels to protect your financial information.
              </Text>
            </Box>

            {/* Liability */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Liability Limitation
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
                mb={3}
              >
                We are not liable for any indirect damages arising from service use.
              </Text>
              <Alert status="info" borderRadius="8px" bg="#e1f5fe" borderColor="#b3e5fc">
                <AlertIcon color="#0277bd" />
                <Text
                  fontSize="clamp(0.9rem, 2vw, 1rem)"
                  color="#0277bd"
                  fontWeight="500"
                >
                  Always consult a qualified medical professional for personalized medical advice.
                </Text>
              </Alert>
            </Box>

            {/* Changes to Terms */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Terms Updates
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
              >
                We may update these terms periodically. Notifications will be provided as needed, and continued use constitutes acceptance of updated terms.
              </Text>
            </Box>

            {/* Violations */}
            <Box>
              <Heading
                fontSize="clamp(1.2rem, 3vw, 1.4rem)"
                fontWeight="600"
                color="#333"
                mb={3}
              >
                Policy Violations
              </Heading>
              <Text
                fontSize="clamp(0.95rem, 2.5vw, 1.05rem)"
                color="#555"
                lineHeight="1.6"
              >
                Violations of these terms may result in account suspension or termination without prior notice.
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
                For clarification or questions about these terms, contact us at{" "}
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

export default TermCondition;