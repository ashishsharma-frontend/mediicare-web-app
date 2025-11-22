import { FaHospitalAlt } from "react-icons/fa";
import { BsPrescription } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { MdFamilyRestroom } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { MdHealthAndSafety } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoMdWallet } from "react-icons/io";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  useDisclosure,
  Image,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  DrawerFooter,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import useSettingsData from "../Hooks/SettingData";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageBaseURL from "../Controllers/image";
import user from "../Controllers/user";
import NotificationIcon from "../Components/Notification";
import WalletModel from "../Components/Wallet";
import LocationSeletor from "../Components/LocationSeletor";

// Navigation links
const LinksPublic = ["Home", "Clinics", "Doctors"];
const LinksAuth = ["Appointments"];
const LinksPublic2 = ["About-us", "Contact-us"];

const SideBarLinks = [
  {
    name: "Home",
    icon: <AiFillHome />,
    auth: true,
  },
  {
    name: "Clinics",
    icon: <FaHospitalAlt />,
    auth: true,
  },
  {
    name: "Doctors",
    icon: <FaUserMd />,
    auth: true,
  },
  {
    name: "Family-Members",
    icon: <HiUsers />,
    auth: user ? true : false,
  },
  {
    name: "Appointments",
    icon: <AiOutlineHistory />,
    auth: user ? true : false,
  },
  {
    name: "Vitals",
    icon: <MdHealthAndSafety />,
    auth: user ? true : false,
  },
  {
    name: "Prescriptions",
    icon: <BsPrescription />,
    auth: user ? true : false,
  },
  {
    name: "Files",
    icon: <CgFileDocument />,
    auth: user ? true : false,
  },
  {
    name: "About-Us",
    icon: <AiFillInfoCircle />,
    auth: true,
  },
  {
    name: "Contact-Us",
    icon: <BsFillTelephoneFill />,
    auth: true,
  },
];

