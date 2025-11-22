/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Input,
  IconButton,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaInstagram, FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const ListHeader = ({ children }) => {
  return (
    <Text
      fontFamily="'Inter', sans-serif"
      fontWeight="600"
      fontSize="lg"
      mb={3}
      color="gray.100"
    >
      {children}
    </Text>
  );
};

const ListItem = ({ children, to }) => {
  return (
    <ChakraLink
      as={Link}
      to={to}
      fontFamily="'Inter', sans-serif"
      fontSize="sm"
      color="gray.400"
      _hover={{
        color: "blue.400",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
      }}
    >
      {children}
    </ChakraLink>
  );
};

export default function Footer() {
  return (
    <Box bg="gray.900" color="white" py={{ base: 8, md: 10 }} fontFamily="'Inter', sans-serif">
      <Container maxW="1400px" px={{ base: 4, md: 6 }}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          spacing={{ base: 6, md: 8 }}
          mb={{ base: 8, md: 10 }}
        >
          {/* About Us Section */}
          <Stack spacing={2}>
            <ListHeader>About Us</ListHeader>
            <ListItem to="/about/story">Our Story</ListItem>
            <ListItem to="/about/contact">Contact Information</ListItem>
            <ListItem to="/about/team">Team Overview</ListItem>
            <ListItem to="/about/feedback">Patient Feedback</ListItem>
          </Stack>

          {/* Services Section */}
          <Stack spacing={2}>
            <ListHeader>Services</ListHeader>
            <ListItem to="/department">General Medicine</ListItem>
            <ListItem to="/department">Pediatrics</ListItem>
            <ListItem to="/department">Orthopedics</ListItem>
            <ListItem to="/department">Dermatology</ListItem>
            <ListItem to="/department">Gynecology</ListItem>
            <ListItem to="/department">Cardiology</ListItem>
          </Stack>

          {/* Products Section */}
          <Stack spacing={2}>
            <ListHeader>Products</ListHeader>
            <ListItem to="/coming-soon">Dermatology</ListItem>
            <ListItem to="/coming-soon">Hair Care Solutions</ListItem>
            <ListItem to="/coming-soon">Skin Care Kits</ListItem>
            <ListItem to="/coming-soon">Virtual Consultations</ListItem>
            <ListItem to="/coming-soon">Online Prescriptions</ListItem>
            <ListItem to="/coming-soon">Health Monitoring</ListItem>
          </Stack>

          {/* Quick Links Section */}
          <Stack spacing={2}>
            <ListHeader>Quick Links</ListHeader>
            <ListItem to="/doctor/11">Book Appointment</ListItem>
            <ListItem to="/doctors">Find a Doctor</ListItem>
            <ListItem to="/disclamier">Disclaimer</ListItem>
            <ListItem to="/privacy-policy">Privacy Policy</ListItem>
            <ListItem to="/term-condition">Terms of Use</ListItem>
            <ListItem to="/our-value">Our Value</ListItem>
          </Stack>
        </SimpleGrid>

        <Box borderBottom="1px solid" borderColor="gray.700" my={6} />

        {/* Bottom Section */}
        <Flex
          justify="space-between"
          align="center"
          flexWrap="wrap"
          gap={4}
          mb={6}
        >
          <Stack spacing={3} maxW={{ base: "100%", sm: "300px" }}>
            <Text fontSize="sm" color="gray.400">
              Our best skin & hair tips straight to your inbox!
            </Text>
            <Flex>
              <Input
                placeholder="Enter your email"
                bg="white"
                color="gray.900"
                border="none"
                borderRadius="md 0 0 md"
                fontSize="sm"
                h="40px"
                _placeholder={{ color: "gray.500" }}
                _focus={{
                  borderColor: "blue.600",
                  boxShadow: "0 0 0 1px #3182ce",
                }}
              />
              <IconButton
                aria-label="Subscribe"
                icon={<MdEmail size="20px" />}
                bg="blue.600"
                color="white"
                borderRadius="0 md md 0"
                h="40px"
                _hover={{ bg: "blue.700" }}
                _focus={{ boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.3)" }}
              />
            </Flex>
          </Stack>

          <Text fontSize="2xl" fontWeight="700" color="white">
            Supadoc
          </Text>

          <Stack direction="row" spacing={3}>
            <ChakraLink
              as="a"
              href="https://www.instagram.com/supadoc"
              isExternal
              aria-label="Instagram"
            >
              <IconButton
                icon={<FaInstagram size="20px" />}
                variant="ghost"
                color="gray.400"
                borderRadius="full"
                _hover={{ bg: "gray.700", color: "blue.400" }}
              />
            </ChakraLink>
            <ChakraLink
              as="a"
              href="https://www.twitter.com/supadoc"
              isExternal
              aria-label="Twitter"
            >
              <IconButton
                icon={<FaXTwitter size="20px" />}
                variant="ghost"
                color="gray.400"
                borderRadius="full"
                _hover={{ bg: "gray.700", color: "blue.400" }}
              />
            </ChakraLink>
            <ChakraLink
              as="a"
              href="https://www.linkedin.com/company/supadoc"
              isExternal
              aria-label="LinkedIn"
            >
              <IconButton
                icon={<FaLinkedinIn size="20px" />}
                variant="ghost"
                color="gray.400"
                borderRadius="full"
                _hover={{ bg: "gray.700", color: "blue.400" }}
              />
            </ChakraLink>
            <ChakraLink
              as="a"
              href="https://wa.me/1234567890"
              isExternal
              aria-label="WhatsApp"
            >
              <IconButton
                icon={<FaWhatsapp size="20px" />}
                variant="ghost"
                color="gray.400"
                borderRadius="full"
                _hover={{ bg: "gray.700", color: "blue.400" }}
              />
            </ChakraLink>
          </Stack>
        </Flex>

        <Text
          fontSize="xs"
          textAlign="right"
          color="gray.400"
          fontFamily="'Inter', sans-serif"
        >
          © 2025 CarePulse Clinic. All Rights Reserved.
        </Text>
      </Container>
    </Box>
  );
}