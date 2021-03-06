import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiArrowDown,
  FiBarChart,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

interface SortMenuProps {
  handleNewest: () => void;
  handleOldest: () => void;
  handlePopular: () => void;
}

const SortMenu = ({
  handleNewest,
  handleOldest,
  handlePopular,
}: SortMenuProps) => {
  return (
    <Box>
      <Menu closeOnSelect={true}>
        <MenuButton
          as={Button}
          colorScheme="purple"
          rightIcon={<FiArrowDown />}
        >
          Sort
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiChevronUp />} onClick={handleNewest}>
            Newest
          </MenuItem>
          <MenuItem icon={<FiChevronDown />} onClick={handleOldest}>
            Oldest
          </MenuItem>
          <MenuItem icon={<FiBarChart />} onClick={handlePopular}>
            Popular
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SortMenu;
