import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import PostService from "../../services/postService";

interface DeleteButtonProps {
  postId: string;
}

const DeleteButton = ({ postId }: DeleteButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { isError, errorMessage, data } = await PostService.remove(postId);
    setLoading(false);

    if (isError) {
      toast({
        title: errorMessage,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: data,
        status: "success",
        isClosable: true,
      });
      window.location.reload();
    }
  };

  return (
    <>
      <IconButton
        colorScheme="green"
        size="sm"
        variant="ghost"
        rounded="full"
        icon={<FiTrash />}
        aria-label="Delete"
        onClick={onOpen}
      />

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Post?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this post?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={handleDelete}
              isLoading={loading}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
