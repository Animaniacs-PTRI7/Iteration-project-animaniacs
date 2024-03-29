//React
import React, { useState, useEffect } from "react";

//MUI
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";

//Routes
import SellerLogin from "./components/SellerLogin";
import Feed from "./components/Feed";
import Nav from "./components/Nav";
import Body from "./components/Body";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SellerBody from "./components/SellerBody";
import SellerSignUp from "./components/SellerSignUp";
import KitchenEdit from "./components/KitchenEdit";
import OrderList from "./components/OrderList";
import Confirmation from "./components/Confirmation";
import { Routes, Route, Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  webmain: {
    // backgroundColor: '#FFFFFF',
    // color: 'black',
    // '&.css-1hc7nu0-MuiPaper-root-MuiAppBar-root': {
    //   // backgroundColor: '#FFFFFF'
    // }
  },
}));

const App = () => {
  const classes = useStyles();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState(0);
  const [userZip, setUserZip] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  

  useEffect(() => {
    let userIdCookie = document.cookie.split("; ").filter((el) => {
      return el.split("=")[0] === "userId";
    })[0];
    userIdCookie = userIdCookie ? userIdCookie.split("=")[1] : false;
    if (userIdCookie) setUserId(Number(userIdCookie));

    // userType
    let userTypeCookie = document.cookie.split("; ").filter((el) => {
      return el.split("=")[0] === "userType";
    })[0];
    userTypeCookie = userTypeCookie ? userTypeCookie.split("=")[1] : false;
    if (userTypeCookie) setUserType(userTypeCookie);

    // userZip
    let UserZipCookie = document.cookie.split("; ").filter((el) => {
      return el.split("=")[0] === "userZip";
    })[0];
    UserZipCookie = UserZipCookie ? UserZipCookie.split("=")[1] : false;
    if (UserZipCookie) setUserZip(UserZipCookie);




    const cookiesArr = [userIdCookie, userTypeCookie, UserZipCookie];
    console.log("entered with ", cookiesArr);

    if (userIdCookie) setIsLoggedIn(true);

    // change state so we rerender
    setLoaded(true);
  }, []);

  const logOut = () => {
    console.log("logging out");
    document.cookie = "userId =";
    document.cookie = "userType =";
    document.cookie = "userZip =";
    document.cookie = "token =";

    setIsLoggedIn(false);
    setUserType("");
    setUserId("");
    setUserZip(0);
  };

  if (isLoggedIn) {
    return (
      <div className={classes.webmain}>
        <CssBaseline />
        <Routes>
          {/* This route will see we're on "/" and auto-redirect to /feed. "/" isn't possible while logged in */}

          <Route
            path="/"
            exact
            element={<Navigate to="/feed" replace={true} />}
          />
          {/* Nav bar */}
          <Route path="/" element={<Nav logOut={logOut} userType={userType} />}>
            {/* buyer feed */}
            <Route
              path="/feed"
              element={<Feed userZip={userZip} userId={userId} />}
            >
              <Route path="/feed/:sellerId" />
              {/* don't need an element here */}
            </Route>
            <Route
              path="/MyKitchen"
              element={<KitchenEdit userType={userType} userId={userId} />}
            />
            <Route
              path="/MyOrders"
              element={<OrderList userType={userType} userId={userId} />}
            />
            <Route
              path="/confirmation"
              element={<Confirmation userZip={userZip} userId={userId} />}
            />
            <Route path="/feed/:id" element={<SignUp />} />
          </Route>
          <Route path="/*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={classes.webmain}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Nav />}>
        {/* setModalSignUp={setModalSignUp} modalSignUp={modalSignUp} */}
          {/* Displayed at same time as nav bar */}
          {/* setModalLogin={setModalLogin} modalLogIn={modalLogIn} */}
          <Route path="/" element={
          <Body 
          setIsLoggedIn={setIsLoggedIn} 
          userId={userId}
          userType={userType}
          setUserType={setUserType} 
          setUserZip={setUserZip}  
          setUserId={setUserId}/>}>
            {/* Displayed at same time as generic body */}
            {/* <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setUserType={setUserType}
                  setUserZip={setUserZip}
                  setUserId={setUserId}
                  // setModalLogin={setModalLogin}
                  // modalLogIn={modalLogIn}
                />
              }
            /> */}
            {/* <Route
              path="/signup"
              element={
                <SignUp
                  setIsLoggedIn={setIsLoggedIn}
                  setUserType={setUserType}
                  setUserZip={setUserZip}
                  setUserId={setUserId}
                />
              }
              element={<SignUp setModalSignUp={setModalSignUp} modalSignUp={modalSignUp}/>}
              // element={
              //   <span
              //     style={{
              //       height: '600px',
              //       width: '700px',
              //       // overflow: 'hidden',
              //     }}
              //   >
              //     <Mappy
              //       sellerAddr={'15108'}
              //       buyerAddr={'15222'}
              //       mapsize={['100%', '100%']}
              //       loadSize={3}
              //       loadColor='rgb(255,255,255,0.7)'
              //     />
              //   </span>
              // }
            /> */}
          </Route>
          <Route
            path="/seller"
            element={<SellerBody 
              setIsLoggedIn={setIsLoggedIn}
              setUserType={setUserType}
              setUserZip={setUserZip}
              setUserId={setUserId}
              />
            }
          >
            {/* Displayed at same time as seller body */}
            <Route
              path="/seller/login"
              element={
                <SellerLogin
                  setIsLoggedIn={setIsLoggedIn}
                  setUserType={setUserType}
                  setUserZip={setUserZip}
                  setUserId={setUserId}
                  setShowLogin={setShowLogin}
                  showLogin={showLogin}
                />
              }
            />
            {/* <Route
              path="/seller/signup"
              element={<SellerSignUp setIsLoggedIn={setIsLoggedIn} />}
            /> */}
          </Route>
          {/* buyer feed */}
          {/* <Route path='/feed' element={<SignUp />} /> */}

          {/* this currently uses a "catch all" to redirect to the "/" route */}
          {/* could be super useful as a "catch all" to display a 404 page, though! */}
          {/* on the downside, we'd have to make a redirect route for every route that exists when signed in */}
          {/* ! OR we could make the paths a bit dirtier by adding a prefix that all routes would share if signed in */}
          {/* but really I don't mind just having a bunch of routes */}
          <Route path="/*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </div>
  );
};
// export App
export default App;


// //React
// import React, { useState, useEffect } from "react";

// //MUI
// import { makeStyles } from "@mui/styles";
// import CssBaseline from "@mui/material/CssBaseline";

// //Routes
// import SellerLogin from "./components/SellerLogin";
// import Feed from "./components/Feed";
// import Nav from "./components/Nav";
// import Body from "./components/Body";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import SellerBody from "./components/SellerBody";
// import SellerSignUp from "./components/SellerSignUp";
// import KitchenEdit from "./components/KitchenEdit";
// import OrderList from "./components/OrderList";
// import Confirmation from "./components/Confirmation";
// import { Routes, Route, Navigate } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   webmain: {
//     // backgroundColor: '#FFFFFF',
//     // color: 'black',
//     // '&.css-1hc7nu0-MuiPaper-root-MuiAppBar-root': {
//     //   // backgroundColor: '#FFFFFF'
//     // }
//   },
// }));

// const App = () => {
//   const classes = useStyles();

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userType, setUserType] = useState("");
//   const [userId, setUserId] = useState(0);
//   const [userZip, setUserZip] = useState(0);
//   const [loaded, setLoaded] = useState(false);


