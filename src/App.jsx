import React, { useEffect, useRef, useState } from "react";
import Message from "./components/Message";
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
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  Box,
  Container,
  VStack,
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import { app } from "./Firebase";
const auth = getAuth(app);
const db = getFirestore(app);
const App = () => {
  // const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divForTheScroll = useRef(null);
  const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const logOutHandler = () => {
    // this will erase all the data from the user , which is in the use state
    signOut(auth); // this is the promise
  };

  const submitHandler = async (eve) => {
    eve.preventDefault();
    try {
      setMessage("");
      await addDoc(collection(db, "messatn"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      divForTheScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const q = query(collection(db, "messatn"), orderBy("createdAt", "asc"));
    const unSubscirbe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });
    return () => {
      unSubscirbe();
      unsubscribeForMessage();
    };
  }, []);
  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container bg={"white"} h={"100vh"} border={"1px solid black"}>
          <VStack h={"full"} paddingY={"4"}>
            <Button
              onClick={logOutHandler}
              colorScheme={"red"}
              w={"full"}
              marginTop={"2"}
            >
              logOut
            </Button>
            <VStack
              h={"full"}
              w={"full"}
              overflow={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {/* this is to show the messages */}

              {/* <Message user="me" text={"Hello Aman"} /> */}
              {messages.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  uri={item.uri}
                />
              ))}
              <div ref={divForTheScroll}></div>
            </VStack>

            <form style={{ width: "100%" }} onSubmit={submitHandler}>
              <HStack w={"100%"}>
                <Input
                  value={message}
                  placeholder="Enter a message.."
                  onChange={(ev) => setMessage(ev.target.value)}
                />
                <Button colorScheme={"purple"} type="submit">
                  Send
                </Button>
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
