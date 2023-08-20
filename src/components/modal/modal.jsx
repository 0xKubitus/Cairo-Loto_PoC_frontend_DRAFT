import { useState, useEffect } from "react";

import styles from "@/styles/modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

///////////////////////////////////

// const Modal = ({
//   title,
//   headerEl,
//   children,
//   mtBody = 4,
//   pxBody = 4,
//   isOpen,
//   closable = true,
//   autoClose = 0, // In seconds
//   onClose,
//   showWave = false,
//   ...props
// }) => {
//   const [remainingTime, setRemainingTime] = useState < number > autoClose;
//   useEffect(() => {
//     let timeout;
//     if (autoClose > 0 && isOpen && remainingTime > 0) {
//       timeout = setTimeout(() => {
//         setRemainingTime(remainingTime - 1);
//       }, 1000);
//     } else if (autoClose > 0 && remainingTime === 0 && onClose) {
//       onClose();
//     }
//     return () => {
//       if (timeout) clearTimeout(timeout);
//     };
//   }, [isOpen, remainingTime, autoClose, onClose]);

//   return (
//     <ChakraModal
//       scrollBehavior="inside"
//       isCentered
//       variant="brand"
//       isOpen={isOpen}
//       onClose={() => onClose && onClose()}
//       {...props}
//     >
//       <ModalOverlay
//         bg="blackAlpha.300"
//         backdropFilter="blur(10px) hue-rotate(0deg)"
//       />
//       <ModalContent position="relative" overflow="hidden">
//         {(title || headerEl) && (
//           <ModalHeader px={4}>
//             <Flex direction="column">
//               <Text>{title}</Text>
//               {headerEl && <Box mt={4}>{headerEl}</Box>}
//             </Flex>
//           </ModalHeader>
//         )}
//         {closable && (
//           <HStack
//             lineHeight="revert"
//             position="absolute"
//             top={2}
//             right={0}
//             alignItems="flex-end"
//             justify="center"
//           >
//             {autoClose && (
//               <Text mr={2} fontSize="xs" opacity={0.6}>
//                 {remainingTime}s
//               </Text>
//             )}
//             <ModalCloseButton position="relative" />
//           </HStack>
//         )}
//         <ModalBody mt={mtBody} px={pxBody} py={0}>
//           {children}
//         </ModalBody>
//         {showWave && (
//           <Box
//             w={{ base: "140%", lg: "240%" }}
//             position="absolute"
//             zIndex={-1}
//             bottom={{ base: "0%", lg: "-30%" }}
//             opacity={0.6}
//           >
//             <Image w="full" src="wave_1.svg" />
//           </Box>
//         )}
//       </ModalContent>
//     </ChakraModal>
//   );
// };

// export default Modal;