export default function TopbarNew() {
  const { settingsData } = useSettingsData();
  const btnRef = useRef();
  const navigate = useNavigate();
  const [activeTab, setactiveTab] = useState("Home");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isWalletOpen,
    onOpen: onWalletOpen,
    onClose: onWalletClose,
  } = useDisclosure();

  const logo = settingsData?.find((value) => value.id_name === "logo");
  const name = settingsData?.find((value) => value.id_name === "clinic_name");
  const play_store_link = settingsData?.find(
    (value) => value.id_name === "play_store_link"
  );
  const app_store_link = settingsData?.find(
    (value) => value.id_name === "app_store_link"
  );

  return (
    <Box
      borderBottom="1px solid #e2e8f0"
      bg="#ffffff"
      position="sticky"
      top={0}
      left={0}
      width="100%"
      zIndex={999}
      fontFamily="var(--font-primary)"
    >
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 3, md: 4 }}>
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          gap={{ base: 2, md: 4 }}
        >
          {/* Brand Logo */}
          <Box
            as={Link}
            to="/"
            fontFamily="var(--font-primary)"
            fontWeight="700"
            fontSize={{ base: "20px", md: "24px" }}
            color="#2563eb"
            minW={{ base: "60px", md: "80px" }}
          >
            SupaDoc
          </Box>

          {/* Centered Nav Links - Desktop */}
          <Flex
            flex={1}
            justifyContent="center"
            alignItems="center"
            mx={4}
          >
            <HStack
              as="nav"
              spacing={8}
              display={{ base: "none", lg: "flex" }}
            >
              <DesktopNav />
            </HStack>
          </Flex>

          {/* Right Side Actions */}
          <Flex
            alignItems="center"
            gap={{ base: 2, md: 3 }}
            minW={{ base: "120px", md: "180px" }}
            justifyContent="flex-end"
          >
            {/* Location Selector */}
            <Box display={{ base: "none", md: "block" }}>
              <LocationSeletor type={"header"} />
            </Box>

            {/* Search Icon */}
            <IconButton
              variant="ghost"
              size="sm"
              color="#64748b"
              icon={<SearchIcon />}
              onClick={() => navigate("/search")}
              _hover={{ bg: "#f8fafc" }}
              borderRadius="6px"
            />

            {/* Notification Icon */}
            <NotificationIcon />

            {/* User Menu or Auth Buttons */}
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                  p={0}
                >
                  <Avatar
                    size="sm"
                    src={`${imageBaseURL}/${user.image}`}
                    name={`${user?.f_name} ${user?.l_name}`}
                    bg="#f5f7fa"
                    color="#64748b"
                    border="1px solid #e2e8f0"
                  />
                </MenuButton>
                <MenuList
                  bg="#ffffff"
                  border="1px solid #e2e8f0"
                  borderRadius="8px"
                  boxShadow="0 4px 12px rgba(0,0,0,0.12)"
                  py={2}
                >
                  <MenuItem
                    fontWeight="500"
                    color="#0f172a"
                    fontSize="14px"
                    fontFamily="var(--font-primary)"
                    icon={<FaUserAlt fontSize="14px" color="#64748b" />}
                    onClick={() => {
                      onClose();
                      navigate("/profile");
                    }}
                    _hover={{ bg: "#f8fafc" }}
                    px={4}
                    py={2}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    fontWeight="500"
                    color="#0f172a"
                    fontSize="14px"
                    fontFamily="var(--font-primary)"
                    icon={<MdFamilyRestroom fontSize="14px" color="#64748b" />}
                    onClick={() => {
                      onClose();
                      navigate("/family-members");
                    }}
                    _hover={{ bg: "#f8fafc" }}
                    px={4}
                    py={2}
                  >
                    Family Members
                  </MenuItem>
                  <MenuItem
                    fontWeight="500"
                    color="#0f172a"
                    fontSize="14px"
                    fontFamily="var(--font-primary)"
                    icon={<AiOutlineHistory fontSize="14px" color="#64748b" />}
                    onClick={() => {
                      onClose();
                      navigate("/appointments");
                    }}
                    _hover={{ bg: "#f8fafc" }}
                    px={4}
                    py={2}
                  >
                    My Appointments
                  </MenuItem>
                  <MenuItem
                    fontWeight="500"
                    color="#0f172a"
                    fontSize="14px"
                    fontFamily="var(--font-primary)"
                    icon={<MdHealthAndSafety fontSize="14px" color="#64748b" />}
                    onClick={() => {
                      onClose();
                      navigate("/vitals");
                    }}
                    _hover={{ bg: "#f8fafc" }}
                    px={4}
                    py={2}
                  >
                    Vitals
                  </MenuItem>
                  <MenuItem
                    fontWeight="500"
                    color="#0f172a"
                    fontSize="14px"
                    fontFamily="var(--font-primary)"
                    icon={<CgFileDocument fontSize="14px" color="#64748b" />}
                    onClick={() => {
                      onClose();
                      navigate("/files");
                    }}
                    _hover={{ bg: "#f8fafc" }}
                    px={4}
                    py={2}
                  >
                    Files
                  </MenuItem>
                  <MenuItem
                    fontWeight="500"
                    color="#0f172a"
                    fontSize="14px"
                    fontFamily="var(--font-primary)"
                    icon={<BsPrescription fontSize="14px" color="#64748b" />}
                    onClick={() => {
                      onClose();
                      navigate("/prescriptions");
                    }}
                    _hover={{ bg: "#f8fafc" }}
                    px={4}
                    py={2}
                  >
                    Prescriptions
                  </MenuItem>
                  <MenuItem
                    fontWeight="500"
                    color="#0f172a"
                    fontSize="14px"
                    fontFamily="var(--font-primary)"
                    icon={<IoMdWallet fontSize="14px" color="#64748b" />}
                    onClick={onWalletOpen}
                    _hover={{ bg: "#f8fafc" }}
                    px={4}
                    py={2}
                  >
                    Wallet
                  </MenuItem>
                  <MenuDivider borderColor="#f1f5f9" />
                  <MenuItem
                    fontWeight="500"
                    color="#ef4444"
                    fontSize="14px"
                    fontFamily="var(--font-primary)"
                    icon={<BiLogOut fontSize="14px" color="#ef4444" />}
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/", { replace: true });
                      window.location.reload();
                    }}
                    _hover={{ bg: "#fef2f2" }}
                    px={4}
                    py={2}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={3} display={{ base: "none", md: "flex" }}>
                <Button
                  fontSize="14px"
                  fontWeight="500"
                  variant="ghost"
                  color="#64748b"
                  fontFamily="var(--font-button)"
                  as={Link}
                  to="/login"
                  _hover={{ bg: "#f8fafc", color: "#0f172a" }}
                  px={4}
                  h="36px"
                >
                  Sign In
                </Button>
                <Button
                  fontSize="14px"
                  fontWeight="500"
                  color="#ffffff"
                  bg="#2563eb"
                  borderRadius="6px"
                  fontFamily="var(--font-button)"
                  _hover={{ bg: "#1d4ed8" }}
                  px={4}
                  h="36px"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </HStack>
            )}

            {/* Mobile Menu Button */}
            <IconButton
              icon={<HamburgerIcon />}
              variant="ghost"
              size="sm"
              color="#64748b"
              aria-label="Open Menu"
              onClick={onOpen}
              display={{ base: "flex", lg: "none" }}
              _hover={{ bg: "#f8fafc" }}
              borderRadius="6px"
            />
          </Flex>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bg="#ffffff"
          maxW="300px"
          fontFamily="var(--font-primary)"
        >
          <DrawerHeader p={0}>
            <Box px={6} pt={6} pb={4}>
              <Flex justifyContent="center" alignItems="center" mb={4}>
                <Text
                  fontFamily="var(--font-primary)"
                  fontWeight="700"
                  fontSize="20px"
                  color="#2563eb"
                >
                  SupaDoc
                </Text>
              </Flex>
              
              {!user && (
                <Flex gap={3} mb={4}>
                  <Button
                    fontSize="14px"
                    fontWeight="500"
                    bg="#2563eb"
                    color="#ffffff"
                    borderRadius="6px"
                    px={4}
                    py={2}
                    flex={1}
                    h="40px"
                    fontFamily="var(--font-button)"
                    _hover={{ bg: "#1d4ed8" }}
                    as={Link}
                    to="/login"
                    onClick={() => {
                      navigate("/login");
                      onClose();
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    fontSize="14px"
                    fontWeight="500"
                    variant="outline"
                    borderColor="#e2e8f0"
                    color="#64748b"
                    borderRadius="6px"
                    px={4}
                    py={2}
                    flex={1}
                    h="40px"
                    fontFamily="var(--font-button)"
                    _hover={{ bg: "#f8fafc", borderColor: "#cbd5e1" }}
                    as={Link}
                    to="/signup"
                    onClick={() => {
                      navigate("/signup");
                      onClose();
                    }}
                  >
                    Sign Up
                  </Button>
                </Flex>
              )}
            </Box>
          </DrawerHeader>

          <DrawerBody px={6} py={2}>
            <Box mb={5}>
              <LocationSeletor type="search" />
            </Box>
            
            <VStack align="stretch" spacing={2}>
              {SideBarLinks?.map((item) => {
                if (item.auth === true) {
                  return (
                    <Box
                      key={item.name}
                      as={Link}
                      style={{ textDecoration: "none" }}
                      _focus={{ boxShadow: "none" }}
                      onClick={() => {
                        setactiveTab(item.name);
                        onClose();
                      }}
                      to={`/${item.name.toLowerCase()}`}
                    >
                      <Flex
                        align="center"
                        px={3}
                        py={3}
                        borderRadius="6px"
                        cursor="pointer"
                        bg={
                          activeTab === item.name ? "#f8fafc" : "transparent"
                        }
                        color={
                          activeTab === item.name ? "#0f172a" : "#64748b"
                        }
                        _hover={{
                          bg: "#f8fafc",
                          color: "#0f172a",
                        }}
                        gap={3}
                        fontWeight={activeTab === item.name ? "500" : "400"}
                        fontSize="14px"
                        transition="all 0.2s"
                        fontFamily="var(--font-primary)"
                      >
                        <Box color="inherit" fontSize="16px">
                          {item.icon}
                        </Box>
                        <Text mb={0}>{item.name.replace("-", " ")}</Text>
                      </Flex>
                    </Box>
                  );
                }
              })}
            </VStack>
          </DrawerBody>

          <DrawerFooter
            flexDir="column"
            alignItems="start"
            borderTop="1px solid #f1f5f9"
            px={6}
            py={4}
          >
            <Text fontSize="13px" mb={3} fontWeight="500" color="#64748b" fontFamily="var(--font-primary)">
              Download the {name?.value || "SupaDoc"} App
            </Text>
            <Flex gap={3} justifyContent="left" w="100%">
              <Link href={play_store_link?.value} isExternal>
                <Image src="/play store.png" w="100px" />
              </Link>
              <Link href={app_store_link?.value} isExternal>
                <Image src="/app store.png" w="100px" />
              </Link>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {user && (
        <WalletModel
          isModalOpen={isWalletOpen}
          closeModal={onWalletClose}
          openModal={onWalletClose}
        />
      )}
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <>
      {LinksPublic.map((link) => (
        <NavLink key={link}>{link}</NavLink>
      ))}
      {user && LinksAuth.map((link) => <NavLink key={link}>{link}</NavLink>)}
      {LinksPublic2.map((link) => (
        <NavLink key={link}>{link}</NavLink>
      ))}
    </>
  );
};

const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as={Link}
      px={3}
      py={2}
      borderRadius="6px"
      color="#64748b"
      fontSize="14px"
      fontWeight="500"
      fontFamily="var(--font-primary)"
      _hover={{
        textDecoration: "none",
        bg: "#f8fafc",
        color: "#0f172a",
      }}
      transition="all 0.2s"
      to={children.toLowerCase()}
    >
      {children}
    </Box>
  );
};