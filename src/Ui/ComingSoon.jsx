import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Text, 
  VStack, 
  Heading,
  Flex,
  HStack
} from "@chakra-ui/react";

function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date (30 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    launchDate.setHours(0, 0, 0, 0);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <Box
      bg="#fafafa"
      border="1px solid #e5e5e5"
      borderRadius="12px"
      p={4}
      minW="80px"
      textAlign="center"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <Text
        fontSize="clamp(1.5rem, 3vw, 2rem)"
        fontWeight="700"
        color="#333"
        mb={1}
      >
        {String(value).padStart(2, '0')}
      </Text>
      <Text
        fontSize="clamp(0.7rem, 1.5vw, 0.8rem)"
        color="#666"
        fontWeight="500"
        textTransform="uppercase"
        letterSpacing="0.5px"
      >
        {label}
      </Text>
    </Box>
  );

  return (
    <Box
      bg="#fafafa"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2} style={{ scrollBehavior: 'smooth' , marginTop: '40px'}}
    >
      <Container maxW="600px">
        <Box
          bg="white"
          borderRadius="16px"
          p={{ base: 8, md: 12 }}
          textAlign="center"
          boxShadow="0 4px 20px rgba(0,0,0,0.08)"
          border="1px solid #f0f0f0"
          animation="fadeIn 0.8s ease-out"
          css={{
            "@keyframes fadeIn": {
              from: {
                opacity: 0,
                transform: "translateY(30px)"
              },
              to: {
                opacity: 1,
                transform: "translateY(0)"
              }
            }
          }}
        >
          <VStack spacing={8}>
            {/* Logo */}
            <Box
              w="80px"
              h="80px"
              bg="#333"
              borderRadius="16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation="pulse 3s infinite ease-in-out"
              css={{
                "@keyframes pulse": {
                  "0%, 100%": {
                    transform: "scale(1)"
                  },
                  "50%": {
                    transform: "scale(1.02)"
                  }
                }
              }}
            >
              <Box
                as="svg"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </Box>
            </Box>

            {/* Main Content */}
            <VStack spacing={4}>
              <Heading
                fontSize="clamp(2rem, 5vw, 2.8rem)"
                fontWeight="700"
                color="#333"
                letterSpacing="-0.02em"
                lineHeight="1.2"
              >
                Coming Soon
              </Heading>
              
              <Text
                fontSize="clamp(1rem, 2.5vw, 1.2rem)"
                color="#666"
                fontWeight="400"
                lineHeight="1.5"
              >
                We're working on something amazing
              </Text>
              
              <Text
                fontSize="clamp(0.95rem, 2vw, 1.05rem)"
                color="#888"
                lineHeight="1.6"
                maxW="400px"
                mt={2}
              >
                Our new healthcare platform is launching soon. 
                Stay tuned for the best healthcare experience.
              </Text>
            </VStack>

            {/* Countdown Timer */}
            <Box>
              <Text
                fontSize="clamp(0.9rem, 2vw, 1rem)"
                color="#999"
                fontWeight="500"
                mb={6}
                textTransform="uppercase"
                letterSpacing="1px"
              >
                Launch Countdown
              </Text>
              
              <Flex
                justify="center"
                gap={{ base: 3, md: 5 }}
                wrap="wrap"
              >
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
              </Flex>
            </Box>

            {/* Simple Footer */}
            <Box pt={8}>
              <Text
                fontSize="clamp(0.8rem, 1.5vw, 0.9rem)"
                color="#aaa"
                fontWeight="400"
              >
                © 2025 Healthcare Platform. All rights reserved.
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default ComingSoon;