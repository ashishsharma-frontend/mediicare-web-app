import {
  Box,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  Input,
  Textarea,
  Button,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Container,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import useSettingsData from "../Hooks/SettingData";
import user from "../Controllers/user";
import { ADD } from "../Controllers/ApiControllers";
import { useMutation } from "@tanstack/react-query";
import showToast from "../Controllers/ShowToast";
import { useForm } from "react-hook-form";
import { useState } from "react";

const addContactForm = async (data) => {
  const res = await ADD(user?.token || "", "add_contact_us_form_data", data);
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res;
};

export default function ContactUs() {
  const { settingsData } = useSettingsData();
  const phone1 = settingsData?.find((value) => value.id_name === "phone");
  const phone2 = settingsData?.find((value) => value.id_name === "phone_second");
  const email = settingsData?.find((value) => value.id_name === "email");
  const address = settingsData?.find((value) => value.id_name === "address");

  const toast = useToast();
  const [showMsg, setShowMsg] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      setShowMsg(false);
      let formData = { ...data };
      await addContactForm(formData);
    },
    onSuccess: () => {
      showToast(toast, "success", "Success");
      setShowMsg(true);
      reset();
      setTimeout(() => {
        setShowMsg(false);
      }, 5000);
    },
    onError: (error) => {
      showToast(toast, "error", error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box
      bg="#fafbfc"
      minH="100vh"
      fontFamily="'Inter', sans-serif"
      position="relative"
      color="#0f172a"
    >
      {/* Clean Social Icons - Fixed Position */}
      <Flex
        position="fixed"
        right="30px"
        top="50%"
        transform="translateY(-50%)"
        direction="column"
        gap="8px"
        zIndex="1000"
        display={{ base: "none", md: "flex" }}
      >
        <Box
          as="a"
          href="#"
          w="44px"
          h="44px"
          borderRadius="6px"
          bg="white"
          border="1px solid #f1f5f9"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#64748b"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          _hover={{ bg: "#f8fafc", borderColor: "#e2e8f0" }}
          transition="all 0.2s"
        >
          <FaFacebook size="16px" />
        </Box>
        <Box
          as="a"
          href="#"
          w="44px"
          h="44px"
          borderRadius="6px"
          bg="white"
          border="1px solid #f1f5f9"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#64748b"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          _hover={{ bg: "#f8fafc", borderColor: "#e2e8f0" }}
          transition="all 0.2s"
        >
          <FaInstagram size="16px" />
        </Box>
        <Box
          as="a"
          href="#"
          w="44px"
          h="44px"
          borderRadius="6px"
          bg="white"
          border="1px solid #f1f5f9"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#64748b"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          _hover={{ bg: "#f8fafc", borderColor: "#e2e8f0" }}
          transition="all 0.2s"
        >
          <FaTwitter size="16px" />
        </Box>
        <Box
          as="a"
          href="#"
          w="44px"
          h="44px"
          borderRadius="6px"
          bg="#25d366"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          _hover={{ bg: "#22c55e" }}
          transition="all 0.2s"
        >
          <FaWhatsapp size="16px" />
        </Box>
      </Flex>

      {/* Header Section - Updated to match doctor page */}
      <Box bg="#0f172a" borderBottom="1px solid #1e293b" py={{ base: 6, md: 8 }}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={3} textAlign="center">
            <Text
              fontSize={{ base: "24px", md: "30px" }}
              fontWeight="600"
              color="#ffffff"
              fontFamily="var(--font-primary)"
            >
              Contact Us
            </Text>
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color="rgba(255,255,255,0.8)"
              fontFamily="var(--font-primary)"
            >
              Have questions or need assistance? We're here to help and ready to respond to your inquiries.
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        {/* Contact Info Cards */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={6}
          mb={10}
        >
          <Box
            p={6}
            bg="white"
            border="1px solid #f1f5f9"
            borderRadius="10px"
            boxShadow="0 1px 3px rgba(0,0,0,0.1)"
            textAlign="center"
            transition="all 0.2s"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              borderColor: "#cbd5e1",
            }}
          >
            <Box
              w={12}
              h={12}
              borderRadius="6px"
              bg="#f8fafc"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb={4}
              fontSize="20px"
            >
              📍
            </Box>
            <Text fontSize="16px" fontWeight="600" color="#0f172a" mb={3} fontFamily="var(--font-primary)">
              Address
            </Text>
            <Text fontSize="14px" color="#64748b" lineHeight="1.5" fontFamily="var(--font-primary)">
              {address?.value || "Gwalior, City Center Block No. 275, India"}
            </Text>
          </Box>

          <Box
            p={6}
            bg="white"
            border="1px solid #f1f5f9"
            borderRadius="10px"
            boxShadow="0 1px 3px rgba(0,0,0,0.1)"
            textAlign="center"
            transition="all 0.2s"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              borderColor: "#cbd5e1",
            }}
          >
            <Box
              w={12}
              h={12}
              borderRadius="6px"
              bg="#f8fafc"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb={4}
              fontSize="20px"
            >
              ✉
            </Box>
            <Text fontSize="16px" fontWeight="600" color="#0f172a" mb={3} fontFamily="var(--font-primary)">
              Email
            </Text>
            <Text fontSize="14px" color="#64748b" lineHeight="1.5" fontFamily="var(--font-primary)">
              {email?.value || "contact@healthcare.com"}
            </Text>
          </Box>

          <Box
            p={6}
            bg="white"
            border="1px solid #f1f5f9"
            borderRadius="10px"
            boxShadow="0 1px 3px rgba(0,0,0,0.1)"
            textAlign="center"
            transition="all 0.2s"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              borderColor: "#cbd5e1",
            }}
          >
            <Box
              w={12}
              h={12}
              borderRadius="6px"
              bg="#f8fafc"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb={4}
              fontSize="20px"
            >
              📞
            </Box>
            <Text fontSize="16px" fontWeight="600" color="#0f172a" mb={3} fontFamily="var(--font-primary)">
              Phone
            </Text>
            <Text fontSize="14px" color="#64748b" lineHeight="1.5" fontFamily="var(--font-primary)">
              {phone1?.value || "+91 9829898928"}
            </Text>
          </Box>

          <Box
            p={6}
            bg="white"
            border="1px solid #f1f5f9"
            borderRadius="10px"
            boxShadow="0 1px 3px rgba(0,0,0,0.1)"
            textAlign="center"
            transition="all 0.2s"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              borderColor: "#cbd5e1",
            }}
          >
            <Box
              w={12}
              h={12}
              borderRadius="6px"
              bg="#f8fafc"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb={4}
              fontSize="20px"
            >
              🕒
            </Box>
            <Text fontSize="16px" fontWeight="600" color="#0f172a" mb={3} fontFamily="var(--font-primary)">
              Working Hours
            </Text>
            <Text fontSize="14px" color="#64748b" lineHeight="1.5" fontFamily="var(--font-primary)">
              Mon - Fri: 9:00 AM - 6:00 PM
            </Text>
          </Box>
        </SimpleGrid>

        {/* Main Contact Section */}
        <Box
          bg="white"
          border="1px solid #f1f5f9"
          borderRadius="10px"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          overflow="hidden"
          mb={8}
        >
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            alignItems="stretch"
            spacing={0}
          >
            {/* Doctor Image */}
            <GridItem
              position="relative"
              h={{ base: "300px", lg: "auto" }}
              minH="400px"
            >
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=60"
                alt="Doctor"
                objectFit="cover"
                w="100%"
                h="100%"
                position="absolute"
                top="0"
                left="0"
              />
            </GridItem>

            {/* Contact Form */}
            <GridItem p={{ base: 6, md: 8 }}>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Text
                    fontSize="24px"
                    fontWeight="600"
                    color="#0f172a"
                    mb={2}
                    textAlign="center"
                    fontFamily="var(--font-primary)"
                  >
                    Send Us A Message
                  </Text>
                  <Text
                    fontSize="14px"
                    color="#64748b"
                    lineHeight="1.5"
                    textAlign="center"
                    fontFamily="var(--font-primary)"
                  >
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </Text>
                </Box>

                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={5} align="stretch">
                    <FormControl isInvalid={errors.name}>
                      <Input
                        type="text"
                        placeholder="Your Name"
                        {...register("name", { required: "Name is required" })}
                        border="1px solid #e2e8f0"
                        borderRadius="6px"
                        px={4}
                        py={3}
                        fontSize="14px"
                        color="#0f172a"
                        bg="white"
                        h="44px"
                        _placeholder={{ color: "#94a3b8" }}
                        _hover={{ borderColor: "#cbd5e1" }}
                        _focus={{ borderColor: "#2563eb", boxShadow: "0 0 0 1px #2563eb" }}
                      />
                      {errors.name && (
                        <Text fontSize="12px" color="#dc3545" mt={1}>
                          {errors.name.message}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl isInvalid={errors.email}>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email format",
                          },
                        })}
                        border="1px solid #e2e8f0"
                        borderRadius="6px"
                        px={4}
                        py={3}
                        fontSize="14px"
                        color="#0f172a"
                        bg="white"
                        h="44px"
                        _placeholder={{ color: "#94a3b8" }}
                        _hover={{ borderColor: "#cbd5e1" }}
                        _focus={{ borderColor: "#2563eb", boxShadow: "0 0 0 1px #2563eb" }}
                      />
                      {errors.email && (
                        <Text fontSize="12px" color="#dc3545" mt={1}>
                          {errors.email.message}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl isInvalid={errors.subject}>
                      <Input
                        type="text"
                        placeholder="Subject"
                        {...register("subject", { required: "Subject is required" })}
                        border="1px solid #e2e8f0"
                        borderRadius="6px"
                        px={4}
                        py={3}
                        fontSize="14px"
                        color="#0f172a"
                        bg="white"
                        h="44px"
                        _placeholder={{ color: "#94a3b8" }}
                        _hover={{ borderColor: "#cbd5e1" }}
                        _focus={{ borderColor: "#2563eb", boxShadow: "0 0 0 1px #2563eb" }}
                      />
                      {errors.subject && (
                        <Text fontSize="12px" color="#dc3545" mt={1}>
                          {errors.subject.message}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl isInvalid={errors.message}>
                      <Textarea
                        placeholder="Your Message"
                        rows={4}
                        {...register("message", { required: "Message is required" })}
                        border="1px solid #e2e8f0"
                        borderRadius="6px"
                        px={4}
                        py={3}
                        fontSize="14px"
                        color="#0f172a"
                        bg="white"
                        _placeholder={{ color: "#94a3b8" }}
                        resize="vertical"
                        minH="100px"
                        _hover={{ borderColor: "#cbd5e1" }}
                        _focus={{ borderColor: "#2563eb", boxShadow: "0 0 0 1px #2563eb" }}
                      />
                      {errors.message && (
                        <Text fontSize="12px" color="#dc3545" mt={1}>
                          {errors.message.message}
                        </Text>
                      )}
                    </FormControl>

                    {showMsg && (
                      <Alert
                        status="success"
                        borderRadius="6px"
                        bg="#f0fdf4"
                        border="1px solid #bbf7d0"
                        py={3}
                      >
                        <AlertIcon color="#16a34a" boxSize={4} />
                        <Box>
                          <AlertTitle fontSize="14px" color="#166534" fontWeight="600">
                            Message Sent!
                          </AlertTitle>
                          <AlertDescription fontSize="13px" color="#166534">
                            Thank you for your message. We'll respond soon.
                          </AlertDescription>
                        </Box>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      isLoading={mutation.isPending}
                      loadingText="Sending..."
                      bg="#2563eb"
                      color="white"
                      fontWeight="500"
                      fontSize="14px"
                      borderRadius="6px"
                      h="44px"
                      w="full"
                      _hover={{ bg: "#1d4ed8" }}
                      _disabled={{ bg: "#f1f5f9", color: "#94a3b8" }}
                    >
                      Send Message
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>
          </SimpleGrid>
        </Box>

        {/* Map Section */}
        <Box
          w="100%"
          h="300px"
          borderRadius="10px"
          overflow="hidden"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          border="1px solid #f1f5f9"
        >
          <Box
            as="iframe"
            src={`https://www.google.com/maps?q=${
              address?.value || "Gwalior, India"
            }&hl=en;z=14&output=embed`}
            width="100%"
            height="100%"
            border="none"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Container>
    </Box>
  );
}