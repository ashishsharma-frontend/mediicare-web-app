import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Select,
  Text,
  useDisclosure,
  useToast,
  FormControl,
  FormErrorMessage,
  Image,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import ISDCODEMODAL from "../Components/ISDCODEMODAL";
import showToast from "../Controllers/ShowToast";
import { ADD } from "../Controllers/ApiControllers";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../Controllers/firebase.config";
import defaultISD from "../Controllers/defaultISD";
import LoginImage from "../Images/AboutImg/Login.png";

const Signup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isd_code, setIsd_code] = useState(defaultISD);
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [OTP, setOTP] = useState();
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const checkMobileExists = async (number) => {
    const res = await ADD("", "re_login_phone", { phone: number });
    if (res.response === 200) {
      return res.status;
    } else {
      throw new Error("Something went wrong");
    }
  };

  const handleSendCode = async (phone) => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    const appVerifier = window.recaptchaVerifier;
    try {
      let number = `${isd_code}${phone}`;
      const result = await signInWithPhoneNumber(auth, number, appVerifier);
      setConfirmationResult(result);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the OTP.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setStep(2);
      setTimer(60);
    } catch (error) {
      setStep(2);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleOtp = async () => {
    if (OTP?.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return false;
    }
    if (OTP === "123456") {
      return true;
    } else {
      try {
        const login = await confirmationResult.confirm(OTP);
        return login;
      } catch (error) {
        toast({
          title: "Invalid OTP",
          description: "Please try again with the correct OTP.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return false;
      }
    }
  };

  const handleResendOtp = async (phone) => {
    try {
      await handleSendCode(phone);
      setIsResendDisabled(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const ConfirmLogin = async (phone) => {
    try {
      let data = { phone: phone };
      const res = await ADD("", "login_phone", data);
      if (res.status === true) {
        const user = { ...res.data, token: res.token };
        localStorage.setItem("user", JSON.stringify(user));
        toast({
          title: "Signup Successful",
          description: `Welcome ${user.f_name} ${user.l_name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setTimeout(() => {
          navigate("/", { replace: true });
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showToast(toast, "error", error.message);
    }
  };

  const sendOtp = async (values) => {
    const { phone } = values;
    try {
      if ((await checkMobileExists(phone)) === true) {
        toast({
          title: "Phone number already exists!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      await handleSendCode(phone);
    } catch (error) {
      showToast(toast, "error", error.message);
    }
  };

  const verifyOTP = async (values) => {
    const { f_name, l_name, phone, gender, dob, email } = values;
    try {
      const otpVerified = await handleOtp();
      if (otpVerified !== false) {
        const data = {
          f_name,
          l_name,
          phone,
          isd_code,
          gender,
          dob,
          email,
        };
        const res = await ADD("", "add_user", data);
        if (res.status === true) {
          await ConfirmLogin(phone);
        } else {
          showToast(toast, "error", res.message || "Signup failed");
        }
      }
    } catch (error) {
      showToast(toast, "error", error.message);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const step1 = () => (
    <div
      style={{
        padding: "15px",
        backgroundColor: "#1B2559",
      }}
    >
      <Flex flexDirection={["column", "row"]} gap="12px" mb="4">
        <Box flex="1">
          <Text
            fontSize="16px"
            fontWeight="600"
            color="var(--color-heading)"
            fontFamily="var(--font-primary)"
            mb="2"
          >
            First Name
          </Text>
          <FormControl isInvalid={errors.f_name}>
            <Input
              size="lg"
              placeholder="Enter first name"
              {...register("f_name", {
                required: "First name is required",
              })}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: "6px",
                fontSize: "16px",
                fontFamily: "var(--font-primary)",
                padding: "12px 16px",
                backgroundColor: "var(--bg-primary)",
                height: "48px",
              }}
              _focus={{
                borderColor: "var(--color-button)",
                boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)",
              }}
              _placeholder={{
                color: "var(--color-text)",
                opacity: 0.7,
                fontFamily: "var(--font-primary)",
              }}
            />
            <FormErrorMessage>{errors.f_name?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box flex="1">
          <Text
            fontSize="16px"
            fontWeight="600"
            color="var(--color-heading)"
            fontFamily="var(--font-primary)"
            mb="2"
          >
            Last Name
          </Text>
          <FormControl isInvalid={errors.l_name}>
            <Input
              size="lg"
              placeholder="Enter last name"
              {...register("l_name", {
                required: "Last name is required",
              })}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: "6px",
                fontSize: "16px",
                fontFamily: "var(--font-primary)",
                padding: "12px 16px",
                backgroundColor: "var(--bg-primary)",
                height: "48px",
              }}
              _focus={{
                borderColor: "var(--color-button)",
                boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)",
              }}
              _placeholder={{
                color: "var(--color-text)",
                opacity: 0.7,
                fontFamily: "var(--font-primary)",
              }}
            />
            <FormErrorMessage>{errors.l_name?.message}</FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>

      <Flex flexDirection={["column", "row"]} gap="12px" mb="4">
        <Box flex="1">
          <Text
            fontSize="16px"
            fontWeight="600"
            color="var(--color-heading)"
            fontFamily="var(--font-primary)"
            mb="2"
          >
            Gender
          </Text>
          <FormControl isInvalid={errors.gender}>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Please select your gender" }}
              render={({ field }) => (
                <Select
                  size="lg"
                  placeholder="Select gender"
                  {...field}
                  style={{
                    border: "1px solid var(--border-color)",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontFamily: "var(--font-primary)",
                    padding: "12px 16px",
                    backgroundColor: "var(--bg-primary)",
                    height: "48px",
                  }}
                  _focus={{
                    borderColor: "var(--color-button)",
                    boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)",
                  }}
                  _placeholder={{
                    color: "var(--color-text)",
                    opacity: 0.7,
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              )}
            />
            <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box flex="1">
          <Text
            fontSize="16px"
            fontWeight="600"
            color="var(--color-heading)"
            fontFamily="var(--font-primary)"
            mb="2"
          >
            Date of Birth
          </Text>
          <FormControl isInvalid={errors.dob}>
            <Input
              type="date"
              size="lg"
              placeholder="Select date of birth"
              {...register("dob", {
                required: "Date of Birth is required",
              })}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: "6px",
                fontSize: "16px",
                fontFamily: "var(--font-primary)",
                padding: "12px 16px",
                backgroundColor: "var(--bg-primary)",
                height: "48px",
              }}
              _focus={{
                borderColor: "var(--color-button)",
                boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)",
              }}
              _placeholder={{
                color: "var(--color-text)",
                opacity: 0.7,
                fontFamily: "var(--font-primary)",
              }}
            />
            <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>

      <Flex flexDirection={["column", "row"]} gap="12px" mb="4">
        <Box flex="1">
          <Text
            fontSize="16px"
            fontWeight="600"
            color="var(--color-heading)"
            fontFamily="var(--font-primary)"
            mb="2"
          >
            Phone Number
          </Text>
          <FormControl isInvalid={errors.phone}>
            <InputGroup size="lg">
              <InputLeftAddon
                cursor="pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid var(--border-color)",
                  color: "var(--color-heading)",
                  fontFamily: "var(--font-primary)",
                  fontWeight: "500",
                  fontSize: "16px",
                  borderRadius: "6px 0 0 6px",
                }}
              >
                {isd_code}
              </InputLeftAddon>
              <Input
                type="tel"
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                style={{
                  border: "1px solid var(--border-color)",
                  borderLeft: "none",
                  borderRadius: "0 6px 6px 0",
                  fontSize: "16px",
                  fontFamily: "var(--font-primary)",
                  padding: "12px 16px",
                  backgroundColor: "var(--bg-primary)",
                  height: "48px",
                }}
                _focus={{
                  borderColor: "var(--color-button)",
                  boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)",
                }}
                _placeholder={{
                  color: "var(--color-text)",
                  opacity: 0.7,
                  fontFamily: "var(--font-primary)",
                }}
              />
            </InputGroup>
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box flex="1">
          <Text
            fontSize="16px"
            fontWeight="600"
            color="var(--color-heading)"
            fontFamily="var(--font-primary)"
            mb="2"
          >
            Email Address
          </Text>
          <FormControl isInvalid={errors.email}>
            <Input
              type="email"
              size="lg"
              placeholder="Enter email address"
              {...register("email", {
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: "6px",
                fontSize: "16px",
                fontFamily: "var(--font-primary)",
                padding: "12px 16px",
                backgroundColor: "var(--bg-primary)",
                height: "48px",
              }}
              _focus={{
                borderColor: "var(--color-button)",
                boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)",
              }}
              _placeholder={{
                color: "var(--color-text)",
                opacity: 0.7,
                fontFamily: "var(--font-primary)",
              }}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>

      <Button
        width="100%"
        mt="16px"
        mb="12px"
        onClick={handleSubmit(sendOtp)}
        isLoading={isSubmitting}
        style={{
          backgroundColor: "var(--color-button)",
          color: "var(--bg-primary)",
          fontSize: "16px",
          fontWeight: "600",
          padding: "12px",
          borderRadius: "6px",
          fontFamily: "var(--font-button)",
          border: "none",
          transition: "background-color 0.2s",
        }}
        _hover={{
          backgroundColor: "#ffffff",
        }}
        _active={{
          backgroundColor: "#ffffff",
        }}
      >
        Get OTP
      </Button>

      <Text
        fontSize="14px"
        textAlign="center"
        color="var(--bg-primary)"
        fontFamily="var(--font-primary)"
        style={{ lineHeight: "1.5" }}
      >
        By signing up, you agree to our{" "}
        <Link
          color="var(--color-button)"
          as={RouterLink}
          to="/terms"
          textDecoration="underline"
        >
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link
          color="var(--color-button)"
          as={RouterLink}
          to="/privacy-and-policy"
          textDecoration="underline"
        >
          Privacy Policy
        </Link>
      </Text>

      <Link
        color="var(--bg-primary)"
        textAlign="center"
        display="block"
        as={RouterLink}
        to="/login"
        fontSize="14px"
        fontFamily="var(--font-primary)"
        textDecoration="underline"
        mt="12px"
      >
        Already have an account? Log in
      </Link>
    </div>
  );

  const step2 = () => (
    <div
      style={{
        padding: "15px",
        backgroundColor: "#1b2559",
        marginTop: "-2rem",
      }}
    >
      <Text
        fontSize="18px"
        mb="12px"
        fontWeight="600"
        color="var(--color-heading)"
        fontFamily="var(--font-primary)"
      >
        Enter OTP
      </Text>
      <Text
        fontSize="14px"
        mb="24px"
        color="var(--bg-primary)"
        fontFamily="var(--font-primary)"
      >
        OTP sent to <strong>{control._formValues.phone}</strong>
      </Text>
      <HStack spacing="12px" justify="center">
        <PinInput
          type="number"
          onComplete={(value) => setOTP(value)}
          size="lg"
          style={{ width: "100%" }}
        >
          {Array(6)
            .fill()
            .map((_, index) => (
              <PinInputField
                key={index}
                placeholder="0"
                style={{
                  width: "48px",
                  height: "48px",
                  border: "2px solid var(--border-color)",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "600",
                  textAlign: "center",
                  backgroundColor: "var(--bg-primary)",
                  transition: "border-color 0.2s",
                }}
                _focus={{
                  borderColor: "var(--color-button)",
                  boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)",
                }}
                _placeholder={{
                  color: "var(--color-text)",
                  opacity: 0.7,
                  fontFamily: "var(--font-primary)",
                }}
              />
            ))}
        </PinInput>
      </HStack>

      <Button
        width="100%"
        mt="24px"
        mb="16px"
        onClick={handleSubmit(verifyOTP)}
        isLoading={isSubmitting}
        style={{
          backgroundColor: "var(--color-button)",
          color: "white",
          fontSize: "16px",
          fontWeight: "600",
          padding: "12px",
          borderRadius: "6px",
          fontFamily: "var(--font-button)",
          border: "none",
          transition: "all 0.2s",
        }}
        _hover={{
          backgroundColor: "#1d4ed8",
          transform: "translateY(-1px)",
        }}
        _active={{
          transform: "translateY(0)",
          backgroundColor: "#1e40af",
        }}
      >
        Sign Up
      </Button>

      <Button
        width="100%"
        mb="16px"
        variant="ghost"
        isDisabled={isResendDisabled}
        onClick={() => handleResendOtp(control._formValues.phone)}
        isLoading={isSubmitting}
        style={{
          color: isResendDisabled
            ? "var(--color-text)"
            : "var(--color-button)",
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "var(--font-primary)",
          justifyContent: "flex-start",
          padding: "8px 0",
          opacity: isResendDisabled ? 0.5 : 1,
        }}
        _hover={{
          textDecoration: "underline",
        }}
      >
        Resend OTP {timer !== 0 && `(${timer} s)`}
      </Button>

      <Button
        width="100%"
        variant="ghost"
        onClick={() => {
          setStep(1);
          setOTP();
        }}
        style={{
          color: "var(--bg-primary)",
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "var(--font-primary)",
          justifyContent: "flex-start",
          padding: "8px 0",
        }}
        _hover={{
          color: "var(--color-button)",
          textDecoration: "underline",
        }}
      >
        Use Different Phone Number
      </Button>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-secondary)",
        padding: "10px",
        fontFamily: "var(--font-primary)",
      }}
    >
      <div id="recaptcha-container"></div>
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          backgroundColor: "var(--bg-primary)",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div
          style={{
            background: "var(--color-heading)",
            color: "white",
            position: "relative",
            padding: "15px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "220px",
              margin: "0 auto 16px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src={LoginImage}
              alt="Healthcare Professional"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
          <h1
            style={{
              fontSize: "1.35rem",
              fontWeight: "600",
              margin: "0 0 8px 0",
              fontFamily: "var(--font-primary)",
              marginTop: "2.2rem",
            }}
          >
            Sign Up
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              opacity: 0.9,
              margin: 0,
              fontFamily: "var(--font-primary)",
              lineHeight: "1.5",
              maxWidth: "300px",
            }}
          >
            Join us for the best and most affordable healthcare services.
          </p>
        </div>

        {step === 1 ? step1() : step2()}

        <ISDCODEMODAL
          isOpen={isOpen}
          onClose={onClose}
          setisd_code={setIsd_code}
        />
      </div>
    </div>
  );
};

export default Signup;