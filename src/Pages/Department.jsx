import { Box, Flex, Image, Text, VStack, Container } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorsByDeptID from "./DoctorsDeptID";
import { GET } from "../Controllers/ApiControllers";
import Loading from "../Components/Loading";
import { useQuery } from "@tanstack/react-query";
import imageBaseURL from "../Controllers/image";

export default function Department() {
  const { id, name } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    const res = await GET("get_department_active");
    return res.data;
  };
  const { isLoading: deptLoading, data: deptData } = useQuery({
    queryKey: ["departments"],
    queryFn: getData,
  });

  if (deptLoading) {
    return <Loading />;
  }

  return (
    <Box minH="100vh" bg="#fafafa" fontFamily="'Inter', sans-serif">
      {/* Clean Header Section */}
      <Box bg="#242424" color="white" py={{ base: 6, md: 8 }}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <Box maxW="600px">
            <Text
              fontWeight="600"
              lineHeight="1.3"
              mb={3}
              style={{ fontSize: "clamp(1.2rem, 4vw, 1.5rem)" }}
            >
              {name} Department
            </Text>
            <Text
              lineHeight="1.5"
              color="rgba(255,255,255,0.9)"
              style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)", marginTop: "1rem" }}
            >
              Explore our multifaceted team of{" "}
              <Text as="span" color="#22c55e" fontWeight="600">
                {name} Specialists
              </Text>{" "}
              with expert physicians and advanced medical services.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          textAlign="center"
          color="#64748b"
          fontWeight="500"
          mb={8}
          lineHeight="1.6"
          maxW="600px"
          mx="auto"
        >
          Experience the ease of finding the right medical expert for your needs with our comprehensive selection of doctors.
        </Text>

        <Flex gap={8} flexDir={{ base: "column", lg: "row" }}>
          {/* Main Content - Doctors */}
          <Box flex={1}>
            <DoctorsByDeptID deptID={id} deptName={name} />
          </Box>

          {/* Sidebar - Other Departments */}
          <Box
            w={{ base: "100%", lg: "350px" }}
            flexShrink={0}
          >
            <Box
              bg="white"
              borderRadius="12px"
              border="1px solid #e5e7eb"
              overflow="hidden"
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.04)"
              position="sticky"
              top={8}
            >
              <Box
                p={5}
                bg="#f8fafc"
                borderBottom="1px solid #e2e8f0"
              >
                <Text
                  fontSize="18px"
                  fontWeight="600"
                  color="#1a202c"
                  textAlign="center"
                  letterSpacing="-0.01em"
                >
                  Explore Other Departments
                </Text>
              </Box>

              <Box p={4} maxH="600px" overflowY="auto">
                <VStack spacing={3}>
                  {deptData?.map((dept) => (
                    <Box
                      key={dept.id}
                      w="100%"
                      p={4}
                      borderRadius="10px"
                      border="1px solid #f1f5f9"
                      bg="white"
                      cursor="pointer"
                      transition="all 0.2s ease"
                      _hover={{
                        borderColor: "#cbd5e1",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        bg: "#f8fafc",
                      }}
                      onClick={() => {
                        navigate(`/department/${dept.title}/${dept.id}`);
                      }}
                    >
                      <Flex gap={4} align="center">
                        <Box
                          flexShrink={0}
                          w="50px"
                          h="50px"
                          borderRadius="10px"
                          overflow="hidden"
                          bg="#f1f5f9"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="1px solid #e2e8f0"
                        >
                          <Image
                            src={`${imageBaseURL}/${dept.image}`}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            fallback={
                              <Text fontSize="16px" color="#64748b">
                                🏥
                              </Text>
                            }
                          />
                        </Box>
                        
                        <Box flex={1}>
                          <Text
                            fontSize="14px"
                            fontWeight="600"
                            color="#1a202c"
                            textTransform="capitalize"
                            lineHeight="1.3"
                            noOfLines={1}
                          >
                            {dept.title}
                          </Text>
                          <Text
                            fontSize="12px"
                            color="#64748b"
                            lineHeight="1.4"
                            mt={1}
                            noOfLines={2}
                          >
                            Specialized medical care and treatment
                          </Text>
                        </Box>
                        
                        <Box
                          w="6px"
                          h="6px"
                          borderRadius="full"
                          bg="#cbd5e1"
                          transition="all 0.2s ease"
                          _groupHover={{ bg: "#64748b" }}
                        />
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}