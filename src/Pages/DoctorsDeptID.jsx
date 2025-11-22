/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { GET } from "../Controllers/ApiControllers";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Image,
  Skeleton,
  Text,
  IconButton,
  HStack,
  Divider,
  Container,
  VStack,
} from "@chakra-ui/react";
import imageBaseURL from "./../Controllers/image";
import Loading from "../Components/Loading";
import RatingStars from "../Hooks/RatingStars";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useCity } from "../Context/SelectedCity";

export default function DoctorsByDeptID({ deptID, deptName }) {
  const { selectedCity } = useCity();

  const getData = async () => {
    const res = await GET(
      `get_doctor?department=${deptID}&active=1&city_id=${selectedCity?.id || ""}`
    );
    return res.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["Doctors", deptID, selectedCity],
    queryFn: getData,
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <Box bg="gray.50" minH="100vh" fontFamily="'Inter', sans-serif">
      {/* Header Section */}
  

      {/* Main Content */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        {data?.length ? (
          <Box>
            <Flex align="center" gap={3} mb={8}>
              <Box p={2} bg="gray.100" borderRadius="md">
                <FaUserMd size="20px" color="var(--color-button, #3182ce)" />
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="600"
                  color="gray.900"
                >
                  {deptName} Doctors
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {data.length} specialists available
                </Text>
              </Box>
            </Flex>

            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(2, 1fr)",
              }}
              gap={6}
            >
              {data?.map((doctor) => (
                <GridItem
                  key={doctor.id}
                  as={Link}
                  to={`/doctor/${doctor.user_id}`}
                  bg="white"
                  borderRadius="lg"
                  border="1px solid #edf2f6"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    borderColor: "blue.100",
                  }}
                  boxShadow="0 4px 12px rgba(0,0,0,0.05)"
                >
                  <Box p={5}>
                    <Flex gap={5} align="center" mb={4}>
                      <Box
                        overflow="hidden"
                        h="80px"
                        w="80px"
                        borderRadius="full"
                        bg="gray.100"
                        border="2px solid #f7fafc"
                      >
                        <Image
                          src={
                            doctor.image
                              ? `${imageBaseURL}/${doctor.image}`
                              : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=140&auto=format&fit=crop&q=60"
                          }
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          alt={`Dr. ${doctor.f_name} ${doctor.l_name}`}
                        />
                      </Box>
                      <Box>
                        <Text
                          fontSize="md"
                          fontWeight="700"
                          color="gray.900"
                          lineHeight="1.3"
                          noOfLines={1}
                        >
                          Dr. {doctor.f_name} {doctor.l_name}
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color="gray.600"
                          mt={1}
                          noOfLines={1}
                        >
                          {doctor.department_name}
                        </Text>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="gray.600"
                          mt={1}
                          noOfLines={1}
                        >
                          {doctor.specialization}
                        </Text>
                      </Box>
                    </Flex>

                    <Divider my={2} borderColor="gray.200" />

                    <Flex justify="space-between" mb={4}>
                      <Box>
                        <Text fontSize="xs" fontWeight="600" color="gray.600" mb={1}>
                          Total Rating
                        </Text>
                        <Flex align="center" gap={2}>
                          <RatingStars
                            rating={parseFloat(doctor.average_rating) || 4.5}
                            size={14}
                          />
                          <Text fontSize="xs" color="gray.600" fontWeight="600">
                            {(parseFloat(doctor.average_rating) || 4.5).toFixed(1)} (
                            {doctor.number_of_reviews || 867})
                          </Text>
                        </Flex>
                      </Box>
                      <Box textAlign="right">
                        <Text fontSize="xs" fontWeight="600" color="gray.600" mb={1}>
                          Experience
                        </Text>
                        <Text fontSize="sm" fontWeight="700" color="gray.900">
                          {doctor.ex_year}+ Years
                        </Text>
                      </Box>
                    </Flex>

                    <Divider my={2} borderColor="gray.200" />

                    <HStack spacing={2} justify="center">
                      {doctor.insta_link && (
                        <IconButton
                          as="a"
                          href={doctor.insta_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          icon={<FaInstagram size="14px" color="gray.500" />}
                          variant="ghost"
                          borderRadius="full"
                          _hover={{ bg: "gray.100", color: "gray.700" }}
                        />
                      )}
                      {doctor.fb_linik && (
                        <IconButton
                          as="a"
                          href={doctor.fb_linik}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          icon={<FaFacebook size="14px" color="gray.500" />}
                          variant="ghost"
                          borderRadius="full"
                          _hover={{ bg: "gray.100", color: "gray.700" }}
                        />
                      )}
                      {doctor.twitter_link && (
                        <IconButton
                          as="a"
                          href={doctor.twitter_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                          icon={<FaTwitter size="14px" color="gray.500" />}
                          variant="ghost"
                          borderRadius="full"
                          _hover={{ bg: "gray.100", color: "gray.700" }}
                        />
                      )}
                      {doctor.you_tube_link && (
                        <IconButton
                          as="a"
                          href={doctor.you_tube_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="YouTube"
                          icon={<FaYoutube size="14px" color="gray.500" />}
                          variant="ghost"
                          borderRadius="full"
                          _hover={{ bg: "gray.100", color: "gray.700" }}
                        />
                      )}
                    </HStack>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Box>
        ) : (
          <VStack spacing={4} py={12} textAlign="center">
            <FaUserMd size="48px" color="gray.500" />
            <Text fontSize="lg" fontWeight="600" color="gray.900">
              No {deptName} Doctors Available
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
              maxW="600px"
              textAlign="center"
            >
              We apologize for the inconvenience, but there are no doctors
              currently available in the {deptName} department. Please check
              back later or consider a different department.
            </Text>
          </VStack>
        )}

        {/* Loading State */}
        {isLoading && (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            gap={6}
          >
            {[...Array(4)].map((_, i) => (
              <GridItem
                key={i}
                bg="white"
                borderRadius="lg"
                border="1px solid #edf2f6"
                p={5}
                boxShadow="0 4px 12px rgba(0,0,0,0.05)"
              >
                <Flex gap={5} align="center" mb={4}>
                  <Skeleton w="80px" h="80px" borderRadius="full" />
                  <Box flex={1}>
                    <Skeleton height="16px" width="70%" mb={2} />
                    <Skeleton height="14px" width="50%" mb={2} />
                    <Skeleton height="12px" width="60%" />
                  </Box>
                </Flex>
                <Divider my={2} borderColor="gray.200" />
                <Flex gap={3} mb={4}>
                  <Skeleton height="30px" width="50%" />
                  <Skeleton height="30px" width="50%" />
                </Flex>
                <Divider my={2} borderColor="gray.200" />
                <HStack spacing={2} justify="center">
                  <Skeleton height="24px" width="24px" borderRadius="full" />
                  <Skeleton height="24px" width="24px" borderRadius="full" />
                  <Skeleton height="24px" width="24px" borderRadius="full" />
                </HStack>
              </GridItem>
            ))}
          </Grid>
        )}

        {/* Error State */}
        {error && (
          <VStack spacing={4} py={12} textAlign="center">
            <FaUserMd size="48px" color="gray.500" />
            <Text fontSize="lg" fontWeight="600" color="gray.900">
              Unable to Load {deptName} Specialists
            </Text>
            <Text fontSize="sm" color="gray.600">
              Something went wrong. Please try again later.
            </Text>
          </VStack>
        )}
      </Container>
    </Box>
  );
}