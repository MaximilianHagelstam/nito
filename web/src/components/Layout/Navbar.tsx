import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { UserContext } from "../../context/userContext";
import UserService from "../../services/userService";
import ToggleThemeButton from "./ToggleThemeButton";

interface NavbarProps {
  onOpen: () => void;
}

const Navbar = ({ onOpen }: NavbarProps) => {
  const user = useContext(UserContext);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Nito
      </Text>
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems="center">
          <ToggleThemeButton />
          {user ? (
            <Menu>
              <MenuButton
                py={2}
                _focus={{ boxShadow: "none" }}
                aria-label="avatar button"
              >
                <HStack>
                  <Avatar size="sm" src={user.avatar} name={user.username} />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">@{user.username}</Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem onClick={UserService.logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Navbar;
