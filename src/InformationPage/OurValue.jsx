import React from "react";
import { 
  Box, 
  Container, 
  Text, 
  VStack, 
  Heading,
  Divider,
  Grid,
  GridItem,
  Flex
} from "@chakra-ui/react";
import {
  MdVerifiedUser,
  MdFavorite,
  MdVisibility,
  MdLightbulb,  // Changed from MdInnovation to MdLightbulb
  MdStar,
  MdSpeed
} from "react-icons/md";

export default function OurValue() {
  const values = [
    {
      icon: MdVerifiedUser,
      title: "Integrity",
      description: "We ensure honesty in product details, clinic services, and dashboard data, earning your trust."
    },
    {
      icon: MdFavorite,
      title: "Compassion",
      description: "We prioritize patient and provider well-being with empathetic care and support."
    },
    {
      icon: MdVisibility,
      title: "Transparency",
      description: "We provide clear insights into products, treatments, and analytics, debunking myths with evidence."
    },
    {
      icon: MdLightbulb,  // Updated to use the new import
      title: "Innovation",
      description: "We use technology to enhance e-commerce, streamline dashboards, and enable live interactions."
    },
    {
      icon: MdStar,
      title: "Excellence",
      description: "We deliver high-quality products, services, and tools to exceed expectations."
    },
    {
      icon: MdSpeed,
      title: "Performance",
      description: "We optimize efficiency and results in clinic operations, dashboard functionality, and live support for a superior experience."
    }
  ];
  return (
    <Box bg="#fafafa" minH="100vh" py={8}>
      <Container maxW="1000px" px={{ base: 4, md: 6 }}>
        <Box bg="white" borderRadius="12px" p={{ base: 6, md: 8 }} boxShadow="0 2px 8px rgba(0,0,0,0.06)">
          <VStack spacing={8} align="start" w="full">
            {/* Header */}
            <Box textAlign="center" w="full">
              <Heading
                fontSize="clamp(1.8rem, 4vw, 2.2rem)"
                fontWeight="600"
                color="#333"
                mb={4}
              >
                Our Values
              </Heading>
              <Text
                fontSize="clamp(1rem, 2.5vw, 1.15rem)"
                color="#555"
                lineHeight="1.6"
                maxW="800px"
                mx="auto"
              >
                Our healthcare platform is built on principles that empower doctors, patients, and clinics through seamless integration of e-commerce, dashboards, and live support.
              </Text>
            </Box>

            <Divider borderColor="#e5e5e5" />

            {/* Values Grid */}
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
              gap={6} 
              w="full"
            >
              {values.map((value, index) => (
                <GridItem key={index}>
                  <Box
                    bg="#f9f9f9"
                    p={5}
                    borderRadius="10px"
                    border="1px solid #f0f0f0"
                    transition="all 0.2s ease"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                    }}
                    h="full"
                  >
                    <Flex direction="column" h="full">
                      {/* Icon and Title */}
                      <Flex align="center" gap={3} mb={3}>
                        <Box
                          p={2}
                          bg="white"
                          borderRadius="8px"
                          border="1px solid #e5e5e5"
                        >
                          <value.icon size="20px" color="#333" />
                        </Box>
                        <Heading
                          fontSize="clamp(1.1rem, 2.5vw, 1.25rem)"
                          fontWeight="600"
                          color="#333"
                        >
                          {value.title}
                        </Heading>
                      </Flex>

                      {/* Description */}
                      <Text
                        fontSize="clamp(0.95rem, 2vw, 1.05rem)"
                        color="#555"
                        lineHeight="1.6"
                        flex={1}
                      >
                        {value.description}
                      </Text>
                    </Flex>
                  </Box>
                </GridItem>
              ))}
            </Grid>

            <Divider borderColor="#e5e5e5" />

            {/* Conclusion */}
            <Box bg="#f8f8f8" p={6} borderRadius="10px" w="full" textAlign="center">
              <Text
                fontSize="clamp(1rem, 2.5vw, 1.1rem)"
                color="#555"
                lineHeight="1.6"
                fontStyle="italic"
              >
                These values guide us in creating a reliable, patient-centered healthcare future that serves everyone in our community.
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}