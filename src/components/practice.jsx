import React, { useEffect, useState } from "react";
import Message from "./components/Message";
import {
  Box,
  Container,
  VStack,
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import { app } from "./Firebase";

import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  // onSnapshot,
  // query,
  // orderBy,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
const logOutHandler = () => {
  signOut(auth);
};

const App = () => {
  const [user, setUser] = useState(false);
  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  // const divForTheScroll = useRef(null);
  // const submitHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await addDoc(collection(db, "messages"), {
  //       text: message,
  //       uid: user.uid,
  //       uri: user.photoURL,
  //       createdAt: serverTimestamp(),
  //     });
  //     setMessage("");
  //     divForTheScroll.current.scrollIntoView({ behavior: "smooth" });
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  useEffect(() => {
    //   const que = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    //   //this is to change the auth state , if user login
    onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
    //   const unsubscribeForMessage = onSnapshot(que, (snap) => {
    //     setMessages(
    //       snap.docs.map((item) => {
    //         const id = item.id;
    //         return { id, ...item.data() };
    //       })
    //     );
    //   });
    //   return () => {
    //     unSubscirbe();
    //     unsubscribeForMessage();
    //   };
  }, []);
  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container bg={"white"} h={"100vh"}>
          <VStack h={"full"} paddingY={"4"}>
            {/* <Button onClick={logOutHandler} colorScheme={"red"} w={"full"}>
              logOut
            </Button> */}
            <VStack
              h={"full"}
              w={"full"}
              overflowY={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {/* this is to show the messages */}
              {/* {messages.map((currElem) => (
                <Message
                  key={currElem.id}
                  user={currElem.uid === user.uid ? "me" : "other"}
                  text={currElem.text}
                  uri={currElem.uri}
                />
              ))} */}
              <Message user="me" text={"Hii Aman 😁"} />
              <Message text={"hello"} />
              {/* <div ref={divForTheScroll}></div> */}
            </VStack>

            <form style={{ width: "100%" }} onSubmit={submitHandler}>
              <HStack>
                <Input
                  // value={message}
                  value="hello"
                  // onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter a message.."
                />
                {/* <Button
                  colorScheme={"purple"}
                  type="submit"
                  isDisabled={message == "" ? true : false}
                >
                  Send
                </Button> */}
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack bg={"white"} h={"100vh"} justifyContent={"center"}>
          <Button onClick={loginHandler} colorScheme={"green"}>
            Sign in with Google
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default App;