//   useEffect(() => {
//     let userIdCookie = document.cookie.split("; ").filter((el) => {
//       return el.split("=")[0] === "userId";
//     })[0];
//     userIdCookie = userIdCookie ? userIdCookie.split("=")[1] : false;
//     if (userIdCookie) setUserId(Number(userIdCookie));

//     // userType
//     let userTypeCookie = document.cookie.split("; ").filter((el) => {
//       return el.split("=")[0] === "userType";
//     })[0];
//     userTypeCookie = userTypeCookie ? userTypeCookie.split("=")[1] : false;
//     if (userTypeCookie) setUserType(userTypeCookie);

//     // userZip
//     let UserZipCookie = document.cookie.split("; ").filter((el) => {
//       return el.split("=")[0] === "userZip";
//     })[0];
//     UserZipCookie = UserZipCookie ? UserZipCookie.split("=")[1] : false;
//     if (UserZipCookie) setUserZip(Number(UserZipCookie));

//     const cookiesArr = [userIdCookie, userTypeCookie, UserZipCookie];
//     console.log("entered with ", cookiesArr);

//     if (userIdCookie) setIsLoggedIn(true);

//     // change state so we rerender
//     setLoaded(true);
//   }, []);

//   const logOut = () => {
//     console.log("logging out");
//     document.cookie = "userId =";
//     document.cookie = "userType =";
//     document.cookie = "userZip =";
//     document.cookie = "token =";

