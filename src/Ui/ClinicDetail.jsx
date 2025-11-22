import { useQuery } from "@tanstack/react-query";
import { GET } from "../Controllers/ApiControllers";
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Heading,
  Divider,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import imageBaseURL from "./../Controllers/image";
import NotAvailable from "../Components/NotAvailable";

const ClinicDetail = () => {
  const { id } = useParams();

  const getData = async () => {
    const res = await GET(`get_clinic?id=${id}`);
    return res.data[0]; // Assuming the API returns an array with one clinic
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["clinic", id],
    queryFn: getData,
  });

  if (isLoading) {
    return (
      <Box className="container" py={{ base: 8, md: 10 }}>
        <Skeleton height="300px" mb={6} />
        <Skeleton height="24px" width="60%" mb={4} />
        <Skeleton height="16px" width="80%" mb={2} />
        <Skeleton height="16px" width="70%" />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box className="container" py={{ base: 8, md: 10 }}>
        <Text color="red" textAlign="center">
          Unable to fetch clinic details. Please try again later.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="container" py={{ base: 8, md: 10 }} maxW="1200px" mx="auto">
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        {/* Clinic Image */}
        <Box flexShrink={0} w={{ base: "100%", md: "300px" }}>
          <Image
            src={
              data.image
                ? `${imageBaseURL}/${data.image}`
                : "/api/placeholder/400/200"
            }
            alt={data.title}
            objectFit="cover"
            borderRadius="16px"
            w="100%"
            h={{ base: "250px", md: "300px" }}
          />
        </Box>

        {/* Clinic Details */}
        <VStack align="start" spacing={4} flex={1}>
          <Heading
            fontSize="2xl"
            fontWeight="600"
            color="#1b2559"
            fontFamily='"Poppins", sans-serif'
          >
            {data.title}
          </Heading>
          <Text
            fontSize="md"
            color="#4b5563"
            fontWeight="600"
            fontFamily='"Space Grotesk", sans-serif'
          >
            {data.specialization || "Multi-Specialty Clinic"}
          </Text>
          <Text fontSize="sm" color="#4b5563">
            Address: {data.address || `${data.city_title || "Datia"}, ${data.state_title || "Madhya Pradesh"}`}
          </Text>
          <Text fontSize="sm" color="#4b5563">
            Operating Hours: {data.hours || "9:00 AM - 6:00 PM"}
          </Text>
          <Button
            as={Link}
            to="/book-appointment"
            colorScheme="blue"
            size="md"
            fontFamily='"Space Grotesk", sans-serif'
          >
            Book Appointment
          </Button>
        </VStack>
      </Flex>

      <Divider my={8} />

      {/* Additional Details Section */}
      <Box>
        <Heading
          fontSize="xl"
          fontWeight="600"
          color="#1b2559"
          mb={4}
          fontFamily='"Poppins", sans-serif'
        >
          About {data.title}
        </Heading>
        <Text fontSize="md" color="#4b5563" lineHeight="1.6">
          {data.description ||
            `${data.title} is a premier healthcare facility in ${
              data.city_title || "Datia"
            }, offering specialized services with state-of-the-art equipment and a team of expert physicians dedicated to patient care.`}
        </Text>
      </Box>

      <Box mt={8}>
        <Heading
          fontSize="xl"
          fontWeight="600"
          color="#1b2559"
          mb={4}
          fontFamily='"Poppins", sans-serif'
        >
          Services Offered
        </Heading>
        <VStack align="start" spacing={2}>
          {(data.services || ["General Checkups", "Diagnostics", "Specialized Treatments"]).map((service, index) => (
            <Text key={index} fontSize="md" color="#4b5563">
              • {service}
            </Text>
          ))}
        </VStack>
      </Box>

      <Box mt={8}>
        <Heading
          fontSize="xl"
          fontWeight="600"
          color="#1b2559"
          mb={4}
          fontFamily='"Poppins", sans-serif'
        >
          Our Doctors
        </Heading>
        <VStack align="start" spacing={4}>
          {(data.doctors || [
            { name: "Dr. John Doe", specialization: "Dermatology" },
            { name: "Dr. Jane Smith", specialization: "General Medicine" },
          ]).map((doctor, index) => (
            <Box key={index} p={4} bg="#f8faff" borderRadius="8px" w="100%">
              <Text fontSize="sm" fontWeight="600" color="#1b2559">
                {doctor.name}
              </Text>
              <Text fontSize="sm" color="#4b5563">
                Specialization: {doctor.specialization}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default ClinicDetail;