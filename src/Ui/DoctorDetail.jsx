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
import RatingStars from "../Hooks/RatingStars";
import NotAvailable from "../Components/NotAvailable";

const DoctorDetail = () => {
  const { user_id } = useParams();

  const getData = async () => {
    const res = await GET(`get_doctor?user_id=${user_id}`);
    return res.data[0]; // Assuming the API returns an array with one doctor
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["doctor", user_id],
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
          Unable to fetch doctor details. Please try again later.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="container" py={{ base: 8, md: 10 }} maxW="1200px" mx="auto">
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        {/* Doctor Image */}
        <Box flexShrink={0} w={{ base: "100%", md: "300px" }}>
          <Image
            src={
              data.image
                ? `${imageBaseURL}/${data.image}`
                : "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt={`${data.f_name} ${data.l_name}`}
            objectFit="cover"
            borderRadius="16px"
            w="100%"
            h={{ base: "250px", md: "300px" }}
          />
        </Box>

        {/* Doctor Details */}
        <VStack align="start" spacing={4} flex={1}>
          <Heading
            fontSize="2xl"
            fontWeight="600"
            color="#1b2559"
            fontFamily='"Poppins", sans-serif'
          >
            {data.f_name} {data.l_name}
          </Heading>
          <Text
            fontSize="md"
            color="#4b5563"
            fontWeight="600"
            fontFamily='"Space Grotesk", sans-serif'
          >
            {data.specialization}
          </Text>
          <Flex align="center" gap={2}>
            <RatingStars rating={data.average_rating} />
            <Text fontSize="sm" color="#4b5563">
              {parseFloat(data.average_rating).toFixed(1)} ({data.number_of_reviews} reviews)
            </Text>
          </Flex>
          <Text fontSize="sm" color="#4b5563">
            Experience: {data.ex_year}+ Years
          </Text>
          <Text fontSize="sm" color="#4b5563">
            Clinic: {data.clinic_title}
          </Text>
          <Text fontSize="sm" color="#4b5563">
            Address: {data.clinics_address || `${data.city_title || "Datia"}, ${data.state_title || "Madhya Pradesh"}`}
          </Text>
          <Text fontSize="sm" color="#4b5563">
            Appointments Done: {data.total_appointment_done}
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
          About {data.f_name} {data.l_name}
        </Heading>
        <Text fontSize="md" color="#4b5563" lineHeight="1.6">
          {data.bio ||
            `${data.f_name} ${data.l_name} is a highly experienced ${data.specialization} with over ${data.ex_year} years of practice. Specializing in advanced diagnostics and personalized treatment plans, they are dedicated to providing compassionate care at ${data.clinic_title}.`}
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
          {(data.services || ["Consultations", "Diagnostics", "Follow-up Care"]).map((service, index) => (
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
          Testimonials
        </Heading>
        <VStack align="start" spacing={4}>
          {(data.testimonials || [
            {
              name: "Patient A",
              review: "Excellent care and attention to detail. Highly recommend!",
            },
            {
              name: "Patient B",
              review: "Very professional and knowledgeable. Made me feel at ease.",
            },
          ]).map((testimonial, index) => (
            <Box key={index} p={4} bg="#f8faff" borderRadius="8px" w="100%">
              <Text fontSize="sm" fontWeight="600" color="#1b2559">
                {testimonial.name}
              </Text>
              <Text fontSize="sm" color="#4b5563">
                "{testimonial.review}"
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default DoctorDetail;