//     setIsLoggedIn(false);
//     setUserType("");
//     setUserId("");
//     setUserZip(0);
//   };

//   if (isLoggedIn) {
//     return (
//       <div className={classes.webmain}>
//         <CssBaseline />
//         <Routes>
//           {/* This route will see we're on "/" and auto-redirect to /feed. "/" isn't possible while logged in */}

//           <Route
//             path="/"
//             exact
//             element={<Navigate to="/feed" replace={true} />}
//           />
//           {/* Nav bar */}
//           <Route path="/" element={<Nav logOut={logOut} userType={userType} />}>
//             {/* buyer feed */}
//             <Route
//               path="/feed"
//               element={<Feed userZip={userZip} userId={userId} />}
//             >
//               <Route path="/feed/:sellerId" />
//               {/* don't need an element here */}
//             </Route>
//             <Route
//               path="/MyKitchen"
//               element={<KitchenEdit userType={userType} userId={userId} />}
//             />
//             <Route
//               path="/MyOrders"
//               element={<OrderList userType={userType} userId={userId} />}
//             />
//             <Route
//               path="/confirmation"
//               element={<Confirmation userZip={userZip} userId={userId} />}
//             />
//             <Route path="/feed/:id" element={<SignUp />} />
//           </Route>
//           <Route path="/*" element={<Navigate to="/" replace={true} />} />
//         </Routes>
//       </div>
//     );
//   }

//   return (
//     <div className={classes.webmain}>
//       <CssBaseline />
//       <Routes>
//         <Route path="/" element={<Nav />}>
//           {/* Displayed at same time as nav bar */}
//           <Route path="/" element={<Body setIsLoggedIn={setIsLoggedIn} />}>
//             {/* Displayed at same time as generic body */}
//             <Route
//               path="/login"
//               element={
//                 <Login
//                   setIsLoggedIn={setIsLoggedIn}
//                   setUserType={setUserType}
//                   setUserZip={setUserZip}
//                   setUserId={setUserId}
//                 />
//               }
//             />
//             {/* <Route
//               path="/signup"
//               element={<SignUp />}
//               element={
//                 <span
//                   style={{
//                     height: '600px',
//                     width: '700px',
//                     // overflow: 'hidden',
//                   }}
//                 >
//                   <Mappy
//                     sellerAddr={'15108'}
//                     buyerAddr={'15222'}
//                     mapsize={['100%', '100%']}
//                     loadSize={3}
//                     loadColor='rgb(255,255,255,0.7)'
//                   />
//                 </span>
//               }
//             /> */}
//           </Route>
//           <Route
//             path="/seller"
//             element={<SellerBody setIsLoggedIn={setIsLoggedIn} />}
//           >
//             {/* Displayed at same time as seller body */}
//             <Route
//               path="/seller/login"
//               element={
//                 <SellerLogin
//                   setIsLoggedIn={setIsLoggedIn}
//                   setUserType={setUserType}
//                   setUserZip={setUserZip}
//                   setUserId={setUserId}
//                 />
//               }
//             />
//             {/* <Route
//               path="/seller/signup"
//               element={<SellerSignUp setIsLoggedIn={setIsLoggedIn} />}
//             /> */}
//           </Route>
//           {/* buyer feed */}
//           {/* <Route path='/feed' element={<SignUp />} /> */}

//           {/* this currently uses a "catch all" to redirect to the "/" route */}
//           {/* could be super useful as a "catch all" to display a 404 page, though! */}
//           {/* on the downside, we'd have to make a redirect route for every route that exists when signed in */}
//           {/* ! OR we could make the paths a bit dirtier by adding a prefix that all routes would share if signed in */}
//           {/* but really I don't mind just having a bunch of routes */}
//           <Route path="/*" element={<Navigate to="/" replace={true} />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// };
// // export App
// export default App;
